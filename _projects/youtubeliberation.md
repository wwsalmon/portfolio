---
permalink: youtubeliberation
layout: casestudy
name: YouTube Liberation
title: YouTube Liberation
descript: Chrome extension to liberate you from the infinite distraction cycle of YouTube.
images:
    - ytl-icon-wide.mp4
    - thumb.jpg
    - 4.jpg
    - 1.jpg
    - 2.jpg
    - 3.jpg
slider: true
---

<iframe style="border: none; margin: 32px auto; display: block; height: 500px; max-width: 800px; width: 100%;" src="https://cards.producthunt.com/cards/posts/191296?v=1" frameborder="0" scrolling="no" allowfullscreen></iframe>

Like other social media platforms, YouTube is very good at showing you content that you want to watch but weren't planning to or looking for, making it super easy to get distracted and get sucked into one video after another and suddenly lose an hour of your day. Yet there are so many valuable resources and videos that you can't find elsewhere: tutorials, event coverage, specific creators you subscribe to who you know always publish high-quality content worth watching. For many of us, the value of YouTube makes it worth the sacrifice of even its most distracting possibilities, and it's impossible to just cut away.

What if it didn't have to be this way? What if you could have the good of YouTube, see the content you want to see, without the platform constantly trying to drag your attention through an endless stream of productivity-draining drudgery?

This is the philosophy behind YouTube Liberation. It's time to rise up, lose your chains, and join us as we march our way towards a better YouTube!

The extension works by injecting CSS and Javascript code to block certain elements from displaying or rendering and inserting more minimally-designed ones. Get the extension through the [Chrome Web Store](https://chrome.google.com/webstore/detail/youtube-liberation-anti-d/akmmhbokbfhghenajahbcmogcbghiamg).

<div class='highlights'>
    {% for item in page.images %}
    {% assign temp = item | split: '.' %}
    {% if temp.last == 'mp4' %}
    <video autoplay loop muted>
        <source src='{{ site.baseurl }}/img/projects/{{ page.id }}/{{ item }}' type='video/mp4'>
    </video>
    {% else %}
    <img src='{{ site.baseurl }}/img/projects/{{ page.id }}/{{ item }}'>
    {% endif %}
    {% endfor %}
</div>