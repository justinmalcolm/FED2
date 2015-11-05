function Baboon (eyes, face, smallTeeth, leftHookTooth, rightHookTooth){
	this.eyes = eyes;
	this.face = face;
	this.smallTeeth = smallTeeth;
	this.leftHookTooth = leftHookTooth;
	this.rightHookTooth = rightHookTooth;

	// get the middle teeth as individual objects to animate later
	this.createMovingTeeth = function (){
		this.movingSmallTeeth = this.smallTeeth.getElementsByTagName("path");
	};

	this.showEyes = function(){
		// reveal eyes animation
		tl.set(this.eyes, {transformOrigin:"50% 50%", scale:.5});
		tl.to(this.eyes, 2, {alpha:1, delay:forest.leavesAnimationDuration+forest.leavesDelayDuration});

		tl.to("#eyes", 3, {scale:1, onCompleteScope:this, onComplete:function(){
				this.revealFace();	
			}
		});
	}

	this.revealFace = function(){
		control.pauseAnimation();

		// firstX (line), firstY (line), endX (line), 'text', X (text), Y (text)
		this.animateCharacteristic(180, 310, 50, 'INCREDIBLE EYES', 50, 300);

		this.blink();

		// animate moon and face
		tl.to(moon, 1, {x:0, ease: Elastic.easeOut});
		tl.to(this.face, 2, {alpha:1, onCompleteScope:this, onComplete:function(){
				control.pauseAnimation();
				this.animateCharacteristic(205, 410, 50, 'INCREDIBLE NOSE', 50, 400);
			}
		});

		tl.to(moon, 1, {x:-145, ease: Elastic.easeIn, onCompleteScope:this, onComplete:function(){
				this.animateTeeth();
			}
		});

		this.blink();
	}

	// line with text animation
	this.animateCharacteristic = function(startX, startY, endX, text, textX, textY){
		svg.append('text')
			.text(text)
			.attr({x:textX, y:textY})
			.attr("font-size",15)
    		.attr("font-family","Futura")
    		.attr("fill-opacity", 0)
    		.classed('white', true);


		svg.append('line')
		  .attr({
		    x1: startX,
		    y1: startY,
		    x2: startX,
		    y2: startY
		  })

		  .transition()
		  .duration(500)
		  .attr({
		    x2: endX,
		    y2: startY
		  })

		  svg.selectAll("text").transition()
		  .duration(1500)
		  .delay(0)
		  .attr("fill-opacity", 1)

		  .transition()
		  .duration(200)
		  .delay(2100)
		  .attr("fill-opacity", 0)

		  d3.select('line').transition()
		  .duration(500)
		  .delay(2500)
		  .attr({x2:startX, y2:startY})

		  .each("end", control.resumeAnimation);
	}

	this.animateTeeth = function(){
		TweenMax.to(this.leftHookTooth, .3, {y:0, delay: forest.leavesDelayDuration});
		for(i=0;i<this.movingSmallTeeth.length;i++){
			// use "i" to delay leaf animation to be more natural
			TweenMax.to(this.movingSmallTeeth[i], .3, {y:-70, delay: forest.leavesDelayDuration+(i/10), transformOrigin:"50% 50%"});
		}

		tl.to(this.rightHookTooth, .4, {bezier:{type:"soft", values:[{x:240, y:-480}, {x:110, y:73}], autoRotate:false}, ease:Power1.easeInOut, onCompleteScope:this ,onComplete:function(){
				hideLeafRight.style.visibility = "hidden";
				control.pauseAnimation();
				this.animateCharacteristic(200, 450, 50, 'SHARP TEETH', 50, 440);
			}
		});
		
		tl.set(this.leftHookTooth, {y:0});
		tl.to(this.rightHookTooth, 1, {x:0, rotation:0, ease:Power1.easeInOut});
		tl.to(this.rightHookTooth, .5, {y:0, delay: .5, ease:Power1.easeInOut});

		forest.animateFallingLeaf();
		this.animateTeethShine();
	}

	this.animateTeethShine = function(){
		// teeth shine animation
		tl.to(shine, .5, {alpha:1});
		tl.to(shine, .7, {rotation:760});
		tl.to(shine, .5, {alpha:0, delay:1});
	}


	this.blink = function(){
		// eyes blink animation
		tl.to(this.eyes, .7, {scaleY:0, scaleX:1.1, transformOrigin:"50% 50%"});
		tl.to(this.eyes, .7, {scaleY:1, scaleX:1, transformOrigin:"50% 50%"});
	}
}