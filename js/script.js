// objects
var			forest						=		new Forest(document.getElementById("leaves_left"),
															document.getElementById("leaves_right"), 
															document.getElementById("cut_leaf"), 
															document.getElementById("falling_leaf"), 
															document.getElementById("hideLeafRight"));

var 		baboon 						= 		new Baboon(document.getElementById("eyes"), 
															document.getElementById("face"), 
															document.getElementById("small_teeth"), 
															document.getElementById("left_hook"), 
															document.getElementById("right_hook")
															);

var 		control 						= 		new Control();

// get moving teeth paths after baboon instance is created
baboon.createMovingTeeth();

var 		shine 						= 		document.getElementById("shine");
var 		moon 						= 		document.getElementById("moon");
var 		tl 							= 		new TimelineMax();

var 		svg 						= 		d3.select(document.getElementById('svg-animation'));


// self-invoking function
(function () {
	//hide and position objects before animation
	tl.set(baboon.eyes, {alpha:0});
	tl.set(baboon.face, {alpha:0});
	tl.set(baboon.leftHookTooth, {y:72, transformOrigin:"50% 50%"});
	tl.set(baboon.smallTeeth, {y:70, transformOrigin:"50% 50%"});
	tl.set(baboon.rightHookTooth, {x:240, y:-480, rotation:25});

	// duration, delay, rotation
	forest.setAnimationPreferences(1.5, 1, 28);

	tl.set(shine, {alpha:0, transformOrigin:"50% 50%"});
	tl.set(moon, {transformOrigin:"50% 50%", x:-145});
	tl.set(forest.cut_leaf, {transformOrigin:"bottom right", rotation:forest.leavesRotationAmount, alpha:0});

	forest.animateOpenLeaves();
})(); 