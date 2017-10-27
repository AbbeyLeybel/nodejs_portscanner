"use strict";
import { Formatter } from 'format';

//-------------------
// Validate User Input
//-------------------

class Validator {
	constructor(args) {
		//Set up variables to check
		this.port = args.port;
		this.start = args.start;
		this.end = args.end;
		this.timeout = args.timeout;

		this.formatter = new Formatter();
		this.validationMapping = {
			//Validations we always have to run
		 	general: [
			 	//If no options are specified
			 	//Add in extra conditionals to account for 0 being falsey in JS
				[(!this.port && this.port !== 0 && !this.start && 
					this.start !== 0 && !this.end && this.end !== 0),
						`[ERROR] No ports specified. Run ${this.formatter.resetText}node 
						port_scanner.js --help ${this.formatter.redText}for information 
						on how to use this scanner.`],
				//If user specifies a range and a single port, ask them to choose just one of those options
				[(this.port && this.start && this.end),
					`[ERROR] Please choose either a single port or a range of 
					ports to scan, not both. Run ${this.formatter.resetText}node 
					port_scanner.js --help ${this.formatter.redText}for information on 
					how to use this scanner.`],
				//If one end of the range doesn't exist, make user aware of single-port option
				//And don't forget to account for falsey 0
				[(this.start && !this.end && this.end !== 0),
					`[ERROR] No ending port specified. To scan a single port, 
					please use ${this.formatter.resetText}--port
					${this.formatter.redText}, or run ${this.formatter.resetText}
					node port_scanner.js 
					--help ${this.formatter.redText}for more options.`],
				[(!this.start && this.start !== 0 && this.end),
					`[ERROR] No starting port specified. To scan a single port, 
					 please use ${this.formatter.resetText}--port
					 ${this.formatter.redText}, or 
					 run ${this.formatter.resetText}node port_scanner.js --help 
					 ${this.formatter.redText}for more options.`],
				//Make sure that timeout isn't negative
				[(this.timeout < 0),
					"[ERROR] Timeout must be a positive value."],
			],
			//Validations we only run if the port option is specified
			port: [
				//If port does not exist
				[(this.port < 0 || this.port > 65535),
					"[ERROR] Port number must be between 0 and 65535."],
				//If port is not integer
				[(this.port % 1 !== 0),
					"[ERROR] Port must be a whole number."]
			],
			//Validations we only run if the start/end options are specified
			start_end: [
				//If port does not exist
				[(this.start < 0 || this.end > 65535),
					"[ERROR] Port numbers must be between 0 and 65535."],
				//If either port is not a whole number
				[(this.start % 1 !== 0 || this.end % 1 !== 0),
					"[ERROR] Port must be a whole number."],
				[(this.start >= this.end),
					"[ERROR] Starting port should be a smaller number than ending port."]
			]
		};
	}

	validateInput(category) {
		var valid = true;
		for(let validation of this.validationMapping[category]) {
			let conditional = validation[0];
			let message = validation[1];
			if(conditional) {
				this.formatter.error(message);
				valid = false;
			}
		}
		return valid;
	}
	
	checkErrors() {
		//If we passed the first step, we can enter our more specific validations
		if(this.validateInput('general')) {
			//Account for falsey 0
			if(this.port || this.port === 0) {
				return this.validateInput('port');
			} else {
				return this.validateInput('start_end');
			}
		}
		return false;
	}

}

export { Validator };

