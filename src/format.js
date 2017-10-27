"use strict";

//-------------------
// Formatting Methods
//-------------------

class Formatter {
	constructor() {
		//Unfortunately, sometimes we need to change color in the middle of a string
		this.redText = "\x1b[31m";
		this.resetText = "\x1b[0m";
	}

	//Reset text color to whatever is normal for terminal
	reset() {
		console.log("\x1b[0m");
	}

	//Display message in green text
	success(text) {
		text = this.undent(text);
		console.log(`\x1b[32m${text}`);
		this.reset();
	}

	//Display message in red text
	error(text) {
		text = this.undent(text);
		console.log(`\x1b[31m${text}`);
		this.reset();
	}

	//Display message in yellow text
	info(text) {
		text = this.undent(text);
		console.log(`\x1b[33m${text}`);
		this.reset();
	}

	//Remove newlines and indentation (added for readability) from text
	undent(text) {
		return text.replace(/\s{2,}/g, ' ');
	}
}

export { Formatter };