---
title: I built and launched a social platform app in three days. Here's how I did
  it, and what I learned
layout: post
date: '2020-12-05 02:09:02'
tags: project code design
---

![]({{ site.baseurl }}/img/blog/2020-12/thumb.png)

For a few weeks, a simple idea has been bouncing around in my head. Slowly, that idea became an itch to build. Last week, that itch became irresistible. With Thursday and Friday off from work for Thanksgiving, I decided to scratch that itch. And so, in just three days, I designed, built, and launched an entire social platform.

I didn't do any validation before building, or put any effort into growth afterwards. This was just a fun project to address a pain point that a few of my friends and I were experiencing.

This simple project, though, has been surprisingly meaningful to me.

For one, it's a remarkable illustration of how far I've come as a software engineer in just six short months since I started learning. I launched [my first-ever React app](http://szpt.netlify.app), SZ Project Tracker, in July of this year, which took me two months of up to 20-30 hours per week of learning and building. In contrast, less than 20 hours total of coding went into Updately for technical functionality that was arguably much more advanced.

For another, it's a reminder of how thrilling and valuable just *building* really is. Because of this impulsive project, I ended up just about getting a job offer from the CEO of a rapidly growing startup building a similar product. It's the best of tech culture: be passionate about learning and unafraid of building, and the road will only open up for you.

Investor Patrick O'Shaughnessy turns this drive into a loop: ["learn, build, share, repeat."](https://twitter.com/patrick_oshag/status/971100425498841089) For all the learning and building I've been doing, I haven't been doing nearly enough sharing. I'll take the opportunity now, then, to share my learnings from my half-year journey from SZPT to Updately, as well as technical details and learnings from building out Updately itself.

## A social platform for daily updates

Every day, I write a daily update. The update will include a reminder of my monthly goals and overall priorities; reflection on progress for the day; and a list of tasks I'll tackle in upcoming days. Here was my update for last Thursday:

![]({{ site.baseurl }}/img/blog/2020-12/update1.png)

![]({{ site.baseurl }}/img/blog/2020-12/update2.png)

I wasn't the only one writing these updates. Dozens of my friends in a program called [TKS](https://tks.world/) also write updates every night. Updates are great for personal reflection and documentation, but they're supercharged when you share them with others. By sending daily updates to each other, we built up a web of accountability, and kept in touch with each other about what we were up to.

So that's what we did! The thing is, some of us wrote our updates on Notion. I wrote them in my own SZ Project Tracker. Some of us wrote our updates in the very Slack channels we were sending them to each other through. That meant that, every night, I would find myself copy&pasting links across dozens of Slack channels, group chats, and DMs:

![]({{ site.baseurl }}/img/blog/2020-12/slack1.png)

![]({{ site.baseurl }}/img/blog/2020-12/slack2.png)

![]({{ site.baseurl }}/img/blog/2020-12/slack3.png)

Keeping up with my friends' updates was similarly difficult.

This was, to put it simply, hella annoying. Every night as I spammed `Ctrl+C` `Ctrl+V` `Enter`, I dreamed of a better way. Those dreams became thoughts of a single platform where everyone could post their updates, and read the updates of those they followed in a single feed.

Those thoughts became sketches. Those sketches became mockups, and those mockups became Updately: a social platform for daily updates.

![]({{ site.baseurl }}/img/blog/2020-12/sketch.png)

## How did I get here?

Before I get into the details of Updately, I want to give some context about my dev journey.

In 2015, I bought the domain wwsalmon.com, paid for a year of Weebly premium, and paid a guy on DeviantArt $10 to turn a mockup of my website into a Weebly theme. Being an impatient 12 year old, I soon started to tinker with the theme, learning CSS through Google and trial and error. Soon I had ditched Weebly entirely, hopping between completely new platforms and designs. With each iteration I learned something new or learned to use a framework better. That's how I learned web design and development.

I felt pretty good about my (static) frontend skills. I built some cool things, like [phillipian.net](http://phillipian.net), [a WordPress template for small publications](https://www.samsonzhang.com/morse-wp-theme), an [anti-YouTube-distraction Chrome extension](https://www.samsonzhang.com/youtubeliberation), and a [d3.js-based charting library](https://www.samsonzhang.com/sotajs).

The next big leap didn't come until May this year. Web design was always just a hobby of mine. I was a humanities kid; extracurricularly, filmmaking and photography were more serious pursuits of mine than coding. A sequence of events, though — documented in a series of passionate blog posts I'm grateful to be able to look back on now — shunted me off of this trajectory. Instead of an Ivy or liberal arts college, I ended up enrolling at an engineering school. A humanities kid with a passing interest in web dev and robotics, enrolled at a small engineering school.

Somehow, I ended up subscribed to the IndieHackers newsletter. One day, I found through the newsletter a task management app that was so jarring that I wrote an blog post about it and sent it to the app's creator. Somewhere in this process, I realized that I was a "hacker," a "maker," a "builder," just like these forum users I talked to and read about. The app's creator — Terry Xu — became an early mentor of mine, pushing me to join a program called TKS, which....man, it's been life changing, but I've yet to really understand that.

Anyhow, I decided that, if I was going to be a software maker, I should do it right. I dove into that thing that I had heard so much about but always been terrified of (as a static web dev clinging on to HTML and jQuery): **React**. Soon, I found a second mentor, Uber-engineer-turned-indie-hacker Phil Liao, and a group of aspiring devs to build and grow with in the community that Phil founded, Summer of Shipping. In Summer of Shipping, I worked on an app to tackle a pain point of my own, building out a fully fleshed out frontend and serverless backend on AWS. This app was SZ Project Tracker, which launched on ProductHunt in July.

I look back now and think it's slow that it took two months to build such a simple app, but the larger picture is that I effectively went from zero software engineering experience to having the skills and experience of a junior dev in two months. It was remarkable in terms of the opportunities that now opened up in front of me: **I was a software engineer**. I could actually build out all the mockups I made as a kid. I could contribute to products like Facebook and Twitter.

I was soon pulled into a stint with a student startup called Tadpole Tutoring, who had launched a successful MVP and were now building a v2 for their tutoring marketplace. Tadpole's founders had found me from a blog post I wrote about user-centered design and validated my skills by looking through my GitHub, presumably at my code for SZPT. I joined their team as the sole designer and frontend engineer. Given complete control over the frontend, I pushed my comfort zone just as I had with static sites. I used Next.js instead of vanilla React and tried out new tricks like loading skeletons. Working with a custom backend API rather than nicely wrapped AWS services, I got much more comfortable with authentication and data fetching patterns, too. Eventually, after building out the frontend to nearly completion, I wasn't able to resolve a management/workflow issue with the lead developer and business team, so I left the startup.

Over the summer, I also participated in Life Changing Summer, a high school entrepreneurship program run by Cornell University. While not as intensive as more well-known programs like LaunchX or Quarter Zero, LCS had a well-designed three-week curriculum and a great instructor, filling in a lot of gaps in my basic knowledge about how to launch and grow a startup. After meeting the CEO of LCS, and I guess impressing him with my problem-solving and technical skills, I ended up joining the LCS team as CTO. The program was scaling up to year-round virtual sessions, and I was in charge of setting up the infrastructure. I built out a landing page and application portal using Next.js and AWS — familiar tools — but also discovered the magic of Zapier, using webhooks to link our CRM, AirTable, and Thinkific up to the website and each other.

In September came the biggest opportunity yet. The CEO of LCS, Peter Cortle, also ran a steadily growing SaaS startup, StartupTree. An opportunity came to add two members to the team, and over far more experienced engineers, Peter offered me a job as a Product Manager and engineer at StartupTree, where I've been working now for three months.

StartupTree's codebase, frontend and backend, is written primarily in Django. The team is transitioning over to a React frontend, so that's mainly where I work, dabbling in the backend occasionally as necessary. Aside from differences in tooling, this is also the first time I've worked with a huge, pre-existing, production-deployed codebase; while building Updately, I realized that I've learned a ton just by internalizing the patterns and implementation details of all of StartupTree's past code — more on this later.

All this is the setting for present-day me. Terry Xu told me that, in his 15 year career as a software engineer, he specialized in something new at each company: frontend, backend, mobile; accumulating skills and knowledge so that now, working on his own things, he feels like he's "acquired the superpower to build anything my mind can imagine." I've hit just one-twentieth of his career length so far, but the same principles have been true about my experiences. Each project or team that I've worked with, I've used slightly different techniques and patterns, steadily adding to my toolbelt and honing older tools. It's another execution of one of my longest-held mantras: "do to learn, not learn to do."

It should come as no surprise, then, that instead of using familiar tools like AWS, I decided early on to use a very different backend stack for Updately. I wanted to incorporate what I had learned since building SZPT and use familiar tools more effectively. As soon as the seed for Updately was planted in my mind, I found myself binging MongoDB tutorials and reading the documentation of auth libraries that had previously caught my attention.

Now we're back to the present day, or at least last week. Let's get to the building!

## UI/UX design

As a working Product Manager and UI/UX designer, I maintain that good visual design stems almost directly from good experience design. I learned this as a static web designer, and [even wrote](https://www.samsonzhang.com/2020/06/25/the-most-important-step-in-web-design-happens-before-you-push-a-single-pixel.html) a blog post about it. The biggest mistake that aspiring — and sometimes even seasoned — UI/UX designers do is to design things that are pretty, rather than using rigorous design thinking to make sure that they're solving the right problems with their interfaces.

(footnote: The specifics of how to do this are varied. I didn't design SZPT at all before building it out; I adjusted the experience and interface in code, which was feasible because the styling was minimal. For my job at StartupTree, I make thorough full-fidelity mockups because the interfaces and code I'm working with alike are quite complicated and I want to know what I'm doing before building everything out. In larger design teams, it may be valuable to add wireframing and low-fidelity mockup steps in, too, allowing for evaluation and iteration before even getting to hi-fi.)

When I made SZPT, I was far from being comfortable with webapp UI patterns, or the tools to actually build them (React and Tailwind instead of traditional HTML and CSS). I knew what to emphasize, group, and communicate, though. While it wasn't visually *inspiring*, I would say that SZPT was *well-designed*:

![]({{ site.baseurl }}/img/blog/2020-12/szpt.png)

I knew I could do a lot more with Updately, though. I had built dozens and dozens of interfaces at this point, across completely different apps and design systems. I wanted to make Updately **beautiful**.

Functionally, Updately is very simple. There are only three types of pages: your feed, user profiles, and update pages, a pattern used by countless social platforms that any modern internet user would understand. Required design considerations are simply making sure that the right information is emphasized in the right places, with a clear visual hierarchy and consistent.

Between sketching in my notebook and writing code, I made a grand total of two spartan mockups in Figma:

![]({{ site.baseurl }}/img/blog/2020-12/figma.png)

The most important thing that I decided on here was actually the typography. Body text was a standard 20px size, and top headings were double that at 40px. By default, UI text would be 16px. But a lot important in-between was figured out in just those two mockups. What fonts would be used? How big should profile pictures be? Where should 16px font be used vs. 20px? How can opacity be used to further streamline visual hierarchy or communicate information?

I used IBM Plex Sans because it was a clean, tidy sans-serif font, while the serif Alegreya provided character in headings. I made the name and titles for items in the feed 20px, with 16px date headings. In my SZPT days, I for sure would have made the categorical label (i.e. date headings) 20px, and the item 16px, while my solution now emphasizes content much more elegantly. The font is a big step up from SZPT just using the system font, too.

In the end, I was *proud* of how Updately looked. It might seem like I'm making a big deal out of something small, but again, learning by doing is a matter of continuous improvement, made up incremental nudges upwards in standards of quality. Updately was a little nudge up to a new high water mark in terms of design that will only keep getting higher with time ✨

## Next.js

Finally, it's time to get into the technical details! What tools empowered me to actually build out the entire platform in just three days?

The key ingredient was Next.js. A React framework in name, using Next.js really just turns you into a React superhero. The key features (to me, anways):

1. All the basic React boilerplate stuff, cleanly implemented and wrapped up. Zero-config bundling, routing, Typescript support, and more
2. Zero-config server side rendering and static generation with or without hydration
3. Write and deploy robust API routes at the same time as the frontend.

For the first reason — basic dev things feeling just 10x easier — I fell in love with Next.js as soon as I started using it:

[https://twitter.com/wwsalmon/status/1283256503307296770](https://twitter.com/wwsalmon/status/1283256503307296770)

For Updately, though, it was the latter two points that became game-changers.

See, a very popular webapp tech stack these days is the MERN stack, standing for MongoDB, Express, React, and Node.js. MongoDB provides the database and an API for directly interfacing with it. Express powers a custom server, where you can build your own API with authentication, data processing, and whatever other features you want. You would then build your frontend in React, interfacing with your Express server to access user data. Node.js is the JavaScript environment that powers React and Express.

React and Express are great, already making frontend and backend production 10x easier compared to other solutions (at least for JavaScript devs). There's still a lot of work to set up a separate server and app, though, each with their respective config to do. Next.js eliminates this config, making not only frontend dev 10x easier, but **backend dev as well**. You don't need to spin up any servers; you can write your API entirely in Next.js, right next to your frontend code.

Adam Watham, creator of TailwindCSS, recently had this to say about Next.js:

[https://twitter.com/adamwathan/status/1333179422975864834](https://twitter.com/adamwathan/status/1333179422975864834)

That super tool approach is exactly how I used Next.js for Updately, building out both the frontend and backend in Next.js, and I can show you that "right next to your frontend code" is in no way an exaggeration:

![]({{ site.baseurl }}/img/blog/2020-12/apiroutes.png)

## Begone, AWS...

I knew that Next.js was the best tool for the job, on the frontend and backend. There were still the matters of data storage and authentication to figure out, though.

In these realms, the only tool that I had worked with directly before was AWS, interfacing with its DynamoDB and Cognito authentication functionality through the Amplify frontend API. These tools are powerful, abstracting away both the configuration and code for a complex backend in simple frontend wrappers. AWS powered SZPT and Life Changing School's application portal, the only two projects before Updately where I'd worked with Updately.

Since building Life Changing School's application portal, though, I knew that I was dissatisfied with AWS. It felt convoluted to use, not something that I could whip out without reservation like React or Next.js.

[https://twitter.com/wwsalmon/status/1296282223444992000](https://twitter.com/wwsalmon/status/1296282223444992000)

This dissatisfaction pushed me to find better tools for auth and data handling. I was also inspired by the backends I had worked with, but not on.

Tadpole Tutoring used FastAPI for its backend, with a custom auth implementation using JWT tokens. Having never worked with auth except calling what was to me a black box function, I remember being so impressed (and a little skeptical haha) when the lead backend dev said that the plan was to implement auth ourselves. I never saw more than snippets of the backend code, and kept using AWS for my own projects, but the knowledge was planted that a better way to do things existed.

Working with StartupTree's huge Django mono-repo probably gave me the last push that I needed. Though I was doing solidly frontend work, Django frontends and backends are closely intertwined; this fact, combined with the lack of company documentation, meant that I was diving into the backend functions almost as much as I was building the React frontend. I hadn't gotten to working with auth code directly yet, but the black box conception of authentication in my mind steadily wore away as I soaked in StartupTree's backend structure.

## The Next.js of authentication (and authentication for Next.js): NextAuth

The first replacement tool I found was a library called [NextAuth.js](https://next-auth.js.org/).

**Basically, NextAuth is magic.** NextAuth is to implementing authentication as Next.js is to basic frontend and backend development. This demo code on the NextAuth homescreen basically tells the whole story:

![]({{ site.baseurl }}/img/blog/2020-12/nextauth.png)

**In that screenshot is all the code you need for a full auth implementation**. A single Next.js API route automatically handles OAuth redirects, session creation, and everything else. With just this code (actual Updately source code):

```tsx
Providers.Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
})
```

users can use Google sign in to create sessions. It's as easy to add Facebook, Twitter, GitHub, or whatever else supports OAuth.

To access this from the frontend, I can make a button that calls an imported function `signIn('google)`, which brings the users through Google's sign in flow and redirects back to the app now with an authenticated session.

To access the session, I use the `useSesssion()` hook in the frontend, and I can get the current user's information and even Google profile picture.

Even better, I can use `getSession()` **IN BACKEND API FUNCTIONS.**

Next.js API functions look like this:

```tsx
export async function newUpdate(req: NextApiRequest, res: NextApiResponse) {
	...
}
```

Within that function, I can do this:

```tsx
export async function newUpdate(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req });
	const userEmail = session.user.email;
	...
}
```

And bam, I've got the email of the currently logged in user. I know that this is secure, because it came directly from NextAuth. That means that I can now safely fetch and return private data associated with that user.

No hours of setting up auth flows. No hours of configuring AWS. I didn't even have to deal with JWT tokens directly. In literally seconds, I have a working, robust auth solution thanks to the magic of Next.js and NextAuth.

## MongoDB, Next.js (backend), Next.js (frontend), Node.js. The...MNNN stack?

So far, I've been talking about all the tools necessary for the backend and frontend (and through the frontend the user) to interact with and manipulate user data. Storing the data, and interfacing with this data directly, is the last remaining piece of the puzzle. For this, I decided to use MongoDB.

Why use MongoDB? I don't really know. I'll be honest, I know very little about this part of app development. I know the names relational and document databases, and at a high level I know what they mean, but I have no idea when and how each should actually be used.

I had dabbled with MongoDB briefly when first starting to learn web dev. It's a popular database tool to use with React (i.e. in that MERN stack from earlier), and I thought there must be a reason. Rather than being a well-informed choice, then, MongoDB was a semi-familiar default.

I had my fair share of struggle learning how to work with MongoDB through the Mongoose library. This, alongside with server side rendering, contributed pretty much all the difficulties I faced building Updately. When I figured things out, though, I was quite happy with how easy MongoDB was to use, at several levels.

First, I was able to get a MongoDB database up and running super easily, and completely for free, using MongoDB's own Atlas hosting solution. Once set up, I could view all data in my data base through a pretty web interface, even directly making updates or deletions if needed (which I sometimes did during testing).

![]({{ site.baseurl }}/img/blog/2020-12/mongodb.png)

Now, to actually get data into the database. The first step is to define some model schemas:

```tsx
const reqString = {
    type: String,
    required: true,
};

const unreqString = {
    type: String,
    required: false,
};

const authorObj = {
    name: reqString,
    image: reqString,
    email: { ...reqString, unique: true },
    urlName: { ...unreqString, unique: true, },
    bio: unreqString,
    linkedin: unreqString,
    twitter: unreqString,
    website: unreqString,
};

...

export const userModel = mongoose.models.user || mongoose.model('user', userSchema);
```

In API functions, these exported models can be imported and various functions called on them to add or modify data. For example, here's a straightforward account creation function (that would be called only on the server, i.e. through an API route or when server side rendering):

```tsx
export async function createAccount(user) {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    const urlName = user.name.split(" ").join("-") + "-" + short.generate();

    return userModel.create({
        email: user.email,
        name: user.name,
        image: user.image,
        urlName: urlName,
        private: false,
    });
}
```

Updating existing documents is a little less intuitive, but straightforward after getting the hang of it. First, `findOne` or `find` is called on the model with a certain query to find a specific document. Then, the document is modified as if it were just a normal JavaScript object. Finally, `save()` is called on the object, converting all the object modifications into document modifications and sending a request to the MongoDB database to make the changes.

```tsx
let thisUpdateUser = await userModel.findOne({ urlName: req.body.username });
thisUpdateUser.name = "New name";
await thisUpdateUser.save();
```

There isn't a lot of protected data, but with NextAuth, it's fairly easy to secure things where needed. `getSession()` securely gives the information of the user who sent the request, so it's as easy as comparing their email to the email stored in the database and only returning back to the frontend if things match up.

As an example of how I actually used these patterns: NextAuth makes it easy to add sign in callbacks, so every time a user signs in, I check if a user object already exists with their information in MongoDB, creating a new one if not.

```tsx
signIn: async (user, account, profile) => {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    const foundItem = await userModel.findOne({ email: user.email }).exec();

    if (foundItem) return true;

    await createAccount(user);

    return true;
}
```

All other functionality is implemented using the same patterns, from posting updates to following other users (`following` and `followers` fields exist on each user object; when one user follows another, the follower's email is added to the followee's `followers` list, while the followee's object ID is added to the follower's `following` list).

## Server side rendering and dynamic page routes: Next.js gives us superpowers, pt. 4

I want to return to the frontend for the last few technical details.

The first is a relatively simple Next.js feature that made building Updately a whole ton easier: dynamic page routes.

Here's how I wanted Updately's URLs to work: `[updately.vercel.app/@username](http://updately.vercel.app/@username)` would go to the profile of `username`, and `[updately.vercel.app/@username/YYYY-MM-DD-title](http://updately.vercel.app/@username/YYYY-MM-DD-title)` would go to the corresponding update by `username`.

I did something similar with SZPT, but I don't remember how I did it with vanilla React at this point. With Next.js, though, adding this functionality was more or less trivial. Have a look:

![]({{ site.baseurl }}/img/blog/2020-12/dynamicroutes.png)

Simply by naming our file `[updateUrl].tsx`, and putting it in a folder `[username]`, Next.js will handle any links of the form `[updately.vercel.app/username/updateUrl](http://updately.vercel.app/username/updateUrl)` and serve up the appropriate React pages, passing the URL contents to the React components through the `useRouter` hook.

The thing is, some of these URLs — in fact, all but a select few of them — will be invalid. The only way to know if a link is valid or not is to make a query to our database with the username and update name from the URL to check if the corresponding document or data point exists. Ideally, this would happen *before* the page loads, so we can immediately display a 404 if the link is invalid.

That's where server side rendering comes into play. With normal client side rendering, a near-empty HTML document is first passed to the browser, along with some bundled JavaScript. After the page loads, the JavaScript executes, rendering out the React app contained within, which then fetches the relevant data and fills in the page. With server side rendering, initial data fetching and DOM rendering is done on the server rather than the browser. That is, when a user goes to a URL and sends a GET request to the server, the server does the initial data fetching and DOM rendering and only then sends a response to the browser, so that as soon as the page loads for the user all a set of initial data and DOM elements are visible. In our case, this could also be a 404 error if the server finds that the specified user or update does not exist — a 404 error that would load immediately rather than being an awkward redirect some time after page load.

The downside of server side rendering is that it takes longer for the page to load, given it's doing more work or waiting on data fetching requests in between getting the browser request and returning a response. On the other hand, a positive side effect of server side rendering is that SEO works much better, as all the information is contained in the HTML directly returned to a request. Slack, for example, wasn't able to generate link previews for my SZPT links:

![]({{ site.baseurl }}/img/blog/2020-12/szptlink.png)

But it does so beautifully with Updately links:

![]({{ site.baseurl }}/img/blog/2020-12/updatelylink.png)

For many apps, SEO for app pages likely doesn't matter, and the slow loading time of SSR might outweigh other benefits. For Updately, though, pre-rendering pages is something that makes sense on multiple fronts, so the tradeoff was worth it and the majority of app pages use SSR to fetch data.

Implementing up SSR in Next.js is as easy as exporting a `getServerSideProps` function from the same file as the React code for the page. This function can either return `{notFound: true}`, which results in a 404 page being rendered, or an object with props to pass to the React app.

For example, here's the SSR function for the homepage:

```tsx
export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        const feedData = await getDemoFeedRequest();
        return {props: {userData: null, feedData: JSON.parse(JSON.stringify(feedData))}}
    }

    let {userData, feedData} = await getCurrUserFeedRequest(session.user);
    return {props: {userData: JSON.parse(JSON.stringify(userData)), feedData: JSON.parse(JSON.stringify(feedData || []))}};
};
```

Here, `getDemoFeedRequest` and `getCurrUserFeedRequest` are functions I've written that query MongoDB for either a demo feed of updates, or the feed of updates from people followed by the user. Because this SSR function executes only on the server, we don't need any extra `fetch` or `axios` calls; we can securely make requests to our database directly. (Excuse the `JSON.parse(JSON.stringify)` calls — they're a quick and dirty way to clean up data before returning it to the frontend.)

For all that I had used Next.js, I had never actually implemented SSR before. In fact, I was terrified of SSR. It seemed like a world of complex patterns and prop names that I knew nothing about.

After taking the plunge with Updately, though, it doesn't seem scary at all. It even felt quite intuitive to me. Aside from the fear being misplaced in the first place, I think this comfort also came from a month of working with StartupTree's Django codebase, which similarly used server functions to fetch the user function and parse all the necessary data before returning it to the frontend.

With this realization, I had a more general one, too. Software engineering ability is often measured by the tools you know how to use. An engineer may have five years of React experience, or ten years working with PHP. My stack has been HTML, CSS, Jekyll, WordPress, React, and some general Node.js.

Just as important, though — and eventually much more important — is familiarity with specific *patterns*. With StartupTree, I thought that I was simply getting familiar with Django, experience that would only really be useful if I was working with Django, or maybe another Python framework. I was building language- and framework-specific knowledge, of course, but with Updately I was able to apply not my newfound Python knowledge, but rather an intuition about server side rendering that I didn't even realize I had acquired.

It's like knowing algorithms and data structures. The value of theoretical CS knowledge tends to be downplayed in software engineering because so much of it has already been abstracted away: building product or even backend infrastructure often doesn't apply much theoretical CS at all, and tons of engineers enter the field without rigorous CS or engineering education. Occasionally though, scraps of knowledge about searching algorithms or object constructors from AP Computer Science (taught in Java) come in handy when tossing functions and arrays around. Superficial knowledge of certain patterns, whether it comes from a textbook or experience, does sometimes guidance hard to get from a purely "do to learn" approach.

## Tailwind CSS and custom atomic CSS for styling

My approach towards CSS has not changed since building SZPT, but it's changed hugely from when I was just building static websites, so I thought it might be worth a quick recap.

Writing CSS stylesheets is an art: carefully tweaking the properties of each element, sharing code where possible, building consistency and coherence across the page. With a deep enough understanding, rigid rulesets and crisscrossing browser compatibility issues can be shaped into a boundless canvas for expression.

Styling in React apps, on the other hand, is *brutal*. Stylesheets? What are those? The sanctity of HTML classes elegantly interfacing with carefully cascading rules is smashed to pieces with style blocks and inline rules all over the place. Sure, you *could* use a spreadsheet, but that's so 2015. You might as well use jQuery, too.

When I first confronted this brutality, I was so taken aback that I wrote [a blog post proclaiming the death of CSS](https://www.samsonzhang.com/2020/05/13/the-artistry-of-css-and-its-death-a-reflection-about-css-and-js-frameworks-and-the-evolution-of-css.html).

There was no avoiding the unceasing churn of progress, though. With SZPT, I looked to the guidance of a former classmate of mine, [Miles McCain](https://miles.land/), who was then my representation of the modern bootstrapping web developer. He had built a CSS UI library called a17t, meant to be used with Tailwind CSS. Trusting in his solution, I made my entry into the damp, dark world of CSS and UI frameworks.

Turns out, building with a17t and Tailwind was a breeze. As Adam Wathan says on Tailwind's homepage, "if you can suppress the urge to retch long enough to give it a chance, I really think you'll wonder how you ever worked with CSS any other way." Out of the ugliness of React styling emerged a new kind of elegance, one that, as Adam Wathan predicted, has even permeated back to the way that I write custom stylesheets.

After using Shopify's Polaris components for an internship application, and the Material UI library at StartupTree, I at first looked for a pre-made styling solution to use for Updately (along with Tailwind or my own utility classes). a17t had been my workhorse library since building SZPT — I had used it for Tadpole Tutoring and Life Changing School — but it clashed with the visuals I had in mind for Updately, and I was anxious to try out something new.

Ultimately, I realized that any pre-made library would be entirely overkill for such a simple project, and decided to write my own stylesheet to use in conjunction with Tailwind. Unlike my pre-SZPT stylesheets, I avoided semantic selectors as much as possible, writing only component-level atomic utility classes. For example, here's the styling for multiple variants of buttons used throughout the app, with Tailwind `@apply`s scattered throughout:

```scss
.up-button {
    @apply px-4 h-12 rounded-md transition font-semibold;
}

.up-button.small {
    @apply h-10;
}

a.up-button {
    @apply inline-block;
    line-height: 3rem;
}

a.up-button.small {
    line-height: 2.5rem;
}

.up-button:disabled {
    @apply opacity-25;
    cursor: not-allowed;
}

.up-button.primary {
    background-color: #0026FF;
    @apply text-white;
}

.up-button:not(.text):not(.primary) {
    @apply border-2 border-black;
}

.up-button:not(.text):not(:disabled):hover {
    @apply bg-black text-white;
}

.up-button.text:not(:disabled):hover{
    @apply bg-gray-100;
}
```

Now, powerful responsive layouts were easy to put together with a mix of Tailwind utilities and my own component classes:

```html
<div className="flex my-4 sm:my-0 sm:ml-auto order-2">
    <Link href={"/@" + userData.urlName}><a className="up-button text ml-auto">Your profile</a></Link>
    <Link href="/new-update"><a className="up-button primary ml-4">Post new update</a></Link>
</div>
```

## Deploying on Vercel, or: Next.js saves the day, pt. 5

Over the course of three days — a few hours on Wednesday and Thanksgiving Thursday, and all of Friday — I put Updately together, using techniques new and old. I promised some friends that I would launch Updately by Friday, a rapid three-day turnaround time, and was resolved to push myself to be formidable and follow through. At 9 PM on Friday night, I had wrapped up my coding and was ready to deploy.

My first thought was to deploy on Netlify, where I hosted SZPT and several other apps. I knew that there was a package `next-on-netlify` that would compile Next.js API routes to Netlify serverless functions, so I set everything up and deployed on `updately.netlify.app`.

Unfortunately, I ran into errors immediately. Because the backend functions sent requests to MongoDB, running `mongoose.connect` when receiving each request, Netlify saw my functions as never closing the connection and running until they timed out. I tried to fix this by calling `mongoose.disconnect` at the end of each function, but quickly ran into a whole cascade of errors.

At this point, I came to my senses. Why was I even using Netlify, using a workaround package, to host my Next.js app? Next.js is a product of Vercel, which had their own free one-click hosting service. I undid my Netlify modifications and re-deployed Updately at `[updately.vercel.app](http://updately.vercel.app)` without issue.

![]({{ site.baseurl }}/img/blog/2020-12/feed.png)

The thrill of launch that had been building for the past few days now kicked in. I sent out the link to friends on Slack who sent updates. Only two people signed in on the first night, but it was thrilling to see their profile pictures and updates show up on the app — my app. Just loading what had previously been at `[localhost:3000](http://localhost:3000)` up at an actual app address is exciting (and confusing if you have both open at the same time).

An error with the sign in callback (on slightly slower connections, the browser would reach the home page and try to fetch user data from the database before the sign in callback had even created it) prevented a couple of people from getting set up, which I fixed a few days later, with the help of a quick reply to [an issue I posted in the NextAuth GitHub](https://github.com/nextauthjs/next-auth/issues/897).

## Outcomes

Updately never really had a launch. I said that I would build it out by Friday, and I did just that. It's like I'm still following Summer of Shipping's building-first approach of "ship ship ship," or the more hip Marc Andreessen quote and Gen Z Mafia motto "IT'S TIME TO BUILD." I proved to myself that I'm pretty damn good at building software, and solved a pain point experienced by myself and a few others.

The thrill of shipping Updately quickly faded, though, when a day later, almost nobody was using it. I started questioning whether I had even found the real pain point, and created something valuable enough for people to switch from their Notion and Slack workflows, even if they're marginally more annoying. I assumed that people would be frustrated enough to care because I was frustrated enough to care, and others around me validated this frustration. This is a common problem with customer discovery and product validation, though. People are naturally nice, and as long as your product solves *a* problem, they'll tell you that it's great. That doesn't give you the information that you really want, though: whether your product is actually *valuable*, worthy enough for a user to invest, if not their money, at least their time and energy into creating an account and bringing into their lives. I'm a working product manager and I know how to conduct interviews to identify actual user needs and pain points, but I neglected to do so for Updately.

A little more time since launch, though, has given me some more hope. One of my friends is an avid user of the platform, writing even longer updates than me every night (he also used SZPT before). A friend not even in TKS found out about the platform, immediately doing more with the platform than I even thought possible (pasting in Spotify embeds and using custom CSS to change heading colors??) and bringing two more users on to the platform, who have been writing daily updates for a few days. One friend brought up that the value prop of Updately was not necessarily even making it easier for those who already wrote daily updates to share them, but to bring the benefits of daily updates to those who didn't yet write them.

There's a lot more that can done with Updately. Even with highly un-optimized connection features (need to manually send your profile link to someone to have them follow you), the potential of the network effect has already been demonstrated with that one out-of-TKS friend. Plus, everyone who reads my updates on the platform without an account is shown a big blue "Follow" button pushing them to get on the platform as well. I had features on my mind that I didn't get around to building, like searching for users, leaving comments, email notifications, etc. Maybe in the future I can clean Updately up, make a landing page, and give it a proper launch on ProductHunt. In the meantime, I'll just slowly collect users from within TKS and my own network.

The main value of building Updately for me was to have a public project to share with others, a catalyst for building meaningful connections and finding opportunities. Sharing Updately out to students in TKS put me on the community's (and well-connected instructors') radars, getting quite a few reach outs and likely more to come.

An even more exciting and unexpected connection came a few days after launch. On a friend's recommendation, I tried out an app called Sunsama, which offered similar daily task tracking and weekly reflection value props. After signing up for the trial, I sent the CEO of the company an email with a few screenshots of Updately, thinking he might be interested to see a product that tackled the same pain points as his. My whole software and entrepreneurship journey, TKS and all, started with a cold email to a guy on IndieHackers whose app I tried out. Who knew what this email could lead to.

![]({{ site.baseurl }}/img/blog/2020-12/email1.png)

![]({{ site.baseurl }}/img/blog/2020-12/email2.png)

The reply, well, it's all that I could have hoped for and more.

![]({{ site.baseurl }}/img/blog/2020-12/email3.png)

...

![]({{ site.baseurl }}/img/blog/2020-12/email4.png)

I followed up with more details about my gap year and current job, and said that I would be busy until at least halfway through Q1 2021, but would be excited to potentially work with him after that.

Will I end up working on Sunsama? I'm not sure. Other TKS kids' projects have resulted in similar connections and opportunities, but with far more exciting startups coming up with novel drug discovery solutions and the like. That was the level that I want to get to, too. "This is your worst-case scenario now," TKS co-founder Navid Nathoo said. Regardless, though, it's exciting that a little project that I built — incorporating half a year of SWE learning and years of design obsession and web work before that — was able to just about get me a job offer at a rapidly growing startup.

I left a few takeaways in the TKS Slack:

> I had my doubts about whether Updately was even worth spending my time on, compared to more "meaningful" projects or learning. This unexpected outcome, though, demonstrates a few things we've talked about in TKS/Accelerate:
> 
> - Build, build, build. Don't just think about what to build all day, if you have an idea just go and make it happen. Even if it's not the most  idea, a hell of a lot more will potentially happen if you just get something shipped than if you spent that time thinking of something better to do.
> - When reaching out, supercharge potential connections by **demonstrating value**! I knew that Sunsama's CEO would be at least a little interested in someone who had built an entire competing (or at least overlapping) product.
> - What caught the CEO's eye in terms of value was my building and design skills. The first skill comes from...building! Go out there and build! The second is a reflection of **high standards**. As a side project, Updately could have been just a scrappy little interface with messy code, but I held myself to high standards and made it as well-designed and cleanly-coded as I could. You won't become a pro unless you strive to be like one 🙃
> 
> I know that lots of you are working on more impressive things than an updates platform, and seeking more exciting opportunities than a software building job in a relatively small startup. I'm here to rapidly grow and level-up beyond where I am now, too. But these learnings will always be valuable. Chase your curiosity and build out your ideas. Hold yourself to high standards. Send those cold emails. Grow exponentially 🦄

## Conclusion

To tally up items on the balance sheet — in three days, this is what I accomplished:

- Found my new preferred auth and backend solution for hacking together personal projects: NextAuth and Next.js API routes
- Learned how to use MongoDB, my new preferred database solution until I understand databases better
- Learned how to implement server side rendering with Next.js

On the non-technical side:

- Made my name a lot better known in the tech training program I'm in 😎
- Got all but a job offer for a startup with $40K MMR and 15% MoM growth
- With this article, documented my growth as a dev over the past half a year, and demonstrated in depth my software building knowledge and ability

Of course, less positive aspects are also to be included:

- Just a few active users, with no plan for marketing or growth ❌
- Opportunity cost: could I have spent those three days, and all the time working on this blog post, working on a more interesting project, say with AGI or QML? Could I work my way to an offer to work with OpenAI or Regetti rather than Sunsama?

Overall, though, it's hard to regret this project for how much I got out of it with such a small time commitment. Big-picture opportunity cost is perhaps the only overall downside to consider.

In terms of the lackluster validation, marketing, and growth efforts — all the things other than designing and building the app, which I'm great at — I'll definitely be trying to improve my skills with future work. Maybe that means actually trying to grow Updately, as a few friends have suggested. Besides that, I'm currently working with my former mentor on his *very* early-stage mental health SaaS startup. As I help build out the MVP, I'll be watching a masterclass in SaaS validation and marketing play out before my eyes. A new (actually old) part of the TKS curriculum, too, will push me to explore more what it takes to launch and grow a successful startup.

Learn, build, share, repeat. Those are the power steps for growth as an engineer and entrepreneur. Updately was just one turn of the wheel, with many turns preceding it (some partial) and many more to come.