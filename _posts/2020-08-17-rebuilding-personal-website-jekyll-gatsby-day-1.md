---
title: 'Rebuilding my personal website, Jekyll => Gatsby: Day 1'
layout: post
date: '2020-08-17 12:26:38'
---

![]({{site.baseurl}}/img/blog/2020-08/curr-site.jpg)

I've been using Jekyll for my personal website since [at least two years ago](https://github.com/wwsalmon/webtest/commit/f608147b45880aac217902f19c89b411253465a5), when I used it to build a clean little [video portfolio](https://wwsalmon.netlify.app/). It was a huge step forward for me then, having only built raw HTML/CSS websites before, with a sprinkle of JQuery-flavored JS. Instead of hard-coding each page and item, getting really good at copy-pasting, I could auto-generate and populate pages with markdown and CSV files! Jekyll was perfect for me then, remained so when I rebuilt my website and added a blog, and is still immensely attractive today. Its blogging and micro-database (collections) features work effortlessly right out of the box; tools like Jekyll admin make managing posts as easy as using a full CMS; Liquid templating is intuitive and nonintrusive, so my raw HTML/CSS/JS skills carried over and continued to grow. Plus, it works seamlessly with GitHub pages, letting me gradually ease my way into more of the real web dev world (Netlify, Vercel, AWS, VPS's...).

![]({{site.baseurl}}/img/blog/2020-08/curr-blog.jpg)

![]({{site.baseurl}}/img/blog/2020-08/jek-admin.jpg)

Once again, though, I've embarked on a quest to rebuild my website, and in the process I'm leaving Jekyll behind for Gatsby. I've never used Gatsby before, and I've only worked with React for a few months, so I'll be learning a lot in the process. In this post and several more to come, I want to document this learning and building process, ["learn in public"](https://www.swyx.io/writing/learn-in-public/) as @swyx puts it. The goal of these posts, again borrowing @swyx's wisdom, is to "make the thing you wish you had found when you were learning." I'll document my process, resources that I used, etc., helping me solidify my learning, and hopefully helping you gain some insight, too, whether you're just starting out with Gatsby like me or a veteran curious about a newbie's approach.

(Side note: I have a few reasons and ideas for this redesign — namely: 1. I want to get hired as an engineer, 2. I want to collect and showcase my writing, and 3. this site was designed as a film/photo portfolio and consequently not optimized for either of these things — but in this sequence of blog posts, I'll just be talking through the technical side of the process).

# Why Gatsby?

There are a couple of reasons why I want to use Gatsby for this rebuild:

1. React and the workflow/ecosystem around it are the industry standard right now. When searching for jobs or working on a team project, there's a very good chance that React experience will be very important, so the more comfortable I can get with it, the better.
2. Industry aside, this is a well-timed learning project for me. I only started learning React in May. I've been making rapid progress, launching a web app with a vanilla React frontend in July and building a Next.js-based frontend for a startup that hired me in August (Next.js, with its static optimization and out-of-box routing, is *so* much nicer and easier to work with than vanilla React...). Gatsby is one more super popular React framework that I want to build at least some familiarity with, its integration with GraphQL a further learning/solidifying opportunity.
3. As much as I love Jekyll, I'm a bit tired of Liquid templating. Working with variables, arrays, strings, any sort of data outside of nicely-structured collections and frontmatter is a pain, as anybody familiar with `{{ "{% assign " }}%}` and `{{ "{% capture " }}%}` would likely agree. I had a taste of something better with ES6 array functions and React state management, and I wanted more.
4. Gatsby is perhaps the best React framework for a blog/personal website. It's a popular and well-supported use case, with a huge ecosystem of third-party plugins, CMS integrations, and other tools. Well-documented support for implementing blog functionality with Markdown docs and front matter in particular makes Gatsby stand out as a suitable replacement for Jekyll.

I remember reading articles about developers jumping ship from Jekyll to Gatsby even when I was just getting started with Jekyll. It's taken a bit for my React skills to catch up, but ever since they started to, the idea of rebuilding my website in Gatsby has been on my mind. But enough talking (and in my case this morning, browsing Awwwards and developer friends' websites for inspiration): let's get learning and building!

# Getting Started

## Some git business

My first task was just setting up a repo I could commit code to. With previous website redesigns, I had just made a new repo, either ditching the old one or manually copying the code back in. This time, I created a new `gatsby-dev` branch, letting me keep all my historical commits in one place even after I merge and deploy my new site.

