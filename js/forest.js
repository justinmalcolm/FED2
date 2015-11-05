function Forest (leavesLeft, leavesRight, cutLeaf, fallingCutLeaf, hideLeafRight) {
	this.leavesLeft 						= 		leavesLeft;
	this.leavesRight 						= 		leavesRight;
	this.cut_leaf 							= 		cutLeaf;
	this.fallingCutLeaf 					= 		fallingCutLeaf;
	this.hideLeafRight 						= 		hideLeafRight;

	this.leftLeaves 						= 		this.leavesLeft.getElementsByTagName("path");
	this.rightLeaves 						= 		this.leavesRight.getElementsByTagName("path");

	this.setAnimationPreferences = function (duration, delay, rotation) {
		this.leavesAnimationDuration 	= 		duration;
		this.leavesDelayDuration 		= 		delay;
		this.leavesRotationAmount 		= 		rotation;
	};


	this.animateOpenLeaves = function(){
		for(i=0;i<this.leftLeaves.length;i++){
			//animate all leaves
			TweenMax.to(this.leftLeaves[i], this.leavesAnimationDuration, {rotation: -this.leavesRotationAmount, delay: this.leavesDelayDuration+(i/10), transformOrigin:"bottom left"});
			TweenMax.to(this.rightLeaves[i], this.leavesAnimationDuration, {rotation: this.leavesRotationAmount, delay: this.leavesDelayDuration, transformOrigin:"bottom right"});

			// last loop - grass has opened - show eyes
			if(i==this.leftLeaves.length-1){
				baboon.showEyes();
				tl.set(this.cut_leaf, {alpha:1});
			}
		}
	}

	this.animateFallingLeaf = function(){
		// leaf falling animation
		tl.to(forest.fallingCutLeaf, 1, {rotationX: 100, rotationY: 50, x:-50, y:40, ease:Power1.easeInOut, transformOrigin:"50% 50%"});
		tl.to(forest.fallingCutLeaf, 1, {rotationX: 50, rotationY: -30, x:40, y:80, ease:Power1.easeInOut});
		tl.to(forest.fallingCutLeaf, 1, {rotationX: 100, x:-30, y:150, ease:Power1.easeInOut});
		tl.to(forest.fallingCutLeaf, 1, {rotationX: 50, x:70, y:270, ease:Power1.easeInOut});
	}
}