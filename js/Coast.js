var routePath;
var coastPath = new Group();

tool.minDistance = 100;	

function onMouseDown(event){
    if (routePath) {
        routePath.remove();
        coastPath.removeChildren();
    }
    
    var initY = Math.floor(Math.random()*((event.point.y-50)-(event.point.y+50))+(event.point.y+50));

	routePath = new Path({
		strokeColor: 'black',
		fullySelected: true
	});

	routePath.add(new Point(0,initY));
	routePath.add(event.point);
	routePath.curves[0].divide();
	routePath.curves[1].divide();
	routePath.curves[0].divide();

	for(var i=0;i<4;i++){
		cliffSeg = [new Point(routePath.segments[i].point.x,routePath.segments[i].point.y), new Point(routePath.segments[i].point.x, routePath.segments[i].point.y+300)];
		
		tmpCliff = new Path({
			segments: cliffSeg,	
			strokeColor: 'black',
			fullySelected: true
		});

		coastPath.addChild(tmpCliff);
	}
}

function onMouseDrag(event){
	tool.minDistance = Math.floor(Math.random()*145);

	routePath.add(event.point);
	var curSeg = routePath.segments.length-2;

	//Even Thirds Subdivision
		//Is there a better way to do this?	
		routePath.curves[curSeg].divide();
		routePath.curves[curSeg+1].divide();
		routePath.curves[curSeg].divide();

	//Cliffside Generation
		for(var i=0;i<4;i++){

			//Definitely a way to do this with modulation
			//define a basic length to go off of, and everything is a modulation of that
				if(i==0||i==4){
					var yBaseLen = 300;
				}else if(i==1||i==3){
					var yBaseLen = 275;
				}else{
					var yBaseLen = 250;
				}

			yMod = yBaseLen;
			xMod = 10;
			destX = Math.random()*((routePath.segments[curSeg-i].point.x+xMod)-(routePath.segments[curSeg-i].point.x-xMod))+(routePath.segments[curSeg-i].point.x-xMod);
			destY = routePath.segments[curSeg-i].point.y+yMod;

			cliffSeg = [new Point(routePath.segments[curSeg-i].point.x,routePath.segments[curSeg-i].point.y),new Point(destX,destY)];
			
			tmpCliff = new Path({
				segments: cliffSeg,	
				strokeColor: 'black',
				fullySelected: true
			});

			coastPath.addChild(tmpCliff);
		}
}

function onMouseUp(event){
	var finalY = Math.floor(Math.random()*Math.random()*((event.point.y-50)-(event.point.y+50))+(event.point.y+50));

	routePath.add(new Point(view.size.width,finalY));
}