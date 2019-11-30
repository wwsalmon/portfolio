---
title: How I Use Jekyll for my Portfolio and Blog
layout: post
tags: projects jekyll webdev
---

## The Config

All code and content is contained in a [GitHub repo](https://github.com/wwsalmon/portfolio). The site is hosted on [Netlify](https://www.netlify.com/), which connects to the GitHub repo and automatically rebuilds and deploys an updated site whenever a commit is pushed. Netlify is connected to a domain registered through Google Domains.

In Jekyll, I use a pretty bare build without many plugins. My blog uses Jekyll's blogging feature, and my portfolio case studies are stored in collections and data files. I use [jekyll-admin](https://github.com/jekyll/jekyll-admin) to make creating posts easier (a visual interface is a lot nicer than filling in the front matter myself manually), though it's slightly sluggish and I draft outside of my repo using a Markdown editor called [Caret](https://caret.io/). I use Google Analytics for tracking page views ([here's an excellent tutorial on how to set up GAnalytics with Jekyll](https://michaelsoolee.com/google-analytics-jekyll/)).

![jekyll-admin interface](/img/blog/2019-11/admin-final.png)
*jekyll-admin interface*

File structure:

```
|-- _posts
|  |-- *here be posts*
|  |-- ...
|-- _portfolio  // this collection outputs the overview pages for each category
|  |-- design.md
|  |-- film.md
|  |-- photo.md
|  |-- projects.md
|-- _film       // this collection outputs filmmaking case studies
|  |-- *case studies*
|  |-- ...
|-- _projects   // this collection outputs code & building case studies
|  |-- *case studies*
|  |-- ...
|-- _data       // these data files contain all the information for portfolio pages without case studies
|  |-- design.csv
|  |-- photo.csv
```

Data files:

```
name,                   date,        caption
commencement-cover.jpg, June 2019,   Cover page for <i>The Phillipian</i>'s Commencement Issue
sota-cover.jpg,         May 2019,    Cover page for <i>The Phillipian</i>'s State of the Academy
simplestform.png,       August 2018, Branding for Publication
...                     ...          ...
```

I use [David DeSandro's](https://desandro.com/) Masonry and imagesLoaded Javascript libraries, which I use heavily for my portfolio pages. On the homepage I use [D3.js](https://d3js.org/) to render the word cloud, which is super overkill and more an excuse to learn D3 than practical. All the image slider libraries I've found are quite clunky and don't do what I want, so I've built my own implementation using jQuery.

## Why Jekyll?

- Familiarity – I've worked with Jekyll on many projects and know how to get what I want out of it
- Simplicity – Jekyll is a Static Site Generator, making development and debugging super easy
- Powerful – Jekyll's use of Liquid (templating language) and features like collections and site data make building out and updating my website a breeze. Plus, its blogging platform is top-notch

Until recently, Jekyll was the only real site-building platform I had used (excluding Blogger and Weebly templates and raw HTML on GitHub Pages). Earlier this year, I worked on a project that allowed me to work extensively with Wordpress. Wordpress offers its own powerful features and workflow, but as the websites I build are almost entirely static (the Wordpress project was for a news publication) my Wordpress workflow using PHP and MAMP was actually very similar to working with Liquid in Jekyll.

In the end, both options are quite powerful and easy to work with and there are a ton of third-party documentation, extensions, and platforms built for each. I find Wordpress to be more user-friendly and scalable, while Jekyll is more developer-friendly and easier to build exactly what I want with. For larger client projects I would use Wordpress, while for my own personal projects Jekyll is my default.