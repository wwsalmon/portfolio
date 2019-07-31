---
permalink: autoturner
layout: casestudy
name: Auto Turner
descript: A mechanical page turner for musicians. The final result of Cooper Union's 6 week product design and prototyping Makerspace class in the Summer STEM 2018 program.
images:
    - thumb.gif
    - working-model-optimized.gif
    - pageturner.png
    - proto-1-draw-1.png
    - proto-4-draw-1.png
---

The final prototype was made with 3D printed and laser cut acrylic parts and an Arduino-driven circuit.

{% include youtube-gen.html id='bW62-upWoQY' %}

Above: demo of Auto Turner in use while playing a piece on a grand piano, operated by a foot pedal.

Below: mechanism designed for lifting, flipping, and setting down paper with wheels and arm.

{% include youtube-gen.html id='yL24DlAJdYg' %}

<div class='divider'></div>

# Design & Prototyping Process

## Week 1: Ideation

Coming up with the ideas and basic design for our project.

{% include image-slider.html data="pageturner2.png,sketch1.png,pageturner.png" %}

## Week 2/3: Early Prototyping

We design our mount and grabber mechanism. We spend a lot of time and iterations figuring out the tolerances of the printer and changing our dimensions slightly to make the mechanism work.

{% include image-slider.html data="grabber-3.jpg,proto-2-draw-1.png,proto-1-draw-2.png,proto-1-cad-2.png" %}

## Week 4: Grabber Testing, Mount Early Prototyping

{% include image-slider.html data="shooting-out.gif,grabbing.gif,proto-4-draw-1.png,proto-4-draw-2.png,guardrail.jpg" %}

## Week 5: First Functional Prototype, Testing

After several iterations, the whole device put together finally works as we want it to. We start designing an acrylic assembly to make the whole device sturdier and more reliable.

{% include image-slider.html data="working-model-optimized.gif,proto-5-draw-1.png,proto-5-draw-2.png" %}


## Week 6: Final Prototype (for now)

We laser cut and assemble our acrylic base; the device is now one piece, without relying on pieces of cardboard taped to the stand to function. It can now be moved around and sit on a grand piano. We also build a foot pedal. The device is as you saw in the first video (again below):

![]({{ site.baseurl }}/img/{{ page.collection }}/{{ page.id }}/thumb.gif)

{% include youtube-gen.html id='bW62-upWoQY' %}

<!-- CODE FOR IMAGE SLIDERS - AUTOMATICALLY ADD EVENTUALLY? other than just being extraneous code should have no side effects on pages where it's not needed -->

<script>
$('.image-slider').each(function(){
    firstimage = $(this).find("div.image-slide:first-of-type");
    firstimage.addClass('prerender');
    firstimage.imagesLoaded(function(firstimage){
        firstimage = $(firstimage.elements[0]); //annoying thing
        height = firstimage.find('img').height();
        console.log(height);
        firstimage.parent().css('height', height);
        firstimage.removeClass('prerender').addClass('selected');
    });
})

$('.image-slider .slider-next').on('click', function(){
    changeImgSlide($(this).parent(),true);
})

$('.image-slider .slider-prev').on('click', function(){
    changeImgSlide($(this).parent(),false);
})

function changeImgSlide(thisSlider,forward){
    selected1 = thisSlider.find('.image-slide.selected');
    selected2 = thisSlider.find('.image-slide-small.selected');
    selected1.removeClass('selected');
    selected2.removeClass('selected');
    if (forward) {
        toSlide1 = getNext(selected1);
        toSlide2 = getNext(selected2);
    }
    else{
        toSlide1 = getPrev(selected1);
        toSlide2 = getPrev(selected2);
    }
    toSlide1.addClass('selected');
    toSlide2.addClass('selected');
}

function getNext(thisItem){
    if (thisItem.hasClass('image-slide')){
        search = '.image-slide';
    }
    else{
        search = '.image-slide-small';
    }
    retval = thisItem.next();
    if (retval.length == 0){
        retval = thisItem.parent().find(search).first();
    }
    return retval;
}

function getPrev(thisItem){
    if (thisItem.hasClass('image-slide')){
        search = '.image-slide';
    }
    else{
        search = '.image-slide-smol';
    }
    retval = thisItem.prev();
    if (retval.length == 0){
        retval = thisItem.parent().find(search).last();
    }
    return retval;
}
</script>