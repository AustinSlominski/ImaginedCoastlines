var routePath;
var coastPath;

tool.minDistance = 100;	

function onMouseDown(event){
    if (routePath) {
        routePath.remove();
    }
    
    var initY = Math.floor(Math.random()*((event.point.y-50)-(event.point.y+50))+(event.point.y+50));

	routePath = new Path({
		strokeColor: 'black',
		fullySelected: true
	});

	routePath.add(new Point(0,initY));
	routePath.add(event.point);
}

function onMouseDrag(event){
	tool.minDistance = Math.floor(Math.random()*145); // Should be randomized with each onMouseDrag event

	routePath.add(event.point);
	var curSeg = routePath.segments.length-2;
	console.log(curSeg);
	console.log(routePath.curves.length);
	//Draw a symbol for each subdivision
	//Put numbers, 1 2 3, in sequential but random direction order
	//Put letters, A,B,C, in sequential but random direction order (ABCBACBCAB, etc)
	for(var i=0;i<3;i++){
		routePath.curves[curSeg].divide(); // not even division. Need to think through the curSeg count
	}
}

function onMouseUp(event){
	var finalY = Math.floor(Math.random()*Math.random()*((event.point.y-50)-(event.point.y+50))+(event.point.y+50));

	routePath.add(new Point(view.size.width,finalY));
}