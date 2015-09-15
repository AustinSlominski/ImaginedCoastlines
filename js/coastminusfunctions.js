var routePath, cliffLines, coastPath;
tool.minDistance = 100;	

function onMouseDown(event){

    if (routePath) {
        routePath.remove();
        coastPath.remove();
        cliffLines.remove();
    }

    var initY = Math.floor(Math.random()*((event.point.y-50)-(event.point.y+50))+(event.point.y+50));

	cliffLines = new Group();
	coastPath = new Path;
	routePath = new Path;

	coastPath.strokeColor = 'black';
	routePath.strokeColor = 'black';

	routePath.add(new Point(0,initY));				//Initial point
	coastPath.add(new Point(0,view.size.height));
	routePath.add(event.point);						//MouseDown point

	divideRoute(0);

	for(var i=0;i<4;i++){
		cliffSeg = [new Point(routePath.segments[i].point.x,routePath.segments[i].point.y), new Point(routePath.segments[i].point.x, routePath.segments[i].point.y+300)];
		
		tmpCliff = new Path({
			segments: cliffSeg,	
			strokeColor: 'black'
		});

		cliffLines.addChild(tmpCliff);
		coastPath.add(new Point(tmpCliff.lastSegment.point.x,tmpCliff.lastSegment.point.y));
	}
}

function onMouseDrag(event){
	tool.minDistance = Math.floor(Math.random()*145);

	routePath.add(event.point);
	curSeg = routePath.lastSegment.index-1;
	
	divideRoute(curSeg);

	for(var i=4;i>0;i--){
		
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
			strokeColor: 'black'
		});

		cliffLines.addChild(tmpCliff);
		coastPath.add(new Point(cliffLines.lastChild.lastSegment.point.x,cliffLines.lastChild.lastSegment.point.y));
	}
}

function onMouseUp(event){
	var finalY = Math.floor(Math.random()*Math.random()*((event.point.y-50)-(event.point.y+50))+(event.point.y+50));
	var finalSeg = routePath.lastSegment.index;

	routePath.add(new Point(view.size.width,finalY));
	divideRoute(finalSeg);
	
	coastPath.add(new Point(view.size.width,view.size.width));
	coastPath.closed = true;
	coastPath.fillColor = 'black';
}

function divideRoute(segment){
	routePath.curves[segment].divide();
	routePath.curves[segment+1].divide();
	routePath.curves[segment].divide();	
}

function genClifflines(){

}

function 