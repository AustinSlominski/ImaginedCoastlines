var routePath, cliffLines, coastPath, routeSub;
routeSub = 4;
//Range of random interval between mouseDrag events
	var toolRand = 145;

function onMouseDown(event){
	tool.minDistance = Math.floor(Math.random()*toolRand);

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
	routePath.fullySelected = 'true';

	routePath.add(new Point(0,initY));			
	coastPath.add(new Point(0,view.size.height));
	routePath.add(event.point);				

	divideRoute(0);
}

function onMouseDrag(event){
	tool.minDistance = Math.floor(Math.random()*toolRand);

	routePath.add(event.point);
	curSeg = routePath.lastSegment.index-1;
	
	divideRoute(curSeg);
	genClifflines();
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

/*
	* divideRoute(segment)
	* 	routePath subdivision
	*		TODO:
	*			Factor in routeSub in some way. 
	*			It should clean up the way that 
	*			I'm handling subdivision
	*
*/
function divideRoute(segment){

	//
		/*
			sub=0. then seg=0
			sub=1, then seg=0,2
			sub=2, then seg=0,2,4
			sub=3, then seg=0,2,4,8
		*/
	//

	for(var i=0;i<2;i++){
		routePath.curves[segment].divide();
		for(var j=0;j<i;j++){
			console.log(Math.pow(2,j));
			routePath.curves[segment+Math.pow(2,j)].divide();
		}
		
	}

	/*
	routePath.curves[segment].divide();
	routePath.curves[segment+1].divide(); 
	routePath.curves[segment].divide();	
	*/
}

/*
	* genClifflines()
	* 	draw jittered lines vertically from each point in routePath
	*
*/
function genClifflines(){
	for(var i=routeSub;i>0;i--){
		
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

function genRouteText(){

}