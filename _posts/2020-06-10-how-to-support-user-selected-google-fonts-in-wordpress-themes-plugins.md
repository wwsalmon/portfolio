---
title: How to Support User-Selected Google Fonts in WordPress Themes & Plugins
layout: post
tags: code wordpress
date: '2020-06-10 18:03:08'
---

## Introduction

Recently I’ve been working on [Morse](https://github.com/wwsalmon/morse-wp-theme), a WordPress theme custom-built for small newspapers, drawing on my experience building and then maintaining [*The Phillipian*](https://phillipian.net/)[’s website](https://phillipian.net/) for a year. I wanted this theme to be highly customizable, able to easily accomodate any paper’s branding and maybe even *The Phillipian*’s one day. A big part of this is allowing users to specify what fonts they want to be used.

![]({{ site.baseurl }}/img/blog/2020-06/morse-two-fonts.jpg)

To start, it would just be Google Fonts. Good variety, hopefully easy to implement. The vision was that a user could go to the Customizer interface in WordPress, plug in a font name, and watch the preview update to use that font where applicable, then publish it and have their changes go live.

{% include video-gen.html src='/img/blog/2020-06/morse-fonts-demo.mp4' %}

Honestly, this was one of the features I was most intimidated by. I’ve worked a fair bit with WordPress and PHP, and with JavaScript, but never in combination. I looked through the source code of open-source plugins and themes that had already implemented Google Fonts integration and got lost in their endless includes and complexities, not even knowing where to find the code that mattered.

This morning, though, I managed to figure it out, implementing exactly what I wanted with way simpler code than expected! To solidify my own learning ([learn, build, share, repeat](https://twitter.com/patrick_oshag/status/971100425498841089?lang=en)) and to share this knowledge with anyone else who might want to implement the same functionality in their WordPress theme, I’ve created this post as a little tutorial of my solution.

## WP Customizer

First, let’s create fields in the customizer to allow users to specify fonts. For simplicity, I implemented these as straightforward string fields: users will have to browse through fonts beforehand and enter the exact name. Google Fonts does have an API for getting a list of all available fonts, and some WordPress plugins have implemented fancy lists

We’ll add three different fields: a body font, a heading font, and an accent font (for the occassional button, label, etc.; obviously you can make these options whatever you want). This is straightforward to implement:

{% highlight php linenos %}
function morse_wp_plugin_customizer($wp_customize)
    {
        $wp_customize->add_section('morse-wp-custom-section', array(
            'title' => "Morse WP Theme Overall Settings"
        ));
        $wp_customize->add_setting('morse-wp-font-body');
        $wp_customize->add_control('morse-wp-font-body-control', array(
                'label' => 'Google Font for Body',
                'type' => 'string',
                'section' => 'morse-wp-custom-section',
                'settings' => 'morse-wp-font-body'
        ));
        $wp_customize->add_setting('morse-wp-font-heading');
        $wp_customize->add_control('morse-wp-font-heading-control', array(
                'label' => 'Google Font for Headings',
                'type' => 'string',
                'section' => 'morse-wp-custom-section',
                'settings' => 'morse-wp-font-heading'
        ));
        $wp_customize->add_setting('morse-wp-font-accent');
        $wp_customize->add_control('morse-wp-font-accent-control', array(
                'label' => 'Google Font for Accents',
                'type' => 'string',
                'section' => 'morse-wp-custom-section',
                'settings' => 'morse-wp-font-accent'
        ));
    }
    
    add_action('customize_register', 'morse_wp_plugin_customizer');
{% endhighlight %}
## Utility Classes

In a template PHP file, we can now access these customizer settings using `get_theme_mod()`, for example `get_theme_mod(``"``morse-wp-font-heading``"``, "Georgia")` to get the heading font, with a default of Georgia if the option has not been set by the user. Now, how do we get this into our CSS?

The trick here is to use utility classes instead of trying to write dynamic fonts into semantic CSS. Instead of specifying that `.article-title h1` should have our heading font, we specify a utility class `.morse-font-heading` that we can apply to any element we want our heading font on. Instead of trying to insert snippets into or overwrite various parts of a stylesheet, then, we can simply add our utility classes in an inline style block using the `wp_head` hook:

{% highlight php linenos %}
function morse_wp_plugin_add_styles(){ ?>
    <style>
        .morse-font-body{
            font-family: <?php echo get_theme_mod("morse-wp-font-body", "Georgia"); ?>
        }
    
        .morse-font-heading{
            font-family: <?php echo get_theme_mod("morse-wp-font-heading", "Georgia"); ?>
        }
    
        .morse-font-accent{
            font-family: <?php echo get_theme_mod("morse-wp-font-accent", "sans-serif"); ?>
        }
    </style>
    <?php
}
add_action("wp_head", "morse_wp_plugin_add_styles");


{% endhighlight %}

Note: above is only a snippet of the `add_styles` function I actually use. The same approach can be applied to implementing user-specified colors, for example, which I might write about later.

## Web Font Loader

The last step, and the one that confused/intimidated me for a little bit, was how to actually load these fonts from Google Fonts. Google Fonts has a JavaScript Web Font Loader library/API that allows fonts to be dynamically loaded, but I’ve never connected WordPress functionality with JavaScript before. It’s something I’ll have learn eventually, especially with Gutenberg blocks being React-based. In this case, though, I was able to figure out a straightforward solution, based [on this tutorial](https://wordpresssupercharged.com/how-to-improve-page-speed-by-deferring-web-fonts/):

First, download the [Web Font Loader library](https://github.com/typekit/webfontloader/blob/master/webfontloader.js). Throw that JS file somewhere in your plugin or theme, and enqueue it like any other script.

Now, all we need to do is run `WebFont.load()` with our desired parameters to load in our fonts. [Web Font Loader’s GitHub](https://github.com/typekit/webfontloader) provides documentation on what these parameters look like, but here’s a quick example:

{% highlight javascript linenos %}
WebFont.load({
    google: {
        families: ["Roboto:400,700", "Roboto Mono"]
    }
});
{% endhighlight %}

Pretty easy, right? WordPress allows us to easily insert inline scripts using `wp_add_inline_script`, which we can include right after we enqueue the Web Font Loader library. All we have left to do, then, is generate the parameters to call based on our Customizer settings. This just takes some simple PHP. First, I create an array of fonts with `array_unique([get_theme_mod("morse-wp-font-body"), get_theme_mod("morse-wp-font-heading"), get_theme_mod("morse-wp-font-accent")])` — `array_unique` making sure I don’t duplicate-request fonts — then turn this into the specific format that the loader wants with a for loop and some string concatenation. For now, I just specified 400 and 700 weights (regular and bold), though it’s only a matter of busiwork if you wanted to allow user-specified weights as well.

Here’s how it all comes together:

{% highlight php linenos %}
function morse_wp_enqueue_fonts(){
    
            wp_enqueue_script( 'webfontloader', plugin_dir_url( __FILE__) . "../js/webfontloader.js", NULL, '', true );
    
            $fonts_array = array_unique([get_theme_mod("morse-wp-font-body"), get_theme_mod("morse-wp-font-heading"), get_theme_mod("morse-wp-font-accent")]);
            $fonts_string = "";
            foreach ($fonts_array as $f){
                    $fonts_string = $fonts_string . "\"" . $f . ":400,700\",";
            }
    
            $config_string = "
    WebFont.load({
      google: {
        families: [
        " . $fonts_string . "
        ]
      }
    });
            ";
    
            wp_add_inline_script( 'webfontloader', $config_string, 'after' );
    }
    add_action("wp_enqueue_scripts", "morse_wp_enqueue_fonts");
{% endhighlight %}

## And We’re Done!

And there we have it, an easy-to-implement, easy-to-extend solution for loading user-specified Google Fonts into your WordPress theme. There’s a lot more to look into — here are a few ideas:


- Dropdown list of potential fonts
- User-specified font weights
- User-uploaded custom fonts

But, honestly, I thought this feature was gonna be really hard to build, and it turned out to be surprisingly simple, and highly functional for its simplicity. No plugins, no jank hacks going against WordPress’ design, just a few straightforward lines of code.

Find the full source code for the [Morse theme](https://github.com/wwsalmon/morse-wp-theme) and [theme-specific plugin (where the code from this tutorial is located)](https://github.com/wwsalmon/morse-wp-plugin) on [my GitHub](https://github.com/wwsalmon), and let me know what you think of this solution through [Twitter (@wwsalmon)](https://twitter.com/wwsalmon) or in the comments of the DEV.to post for this tutorial!