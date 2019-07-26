nodes = [
    { "id": "Photography", "url": "/photo" },
    { "id": "Motion Graphics", "url": "/film" },
    { "id": "Filmmaking", "url": "/film" },
    { "id": "Graphic Design", "url": "/projects" },
    { "id": "Web Dev" },
    { "id": "UI/UX & Branding" },
    { "id": "Piano" },
    { "id": "Running" }
];

const width = $("svg").width();
const height = $("svg").height();
selectedID = null;
// const svg = d3.select('svg')
//     .attr("height", height);

var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(function(){
        if ($(window).width() > 768){
            return -100;
        }
        else {
            return -60;
        }
    }))
    .force('center', d3.forceCenter(width / 2 - 100, height / 2))
    // .force('collide', d3.bboxCollide(function(d,i){
    //     return [[-d.width,-d.height], [d.width,d.height]];
    // }).strength(1).iterations(2))
    .on('tick', ticked);

function ticked(){
    var u = d3.select("svg")
        .selectAll('text')
        .data(nodes)
    u.enter()
        .append('text')
        .classed('thing-label',true)
        .classed('thing-link',function(d){
            if (d.url) return true;
            return false;
        })
        .attr('id', function(d){
            return d.id;
        })
        .html(function(d){
            thingLabel = d.id;
            if (d.url){
                thingLabel = "<a xlink:href='" + d.url + "'>" + d.id + "</a>";
            }
            return thingLabel;
        })
        .each(function(d){
            d.width = this.getBBox().width;
            d.height = this.getBBox().height;
        })
        .merge(u)
        .attr('x', function (d) {
            return Math.max(0, Math.min(width - d.width, d.x));
        })
        .attr('y', function (d) {
            return Math.max(55, Math.min(height - 55, d.y));
        })
        .on("click", function (d) {
            thingID = $(this).attr("id");
            if (thingID == selectedID || d.url) return;
            selectedID = thingID;
            $(".thing-label").removeClass("selected");
            $(this).addClass("selected");

            if (thingID == 'Filmmaking') {
                thingText = `
                I grew up in Niskayuna, a small town in upstate New York. One day, I was at my friend’s house, and we found a strobelight in a room in his basement. Every flash would last a tiny fraction of a second, and in between flashes everything was completely black. It was like seeing the world one freeze frame at a time. All motion seemed choppy and the world felt completely surreal.
                `
            }

            // else if (thingID == 'Management') {
            //     thingText = "Harness people's individual talents and skills to get a collective task done; how to do this best for each individual and for the whole.";
            // }

            // else if (thingID == 'Running') {
            //     thingText = "Running is sick!";
            // }

            // else if (thingID == 'Photography') {
            //     thingText = "Photography is sick!";
            // }

            // else if (thingID == 'Engineering') {
            //     thingText = "Make a real, direct impact on the world and humanity. Solve problems.";
            // }

            // else if (thingID == 'Journalism') {
            //     thingText = "Storytelling held to a higher bar of accuracy, thoroughness, and imapct. Also plip";
            // }

            // else if (thingID == 'UX Design') {
            //     thingText = "UX Design is cool";
            // }

            // else if (thingID == 'Piano') {
            //     thingText = "Expressiveness. I like romantic pieces best";
            // }
            else {
                thingText = "Working on content! Check out the other pages in the meantime.";
            }

            thingText = "<b>" + thingID + "</b><br/>" + thingText;

            $(".thing-text").html(thingText);

            windowHeight = $(window).height();

            $([document.documentElement, document.body]).animate({
                scrollTop: $(".thing-text").offset().top - windowHeight * 2 / 3
            }, 200);
        })
    u.exit().remove();
}