$('.image-slider').each(function(){
    firstimage = $(this).find("div.image-slide:first-of-type").addClass('prerender');
    firstimage.imagesLoaded(function(firstimage){
        firstimage = $(firstimage.elements[0]); //annoying thing
        height = firstimage.find('img').height();
        console.log(height);
        firstimage.parent().css('height', height);
        firstimage.removeClass('prerender').addClass('selected');
    });
})

$('.image-slider .slider-next').on('click', function(){
    scrollSlide($(this).parent(),true);
})

$('.image-slider .slider-prev').on('click', function(){
    scrollSlide($(this).parent(),false);
})

$('.image-slider .image-slide-small').on('click', function(){
    toSlide($(this).closest(".image-slider"),$(this));
})

function toSlide(thisSlider,endSlide){
    endIndex = endSlide.index();

    selected1 = thisSlider.find('.image-slide.selected');
    selected2 = thisSlider.find('.image-slide-small.selected');
    selected1.removeClass('selected');
    selected2.removeClass('selected');

    endSlide.addClass('selected');
    thisSlider.find(".image-slide").eq(endIndex).addClass('selected');
    scrollSelector(thisSlider);
}

function scrollSlide(thisSlider,forward){
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
    scrollSelector(thisSlider);
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

function scrollSelector(container){
    container = container.find('.slider-selector-outer');
    selected = container.find('.selected');
    totalWidth = container.width();
    
    scrollPos = selected.position().left - (totalWidth / 2) + (selected.width() / 2);

    container.animate({scrollLeft: scrollPos}, 200);
}