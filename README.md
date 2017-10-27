# A Simple Port Scanner written in node.js

## Getting Started

1. Clone or download the project

2. Install all necessary dependencies
	
	`npm install`

3. Start scanning!

	* To scan a single port:

		`node port_scanner.js --port 80 --host 127.0.0.1`

	* To scan a range of ports:

		`node port_scanner.js --start 50 --end 80 --host 127.0.0.1`

	* For more options and examples:

		`node port_scanner.js --help`