---
title: Implementing Notifications Using MongoDB and Next.js for Updately
layout: post
tags: code project
date: '2021-01-25 13:24:59'
---

![]({{ site.baseurl }}/img/blog/2021-01/updately-notifications/follow.jpg)

My personal favorite feature in [the 0.3.0 release of Updately](https://preview.mailerlite.com/q7e6t2) was comments. Updately is meant to be a social platform, but there was previously no way to interact with others' posts other than viewing them. Discussion was facilitated, but on different platforms. Comments brought Updately one step closer to being a social platform in its own right.

There was a major flaw, though: users had no way of knowing if another user had left a comment on their update, and reminders had to be sent by other platforms anyways. That's because Updately currently doesn't have any sort of notification system.

Today, I'm going to build a notification system for Updately, using a MongoDB collection just like user profiles, updates, and comments. Notifications will be created when comments or replies to comments are left, and users will see their notifications through the frontend when they log in. In the future, notifications can be expanded both ways: they can be created for more use cases, such as mentions in updates or comments, and also delivered to users in more ways, such as through email. For now, though, we'll focus on creating them only for comments, and checking them only through the frontend.

## 1. Setting up the schema

The first step is to create a new collection for notifications. We do this by defining a Typescript type, then a schema that is exported as a Mongoose model.

`types.ts`:

```jsx
import {Document} from "mongoose";

export interface Notification extends Document {
    _id: string,
    userId: string,
    authorId: string,
    updateId: string,
    type: "comment" | "reply",
    read: boolean,
    createdAt: string, // date string
    updatedAt: string, // date string
}
```

`models.ts`:

```jsx
import mongoose, {Schema, ObjectId, Model} from "mongoose";
import {Notification} from "../utils/types";

// helper type object
const reqString = {
    type: String,
    required: true,
};

// define schema
const notificationSchema: Schema = new Schema({
    userId: ObjectId, // ID of receiving user
    authorId: ObjectId, // ID of comment author
    updateId: ObjectId, // ID of update of comment to generate link and notification message
    type: reqString, // "comment" | "reply"
    read: {type: Boolean, required: true},
}, {
    timestamps: true,
});

// export as model
export const notificationModel Model<Notification> = mongoose.models.notification || mongoose.model('notification', notificationSchema);
```

Originally this schema actually looked quite different: I had `message` and `link` string fields instead of `updateId`, `authorId`, and `type`. This means that the notification can be displayed as soon as the object is loaded. However, this runs into problems if the user or update information changes, which would change both the message and link for the notification. Attaching IDs and types to the notification and letting the frontend handle message and link generation is therefore much more robust.

## 2. Create notifications on comment creation
Comments are created by hitting `/api/new-comment` with a request containing this body info:

```jsx
{
	commentText: commentText,
	authorId: userData._id,
	updateId: update._id,
	updateAuthorId: update.userId,
	commentId: parentCommentId,
}
```

The API endpoint then uses Mongoose to create the comment. Right afterwards, we can use Mongoose to create the appropriate notifications:

```jsx
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const thisUser = await userModel.findOne({ email: session.user.email });

const newComment = {
  body: req.body.commentText,
  authorId: new mongoose.Types.ObjectId(thisUser._id),
  updateId: new mongoose.Types.ObjectId(updateId),
  isSubComment: !!commentId,
  parentCommentId: commentId ? new mongoose.Types.ObjectId(commentId) : null,
};

const returnComment = await commentModel.create(newComment);

// if comment author is not update author, create notification for update author
if (req.body.updateAuthorId !== thisUser._id.toString()) {
  const newNotification = {
    userId: req.body.updateAuthorId,
    updateId: updateId,
    authorId: thisUser._id,
    type: "comment",
    read: false,
  };
  await notificationModel.create(newNotification);
}

// if comment is subcomment, create notifications for authors of all subcomments of parent comment
if (newComment.isSubComment) {
  const parentComment = await commentModel.findOne({ _id: commentId });
  const subComments = await commentModel.find({ parentCommentId: commentId });
  const commentUserIds = [
    parentComment.authorId.toString(),
    ...subComments.map((d) => d.authorId.toString()),
  ]
    .filter((d, i, a) => a.indexOf(d) === i) // filter out duplicates
    .filter(
      (d) => d !== thisUser._id.toString() && d !== req.body.updateAuthorId
    ); // filter out ID of comment and post author
  for (let userId of commentUserIds) {
    const newNotification = {
      userId: userId,
      updateId: updateId,
      authorId: thisUser._id,
      type: "reply",
      read: false,
    };
    await notificationModel.create(newNotification);
  }
}

```

Now, if I go to my sister's update and post a comment, a notification document is added to the notifications collection in MongoDB Atlas.

![]({{ site.baseurl }}/img/blog/2021-01/updately-notifications/posting-comment.jpg)

![]({{ site.baseurl }}/img/blog/2021-01/updately-notifications/posting-comment-atlas.jpg)

## 3. Fetch notifications

First, we'll create a new API route `get-notifications` that fetches notifications for the user currently logged in. With Next.js, this is as easy as adding a file `get-notifications.ts` to `/pages/api`:

```jsx
export default async function getNotificationsHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405);
    const session = await getSession({ req });
    if (!session) return res.status(403).json({message: "You must be signed in to fetch notifications"});

    try {
        const thisUser: User = await getCurrUserRequest(session.user.email);
        const notifications: Notification[] = await getNotifications(thisUser._id.toString());
        if (notifications.length === 0) return res.status(200).json({notifications: [], users: [], updates: [], updateUsers: []});
        else {
            const uniqueAuthorIds: string[] = notifications.map(d => d.authorId).filter((d, i, a) => a.indexOf(d) === i);
            const uniqueUpdateIds: string[] = notifications.map(d => d.updateId).filter((d, i, a) => a.indexOf(d) === i);
            const users: User[] = await userModel.find({ "_id": {$in: uniqueAuthorIds}});
            const updates: Update[] = await updateModel.find({ "_id": {$in: uniqueUpdateIds}});
            const uniqueUpdateUserIds: string[] = updates.map(d => d.userId).filter((d, i, a) => a.indexOf(d) === i);
            const updateUsers: User[] = await userModel.find({ "_id": {$in: uniqueUpdateUserIds}});
            return res.status(200).json({notifications: notifications, users: users, updates: updates, updateUsers: updateUsers});
        }
    } catch (e) {
        res.status(500).json({error: e});
    }
}

export async function getNotifications(userId: string) {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    return notificationModel.find({ userId: userId });
}
```

The above function follows a similar pattern as comments. Comment documents themselves only contain update and user IDs, while the user information itself is needed to render the comment in the frontend. Instead of having this fetching happen on the frontend, the API call itself returns an array of all associated user objects, which can then be matched up in the frontend to render the comment. The same is done for fetching relevant update and user objects for notifications here.

It's easy now to use `useSWR` in our navbar component to fetch notifications:

```jsx
const { data: notificationsData, error: notificationsError } = useSWR(session ? "/api/get-notifications" : null, fetcher) || {data: null, error: null};
```

## 4. Display notifications

First, I added a simple notification bell:

```jsx
{
  notificationsData && (
    <button className="mr-4 p-2 relative">
      <FiBell />
      {notificationsData.notifications.length > 0 && (
        <div className="rounded-full w-3 h-3 bg-red-500 top-0 right-0 absolute text-white font-bold">
          <span style={% raw %}{{ fontSize: 8, top: -9 }}{% endraw %} className="relative">
            {notificationsData.notifications.length}
          </span>
        </div>
      )}
    </button>
  );
}

```

Then, I added a dropdown menu to it, using some utility classes I had already defined:

```jsx
{
  notificationsData && (
    <button className="mr-4 px-2 h-10 relative up-hover-button">
      <FiBell />
      {notificationsData.notifications.length > 0 && (
        <>
          <div className="rounded-full w-3 h-3 bg-red-500 top-0 right-0 absolute text-white font-bold">
            <span style={% raw %}{{ fontSize: 8, top: -9 }}{% endraw %} className="relative">
              {notificationsData.notifications.length}
            </span>
          </div>
          <div className="up-hover-dropdown mt-10 w-64">
            {notificationsData.notifications
              .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
              .map((notification: Notification) => {
                const thisUpdate: Update = notificationsData.updates.find(
                  (d) => d._id === notification.updateId
                );
                const thisUpdateUser: User = notificationsData.updateUsers.find(
                  (d) => d._id === thisUpdate.userId
                );
                const thisAuthor: User = notificationsData.users.find(
                  (d) => d._id === notification.authorId
                );

                return (
                  <MenuLink
                    text={
                      {
                        comment: (
                          <>
                            <span>
                              <b>{thisAuthor.name}</b> commented on your{" "}
                              {format(new Date(thisUpdate.date), "M/d/yy")}{" "}
                              update
                            </span>
                            <br />
                            <span className="opacity-50">
                              {formatDistanceToNow(
                                new Date(notification.createdAt)
                              )}{" "}
                              ago
                            </span>
                          </>
                        ),
                        reply: (
                          <>
                            <span>
                              <b>{thisAuthor.name}</b> replied to your comment
                              on
                              {" " +
                                (thisUpdateUser.email === session.user.email
                                  ? "your"
                                  : thisUpdateUser._id === thisAuthor._id
                                  ? "their"
                                  : thisUpdateUser.name + "'s") +
                                " "}
                              {format(new Date(thisUpdate.date), "M/d/yy")}{" "}
                              update
                            </span>
                            <br />
                            <span className="opacity-50">
                              {formatDistanceToNow(
                                new Date(notification.createdAt)
                              )}{" "}
                              ago
                            </span>
                          </>
                        ),
                      }[notification.type]
                    }
                    href={`/@${thisUpdateUser.urlName}/${thisUpdate.url}`}
                    nowrap={false}
                  />
                );
              })}
          </div>
        </>
      )}
    </button>
  );
}

```

```
.up-hover-dropdown {
    display: none;
    @apply absolute top-0 right-0 z-40 shadow-lg rounded-md bg-white;
}

.up-hover-button:hover > .up-hover-dropdown, .up-hover-button:focus > .up-hover-dropdown {
    display: block;
}
```

And voila! We have a notification dropdown that works great on desktop and mobile. Clicking the notification takes you to the update with the comment.

![]({{ site.baseurl }}/img/blog/2021-01/updately-notifications/bell2.jpg)

![]({{ site.baseurl }}/img/blog/2021-01/updately-notifications/notif.jpg)

![]({{ site.baseurl }}/img/blog/2021-01/updately-notifications/notif2.jpg)

## 5. Mark notifications as read
First, I made an api route `/api/read-notifications`, to which a notification ID can be posted to mark it as read.

```jsx
import {NextApiRequest, NextApiResponse} from "next";
import {notificationModel} from "../../models/models";
import mongoose from "mongoose";
import {getSession} from "next-auth/client";
import {getCurrUserRequest} from "../../utils/requests";
import {Notification, User} from "../../utils/types";

export default async function readNotificationsHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405);
    const session = await getSession({ req });
    if (!session) return res.status(403).json({message: "You must be signed in to mark a notification as read"});
    if (!req.body.id) return res.status(422).json({message: "No notification ID found in request"});

    try {
        console.log(req.body.id);

        const thisUser: User = await getCurrUserRequest(session.user.email);
        const thisNotification: Notification = await getNotification(req.body.id);

        if (!thisNotification) return res.status(404).json({message: "No notification found for given ID"});
        if (thisNotification.userId.toString() !== thisUser._id.toString()) return res.status(403).json({message: "You do not have permission to mark this notification as read"});

        thisNotification["read"] = true;
        await thisNotification.save();
        res.status(200).json({message: "Successfully marked notification as read"});
    } catch (e) {
        res.status(500).json({error: e});
    }
}

export async function getNotification(notificationId: string): Promise<Notification> {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    return notificationModel.findOne({ _id: notificationId });
}
```

At first, I considered adding an `onClick` handler to the notification link, which Next.js allows to execute before redirecting. This would be easier than parsing anything additional on the navigated to page, I thought. Using an `onClick` handler would cause a wait time before navigation, though. And I soon realized a pretty easy way to have the notification be marked as read on the navigated to page: pass the notification ID as a query param, and run a `useEffect` function to mark the notification as read if it's present.

The link in `navbar.tsx` now looks like this: 

```jsx
href={`/@${thisUpdateUser.urlName}/${thisUpdate.url}?notification=${notification._id}`}
```

And in `[updateUrl].tsx`, a useEffect hook that looks like this:

```jsx
useEffect(() => {
  if (router.query.notification) {
    axios
      .post("/api/read-notification", {
        id: router.query.notification,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}, [router.query.notification]);
```

Now we just need to adjust the `navbar` frontend code to display read notifications differently. First I calculate a new variable, the number of unread notifications: `const numNotifications = notificationsData ? notificationsData.notifications.filter(d => !d.read).length : 0` (`notificationsData` is undefined as `useSWR` fetches it).

Now, I only display the badge on the bell if `numNotifications` is above zero:

```jsx
{
  numNotifications > 0 && (
    <div className="rounded-full w-3 h-3 bg-red-500 top-0 right-0 absolute text-white font-bold">
      <span style={% raw %}{{ fontSize: 8, top: -9 }}{% endraw %} className="relative">
        {numNotifications}
      </span>
    </div>
  );
}
```

I also wrapped each notification menu item in a div making the notification half-opacity if it's read:

```jsx
<div key={notification._id} className={notification.read ? "opacity-50" : ""}>
  <MenuLink ... />
</div>
```

With that, we have, more or less, a complete working notification system!

![]({{ site.baseurl }}/img/blog/2021-01/updately-notifications/half-opacity.jpg)

## 6. Clear out old notifications

As users get notifications, it'll build up endlessly both on the user side menu and in the database, which we don't want. As a simple fix, whenever a user fetches their notifications, we'll delete all read notifications older than 14 days. This is straightforward to implement with a few array operations:

```jsx
...

// delete read notifications older than 14 days
const oldNotificationIds: string[] = notifications
  .filter((d) => d.read && +new Date() - +new Date(d.createdAt) > 14 * 8.64e7)
  .map((d) => d._id.toString());
await notificationModel.deleteMany({ _id: { $in: oldNotificationIds } });

notifications = notifications.filter(
  (d) => !oldNotificationIds.includes(d._id.toString())
);


...
```

## 7. Conclusion & extensions
That's it for this basic notification system!

There are plenty of improvements to be made. `useSWR` doesn't re-fetch notifications after one is clicked, for example, which is a simple matter of passing a key variable to the hook to fix. If there are a lot of notifications, there's no height limit or overflow on the notification menu, but again this is a simple fix using CSS.

It's easy to extend this system to new types of notifications, too. For example, I added notifications for when users follow each other.

Hopefully this post is a helpful example of how you might implement your own notification system using MongoDB!

![]({{ site.baseurl }}/img/blog/2021-01/updately-notifications/follow.jpg)