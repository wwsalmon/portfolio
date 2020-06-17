---
permalink: morse-wp-theme
layout: casestudy
name: (WIP) Morse WordPress Theme
descript: A WordPress theme custom-made for small newspapers. Built with versatility, ease of use, and maintainability in mind.
images:
    - thumb.jpg
    - morse-two-fonts.jpg
    - morse-fonts-demo.mp4
slider: true
---
<div><img src="{{ site.baseurl }}/img/projects/{{ page.permalink }}/thumb-highdpi.jpg"></div>

### Starting an online publication in 2020 should be easy.

Having rebuilt *[The Phillipian](https://phillipian.net)*'s website as its Executive Digital Editor, I was often asked by members of other publications for advice on setting up a digital presence, or starting an online publication. I never had a good answer. My work on [phillipian.net](https://phillipian.net) was that of salvaging a plugin-ladden, barely functional mess of a WordPress website; my solution was to strip away all the third-party solutions I could, implementing my own stripped-down theme with legacy support.

This worked great for us. WordPress, when used right, is incredibly powerful and user-friendly; [phillipian.net](https://phillipian.net) supports an archive of 15,000+ articles, hundreds of writers, and endless photos and multimedia, with hundreds articles churned out each week during the year. WordPress handles it without a hitch. Its extensibility and powerful templating features allow me to make our content display exactly how we want it to, or how any editor wants it to through the dashboard without touching a single line of code.

But this only works because of all the effort I put into building things out from scratch, just the way they should be. If solutions are implemented with third-party templates and plugins, a WordPress website can quickly become a bogged-down and ugly nightmare.

So, my tenure with *The Phillipian* over but the interest in small online publications higher -- and these publications more important -- than ever, I thought, what if I applied everything I've learned from [phillipian.net](https://phillipian.net) and built a WordPress template that any small publication could use, [phillipian.net](https://phillipian.net) designed with visual quality, ease of use, technical sustainability and robust content management in mind?

This is the idea behind Morse.

<div><img src="{{ site.baseurl }}/img/projects/{{ page.permalink }}/morse-two-fonts.jpg"></div>

(These are mockups, but only because *The Phillipian*'s fonts aren't on Google Fonts; all the color and font changing features have been implemented, and the website looks basically exactly this way)

### Some features

Morse is very WIP. I'm not working on it actively, but I absolutely would if there's a publication that would make use of it. After having the idea for a while, I finally bashed out [an 0.1.0 release](https://github.com/wwsalmon/morse-wp-theme/releases/tag/0.1) after someone reached out to me directly about wanting to start an online publication. If you're interested and want to see it built, definitely shoot a message to me on email (samsonzhang@samsonzhang.com), Instagram (@samsonzhangthesalmon), Twitter (@wwsalmon), Facebook Messenger (just search for my name), wherever!

The 0.1.0 release is what's shown in screenshots on this page. It provides a set of very basic functionality so that you can just start publishing content; all the other features I have planned build on top of this foundation. Here are the features, as listed in the [release notes](https://github.com/wwsalmon/morse-wp-theme/releases/tag/0.1):

- Custom logo, color, and Google Fonts support
- Customizable navbar and footer
- Category and tag pages
- Authors with author pages using Co-Authors Plus plugin
- Media credit with media gallery on author pages using Media Credit plugin

If you want to use Morse and think you can figure everything out for yourself, just download it from [GitHub](https://github.com/wwsalmon/morse-wp-theme/releases/tag/0.1) -- the zip file on the release page will give you everything you need. If you want to use Morse and aren't as familiar with WordPress or the specific plugins being used, again, just get in touch with me!

{% assign videoname=site.baseurl | append: "/img/projects/" | append: page.permalink | append: "/morse-fonts-demo.mp4" %}
{% include video-gen.html src=videoname %}

(I'm also very proud of having figured out how to implement user-selected Google Fonts, check out my blog post about it: [How to Support User-Selected Google Fonts in WordPress Themes & Plugins](https://www.samsonzhang.com/2020/06/10/how-to-support-user-selected-google-fonts-in-wordpress-themes-plugins.html))