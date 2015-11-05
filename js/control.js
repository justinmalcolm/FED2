function Control(){
		this.pauseAnimation = function (){
		tl.pause();
	}

 	this.resumeAnimation = function (){
		tl.resume();

		// remove added lines / text from memory
		svg.selectAll("line").remove();
		svg.selectAll("text").remove();
	}
}