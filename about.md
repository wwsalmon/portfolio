---
layout: about
title: About
---

<div class='divider'></div>

Hi, my name is Samson Zhang. I'm a senior at Phillips Academy. I love building things and telling stories.

Things that fascinate me:

<svg></svg>

<p class='thing-text'>Click something above to learn more.</p>

<script>

nodes = [
    {"id": "Filmmaking", "label": ""},
    {"id": "Photography"},
    {"id": "UX Design"},
    {"id": "Engineering"},
    {"id": "Journalism"},
    {"id": "Management"},
    {"id": "Piano"},
    {"id": "Running"}
];

const width = $("svg").width();
const height = $("svg").height();
const svg = d3.select('svg')
    .attr("height",height);
if ($(window).width() < 900){
    forceStrength = -60;
}
else{
    forceStrength = -160;
}
const simulation = d3.forceSimulation()
    .force('charge', d3.forceManyBody().strength(forceStrength))
    .force('center', d3.forceCenter(width / 2, height / 2));

const nodeElements = svg.append('g')
    .selectAll('circle')
    .data(nodes)
    .enter().append('circle')
        .attr('r', 10)
        .attr('fill', '#000');

const textElements = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .enter().append('text')
        .text(node => node.id)
        .attr('text-anchor', 'middle')
        .attr('id', node => node.id)
        .classed('thing-label', true)

simulation.nodes(nodes).on('tick', () => {
    nodeElements
        .attr('cx', function(d){return d.x = Math.max(100, Math.min(width-100, d.x));})
        .attr('cy', function(d){return d.y = Math.max(60, Math.min(height-30, d.y));})
    textElements
        .attr('x', node => node.x)
        .attr('y', node => node.y)
});

selectedID = null;

$(".thing-label").on("click",function(){
    thingID = $(this).attr("id");
    if (thingID == selectedID){
        return;
    }
    $(".thing-label").removeClass("selected");
    $(this).addClass("selected");

    if (thingID == 'Filmmaking'){
        thingText = `
        I grew up in Niskayuna, a small town in upstate New York. One day, I was at my friend’s house, and we found a strobelight in a room in his basement. Every flash would last a tiny fraction of a second, and in between flashes everything was completely black. It was like seeing the world one freeze frame at a time. All motion seemed choppy and the world felt completely surreal.
        `
    }

    else if (thingID == 'Management'){
        thingText = "Harness people's individual talents and skills to get a collective task done; how to do this best for each individual and for the whole.";
    }

    else if (thingID == 'Running'){
        thingText = "Running is sick!";
    }

    else if (thingID == 'Photography'){
        thingText = "Photography is sick!";
    }

    else if (thingID == 'Engineering'){
        thingText = "Make a real, direct impact on the world and humanity. Solve problems.";
    }

    else if (thingID == 'Journalism'){
        thingText = "Storytelling held to a higher bar of accuracy, thoroughness, and imapct. Also plip";
    }

    else if (thingID == 'UX Design'){
        thingText = "UX Design is cool";
    }

    else if (thingID == 'Piano'){
        thingText = "Expressiveness. I like romantic pieces best";
    }

    $(".thing-text").text(thingText);

    windowHeight = $(window).height();

    $([document.documentElement, document.body]).animate({
        scrollTop: $(".thing-text").offset().top - windowHeight * 2 / 3
    }, 200);
})
</script>