Since I needed to update my live website while working on my new one — for example, publishing this blog post — I needed to keep copies of both master and dev branches on my computer. To do this, I simply re-cloned my `portfolio` repo into a new folder, checking out into the dev branch there.

## Getting into Gatsby

["Quick Start"](https://www.gatsbyjs.com/docs/quick-start/) — a reasonable place to start, right? At the *very* beginning of learning something, though, I actually find that documentation isn't the most helpful resource, often either too slow to get a sense of things or too complicated to understand well. As an alternative, I find video tutorials to be much more effective. Watching someone walk through setting up a project, seeing all the terminal commands, file structures, and code almost as if you were doing it yourself, is, for me, the best way to quickly get a sense of how to work with a new framework or tool.

Specifically, I used this crash course from Traversy Media. The video is an hour long, but I find I can usually get away with playing tutorials at 2x speed and skipping through them a bit. Traversy Media tutorials are always top-quality, and this was no different, giving me exactly the kind of walkthrough that I wanted, from the first `npm i` to a functional blog.

After the Traversy video, I got curious about hooking up a CMS or similar interface, as I wanted to find a workflow comparable to using Jekyll admin, and something I could potentially use for client projects. I had heard good things about [Sanity.io](http://sanity.io), so I did a quick search and found [a livestream](https://www.youtube.com/watch?v=5idNI1Qpy40) of a developer connecting Sanity.io to their blog. This wasn't a walkthrough, so it was a little disjointed, the developer figuring things out as they went; but the understanding I came away with was that Sanity would actually be as much, probably even more, configuration and work to set up than the Gatsby blog itself. As such, I decided to table it for later. Build a functional file-based Gatsby blog first, then try to hook it up. To reference a quote that @pliao39 [shared with me](https://twitter.com/pliao39/status/1285090450051870722): "Make it work, then make it right."

## Generate starter code

Gatsby development starts by installing the Gatsby CLI with `npm i -g gatsby-cli`. Now you can run `gatsby new [dirname]` to generate a starter Gatsby project. I ran `gatsby new temp` to generate the code in a new folder, copying the generated files over to my actual repo manually.

Once the starter code is generated, running `gatsby develop` should spin it up at localhost:8000. I ran into a few issues immediately, though. Running `gatsby develop` in the newly generated temp folder spit out the command line error `Cannot find module 'gatsby-cli/lib/reporter'`. I found [a StackOverflow thread](https://stackoverflow.com/questions/56658152/how-to-fix-gatsby-develop-error-cannot-find-module-gatsby-cli-lib-reporter) offering several solutions: run `npm install --save gatsby-cli`; use `yarn`; delete `node_modules` and run `npm i` again. The last option was the simplest, so I tried it, and voila, the error went away.

Copying the starter code into my repo folder once again prevented `gatsby develop` from working for some reason, this time displaying `Error: The result of this StaticQuery could not be fetched` in the browser. Once again, deleting `node_modules` and re-running `npm i` fixed the problem.

With the starter code up and running, I set a goal for the night: set up all the necessary CSS and imports to replicate the navbar of my current site.

# Configuring Gatsby

## Atomic-ish CSS

There are tons of options for implementing styling in React, including with Gatsby. There are ready-out-of-the-box frameworks like Bootstrap and Bulma; hand-written scoped CSS-in-JS; and utility frameworks like Tailwind.css. I'm highly partial to Tailwind.css, which brings just about all of CSS, responsiveness and all, to its utility classes, making it incredibly easy and fast to style web interfaces without touching CSS directly. This was a smaller project where I had a good idea of how the website should look, so there was less of a need for rapid prototyping. Like with a previous project, then, I settled for an in-between solution: writing my own mostly utility-based, sometimes component-based, atomic-ish CSS, borrowing lots of conventions and patterns from Tailwind.

For example, here are a bunch of positioning/display classes that pretty directly mirror Tailwind's:

```css
.absolute{
    position: absolute;
}

.relative{
    position: relative;
}

.fixed{
    position: fixed;
}

.block{
    display: block;
}

.flex{
    display: flex;
}

.flex-col{
    flex-direction: column;
}

.justify-center{
    justify-content: center;
}

.justify-end{
    justify-content: flex-end;
}

.items-center{
    align-items: center;
}
```

I even wrote a script to generate padding and margin classes, exactly how Tailwind does them:

```css
:root{
	--p-1:{padding:0.25rem;};
	---p-1:{padding:-0.25rem;};
	--p-2:{padding:0.5rem;};
	---p-2:{padding:-0.5rem;};
	--p-3:{padding:0.75rem;};

	/* ... */

	--mx-24:{margin-left:6rem;margin-right:6rem;};
	---mx-24:{margin-left:-6rem;margin-right:-6rem;};
	--mx-32:{margin-left:8rem;margin-right:8rem;};
	---mx-32:{margin-left:-8rem;margin-right:-8rem;};

	/* ... */
}

.p-1{@apply --p-1;}
.-p-1{@apply ---p-1;}
.p-2{@apply --p-2;}
.-p-2{@apply ---p-2;}

/* ... */

.mx-24{@apply --mx-24;}
.-mx-24{@apply ---mx-24;}
.mx-32{@apply --mx-32;}
.-mx-32{@apply ---mx-32;}

/* ... */
```

But there were also some higher-level classes sprinkled in, that are much easier to implement in a stylesheet than with repeated long strings of Tailwind-esque utility classes.

```css
.container{
    max-width: 75rem; /* 1500px */
    @apply --mx-auto;
    @apply --px-4;
}

.name-lg{
    font-size: 42px;
    line-height: 0.53;
}

.name-sm{
    font-size: 28px;
    top: 2px;
}

@media (min-width: 600px){
    .name-lg{
        font-size: 56px;
        top: -12px;
    }

    .name-sm{
        font-size: 36px;
    }
}
```

I also took one more thing from Tailwind: Preflight, a light modification on the popular Normalize.css, designed to "smooth over cross-browser inconsistencies and make it easier for you to work within the constraints of your design system." ([Tailwind docs](https://tailwindcss.com/docs/preflight)) The micro-framework removes margins on various content blocks (`p`, `h1`, `blockquote`, etc.), makes headings and lists unstyled, and makes images block-level, among other small things; I added further small changes to reset styling on buttons, allowing me to make them look however I wanted while preserving the accessibility and usability benefits of using HTML buttons. 

## Global CSS + PostCSS in Gatsby

It seems like every React framework has a slightly different way to add global CSS. In Vanilla React, you can add a good old `<link>` tag in `public/index.html` or an import in `src/app.js` or any other high level component. Next.js forces you to import them in `pages/_app.js`. The recommended way in Gatsby seems to be importing CSS files into a root-level file called `gatsby-browser.js`, which, I'll be honest, I have no idea what it actually does — but it works! My imported CSS becomes global app-wide CSS, and I can use the utility classes that I built out.

You might have noticed, though, that there are a bunch of `@apply`s in my CSS. Naively, I thought that this was a natively usable feature of CSS. After seeing `invalid property` in both Chrome and Firefox, I did a little more research, only to find that the `@apply` directive has been essentially deprecated, never making it past the draft phase and consequently supported by exactly zero browsers. I was used to using it before, i.e. with Tailwind, because my previous projects had been set up with PostCSS, so I went about setting up PostCSS with Gatsby.

Thanks to Gatsby's plugin ecosystem, this was super easy to do. I ran `npm i gatsby-plugin-postcss`, then `npm i postcss-apply`, finally adding both PostCSS and the postcss-apply plugin to Gatsby by adding the following object in the `plugins` array in `gatsby-config.js`:

```jsx
{
	resolve: `gatsby-plugin-postcss`,
	options: {
		postCssPlugins: [require(`postcss-apply`)],
	},
}
```

With this done, I could now reference the rules I put in `:root` in the rest of my CSS file, for example `.container` containing directives `@apply --mx-auto` and `@apply --px-4`.

## Adding Google Fonts

Adding Google Fonts is again an easy task thanks to a Gatsby plugin called `gatsby-plugin-google-fonts`. I simply `npm i`'d it, then added the following snippet to `gatsby-config.js`:

```jsx
{
  resolve: `gatsby-plugin-google-fonts`,
  options: {
    fonts: [
      `DM Sans\:400,400i,500,500i,700,700i`,
      `DM Serif Display\:400,400i`,
      `DM Serif Text\:400,400i`
    ],
    display: 'swap'
  }
}
```

## Setting up TypeScript

I've been trying to use TypeScript (JavaScript with types, with full backwards compatibility; it's pretty intuitive) as much as possible. Conveniently, one of the three pages in Gatsby's starter code was titled "Using TypeScript," informing me that "Gatsby supports TypeScript by default!"

Getting TypeScript set up was accordingly simple. I ran `npm i typescript`, then `tsc --init`, creating a `tsconfig.json` file in the root directory. The file is flooded with commented-out options, with a few defaults enabled. The only change I had to make was un-commenting `"jsx": "react"` to get .tsx files working.

# Building the navbar

Now, everything was set up for me to be able to fully replicate then navbar from my old website (in reality, I jumped straight into trying to build out the navbar, adding configuration and CSS as I went).

My navbar is pretty straightforward: a little nameplate on the left, and a list of links on the right. There are two little fancy things on top of this:

{% include video-gen.html src="/img/blog/2020-08/navbar-scrolling.mp4" %}

1. Once scrolled past a certain point, the "samson/zhang" nameplate shrinks to "s.zhang".
2. On mobile, the list of links is replaced by a right-side hamburger menu.

The nameplate font size also shrinks slightly on mobile.

So, I created a `navbar.tsx` component with a functional React component within it. The component has two boolean state variables: `scrolled` and `expanded`, corresponding to the nameplate shrink and menu pop-out, respectively. Since I have to render the list of links in two places, I made an `items` array of objects with `text` and `to` properties (I could avoid this by cleverly changing classes around, and would/have in projects where referencing a common array would be troublesome, but with how nice React state management and re-rendering is, it's way cleaner to write the loop twice here).

```jsx
export default function Navbar() {
    const [expanded, setExpanded] = useState<boolean>(false)
    const [scrolled, setScrolled] = useState<boolean>(false)
    const items: { text: string, to: string }[] = [
        { text: "Home", to: "/" },
        { text: "About", to: "/about" }
    ]
}
```

To handle scrolling, I added a simple event listener and handler function. The handler simply sets `scrolled` to true or false depending on whether the window has scrolled more than 50 pixels down.

```jsx
useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    function handleScroll(): void {
        setScrolled(window.scrollY >= 50);
    }

    handleScroll();

    return () => {
        window.removeEventListener("scroll", handleScroll);
    }
}, [])
```

I added this event listener in `useEffect` and return a cleanup function to remove it so that the listener is cleanly added on component mount and removed on dismount. Not that the navbar would be mounting much or dismounting...ever, but important to make sure that a new listener isn't being added on each render cycle. This is a pattern I got quite comfortable with when working with an authentication library that fired events to indicate login success or failures.

Now, the actual markup. The container div is a straightforward white bar, with a max width and padding set by `.container`. It's set to `position: sticky` with some margin above it, so the page scrolls a little before it latches on to the top.

{% raw %}
```jsx
<div
    style={{
        position: "sticky",
        top: 0
    }}
    className="container flex h-16 mt-16 mb-16 items-center bg-white"
>
		...
</div>
```
{% endraw %}

You might notice that those utility classes, other than `.container`, are Tailwind classes that I replicated verbatim — what can I say, I really love Tailwind. I set `position: sticky` and `top: 0` in an inline style because I don't anticipate using these properties much elsewhere.

Here's the nameplate:

```jsx
<Link to="/" className="hover-light">
    {scrolled ? (
        <span className="font-display name-sm relative">s.zhang</span>
    ) : (
        <span className="font-display name-lg relative">
            samson<br/>zhang
        </span>
    )}
</Link>
```

Within a link tag linking home (how Gatsby handles links with its router; a flat `<a>` tag would cause the new page to load anew, while Gatsby loads new content and changes the URL without reloading the page), I display either the long or short version of my nameplate depending on whether the page has been scrolled.

Here there are a few non-Tailwind classes. `hover-light` adds `opacity: 0.6` on hover; `font-display` sets the font to DM Serif Display; and `name-sm` and `name-lg` handle some subtle font size changing, as I showed before.

```css
.name-lg{
    font-size: 42px;
    line-height: 0.53;
}

.name-sm{
    font-size: 28px;
    top: 2px;
}

@media (min-width: 600px){
    .name-lg{
        font-size: 56px;
        top: -12px;
    }

    .name-sm{
        font-size: 36px;
    }
}
```

Here's the right-side list of links for non-mobile:

```jsx
<div className="flex ml-auto hidden flex-sm">
    {items.map(({ text, to }) => (
        <div className="ml-6">
            <Link
                className="hover-light font-bold"
                to={to}
            >{text}</Link>
        </div>
    ))}
</div>
```

It's another flex container, pushed to the right side with `ml-auto`. Within the container, each item in items is mapped to a simple link. Following mobile-first design patterns, these links are hidden by default, overridden at `min-width: 600px` by setting `display` to `flex`. This is implemented through those Tailwind-esque classes that you see, `hidden` and `flex-sm`:

```css
.hidden{
    display: none;
}

.block{
    display: block;
}

.flex{
    display: flex;
}

@media (min-width: 600px){
    .hidden-sm{
        display: none;
    }

    .block-sm{
        display: block;
    }

    .flex-sm{
        display: flex;
    }
}
```

The menu button is the other way around, appearing only at mobile resolution: `block` or `flex` by default but `display: none` at `min-width: 600px`. Clicking the button sets `expanded` to true, opening up the menu.

```jsx
<button
    className="ml-auto hidden-sm hover-light font-bold"
    onClick={() => setExpanded(true)}
>
    <div className="flex items-center">
        <FaBars className="mr-2"/> Menu
    </div>
</button>
```

`<FaBars>` here is a hamburger menu icon from FontAwesome, nicely wrapped by a package called `react-icons`. The icon renders as an SVG, requiring a `flex` parent container and `margin-right` to display nicely next to the button text.

The opening and closing of the menu is implemented through margins. The menu width is set to 12rem, `display: fixed` with `top` and `right` set to 0. By default, `margin-right` is set to -12rem, hiding the menu to the right of the screen. When `expanded` is true, `margin-right` resets to 0, bringing the menu into view. One peculiarity is that the shadow on the menu is also only applied when expanded, to prevent there from being a persistent shadow on the right edge of the screen. A CSS transition property makes everything go fluidly.

{% raw %}
```jsx
<div
    className={`fixed bg-white w-48 flex flex-col justify-center px-8 ${expanded ? "mr-0 shadow-2xl" : "-mr-48"}`}
    style={{
        top: 0,
        right: 0,
        height: "100%",
        transition: "all 0.2s ease"
    }}
>
    <button
        className="absolute mr-8"
        style={{
            right: 0,
            top: "6rem",
        }}
        onClick={() => setExpanded(false)}
    ><FaTimes/></button>
    {items.map(({ text, to }) => (
        <div className="ml-auto my-2">
            <Link
                className="hover-light font-bold"
                to={to}
            >{text}</Link>
        </div>
    ))}
</div>
```
{% endraw %}

Within the menu is a button to close the menu (again using FontAwesome), and the same `items` map as before, with slightly different CSS properties.

And with that, plus tweaking around with positioning and styling, I had fully replicated the navbar from my old site! Here's a comparison (new on left, old on right):

![]({{site.baseurl}}/img/blog/2020-08/comp-1.jpg)

![]({{site.baseurl}}/img/blog/2020-08/comp-2.jpg)

# Conclusion (of day 1)

On its own, building this navbar is a pretty trivial task. Even still, comparing it to the technical implementation of my old site reveals a ton of growth already. My old CSS used selectors like `.home-header` and worked exclusively in pixel units. I didn't know how to use `position: sticky` (or maybe it hadn't been supported by browsers yet), so I used JS to apply a `.sticky` class to the navbar on scroll, making it stick to the top of the page. Now I'm working with clean, maintainable atomic (ish) CSS in responsive rem units, and using React component lifecycles and state management to handle interactivity (although in this case, extremely limited interactivity).

In terms of my impressions of Gatsby — at the end of the day, it's good old React, with its own twist and ecosystem. I actually [compared Next.js to Jekyll when first learning](https://twitter.com/wwsalmon/status/1283256503307296770) it, with its file structure and static-optimized build process. Gatsby, too, feels very Jekyll-esque, sharing a similar file structure and static build process as Next.js. Setup feels more JS-config-file-heavy in Gatsby, with its  four root config JS files, while it's more template-y and thus Jekyll-y with Next.js, with its nice `_app.js` and `_document.js` files. On the flip side, Gatsby has an ecosystem of super easy-to-use plugins. I haven't really experienced the differentiating features of either framework yet — SSR on Next.js, markdown-based page generation and `gatsby-image` in Gatsby — so I don't have an opinion either way; I'll continue to use these tools and get a better sense of them.

Compared to Jekyll, though, I am somewhat glad that I didn't try to jump into Gatsby when I was just getting started. It took me a months-long, slow ease, from d3.js to React to Next.js, before I found my way here. At the end of the day, Gatsby is a React framework; it takes a solid React foundation to make use of it well.

In terms of this redesign project, I now have the tools to build nearly any purely static part of my website, my familiar CSS and React at my fingertips. There's plenty more Gatsby-specific work to be done with setting up the blog and connecting it up to a CMS, and then actually designing and building out the site beyond that, but it's exciting to build and learn! I probably won't work on my website every day, with a bunch of other projects to juggle, but I'll keep sharing my progress as I go. Learn, build, share, repeat.[^ref]

[^ref]: Also published on [DEV.to](https://dev.to/wwsalmon/rebuilding-my-personal-website-jekyll-gatsby-day-1-pol)