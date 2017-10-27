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

	displayMessage(text, color) {
		text = this.undent(text);
		console.log(color + text);
		this.reset();
	}

	//Reset text color to whatever is normal for terminal
	reset() {
		console.log("\x1b[0m");
	}

	//Display message in green text
	success(text) {
		this.displayMessage(text, "\x1b[32m");
	}

	//Display message in red text
	error(text) {
		this.displayMessage(text, "\x1b[31m");
	}

	//Display message in yellow text
	info(text) {
		this.displayMessage(text, "\x1b[33m");
	}

	//Remove newlines and indentation (added for readability) from text
	undent(text) {
		return text.replace(/\s{2,}/g, ' ');
	}
}

export { Formatter };