nodes = [
    { "id": "Photography", "url": "/photo" },
    { "id": "Filmmaking", "url": "/film" },
    { "id": "Branding & Graphics", "url": "/design" },
    { "id": "Fullstack web dev", "url": "/building" },
    { "id": "UI/UX & Product", "url": "/design" },
    { "id": "AI & Machine Learning" },
    { "id": "Quantum Computing" },
    { "id": "Piano & Music" },
    { "id": "Running" },
    { "id": "Art & Literature" }
];

const width = $("svg").width();
const height = $("svg").height();
selectedID = null;

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
    u.exit().remove();
}