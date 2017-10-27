"use strict";
import net from "net";
//Allow keyword arguments to be easily passed to the scanner
//and set up help output
//argv will give us access to all command-line variables
import yargs from "yargs";

//Scanner helpers
import { Validator } from "validations";
import { Formatter } from "format";


//-------------------
// Yargs Configuration
//-------------------


//Define our variables and give example usage
yargs.usage("Usage: node port_scanner.js [options]")
    .option("port", {
        alias: "p",
        type: "number",
        describe: "Single port to scan"
    })
    .option("start", {
        alias: "s",
        type: "number",
        describe: "Starting port (inclusive)"
    })
    .option("end", {
        alias: "e",
        type: "number",
        describe: "Ending port (inclusive)"
    })
    .option("host", {
        alias: "h",
        type: "string",
        describe: "Address or hostname to scan",
        default: "127.0.0.1"
    })
    .option("timeout", {
        alias: "t",
        type: "number",
        describe: "Number of milliseconds to wait for a connection",
        default: 2000
    })
    .example("node port_scanner.js -s 5000 -e 5002 -h reddit.com -t 1000")
    .example("node port_scanner.js -p 5000");


//-------------------
// Define Scanner
//-------------------


class PortScanner {
    constructor(args) {
        //Defaults for host and timeout set in yargs config
        this.host = args.host;
        this.timeout = args.timeout;

        //Set defaults for all other variables, accounting for falsey 0
        this.start = (args.start === 0) ? 0 : (args.start || null);
        //End should never be 0, but we'll allow it to show correct error message
        this.end = (args.end === 0) ? 0 : (args.end || null);
        this.port = (args.port === 0) ? 0 : (args.port || null);

        //Create our helpers
        this.formatter = new Formatter();
        this.validator = new Validator(args);
    }
    //Begin the scanning process and notify user when process complete
    scanPorts() {
        //First, check that there weren't any errors with the options the user input
        if(!this.validator.checkErrors()) {
            return;
        }
        //If user wants to scan one port
        //And account for falsey 0
        if(this.port || this.port === 0) {
            this.formatter.info(`[INFO] Scanning port ${this.port} on ${this.host}`);
            this.connectToPort(this.port)
                .then(() => {
                    this.formatter.info("[INFO] Scanning completed.");
                })
                .catch(() => {
                    this.formatter.error(`[ERROR] Something went 
                        wrong in the scanning process. 
                        Run ${this.formatter.resetText}node port_scanner.js 
                        --help ${this.formatter.redText}for 
                        information on how to use this scanner.`);
                });
        } else if((this.start && this.end) || (this.start === 0 && this.end)) {
            //Create array of promises so we can use Promise.all to detect when all completed
            var promises = [];
            
            this.formatter.info(`[INFO] Scanning ${this.host} for ports between 
                ${this.start} and ${this.end}`);
            var current_port = this.start;
            while(current_port <= this.end) {
                promises.push(this.connectToPort(current_port));
                current_port++;
            }

            Promise.all(promises)
                .then(() => {
                    this.formatter.info("[INFO] Scanning completed.");
                })
                .catch(() => {
                    this.formatter.error(`[ERROR] Something went 
                        wrong in the scanning process. Run 
                        ${this.formatter.resetText}node port_scanner.js
                         --help ${this.formatter.redText}for 
                        information on how to use this scanner.`);
                });
        }
    }
    //Attempt connection to specified port
    connectToPort(port) {
        this.formatter.info(`[INFO] Attempting to connect to port 
            ${port} on ${this.host}`);
        return new Promise((resolve) => {
            const client = net.connect({port: port, host: this.host}, () => {
                //We successfully connected
                this.notifyUser(port, 'success');
                client.destroy();
                resolve();
            });
            client.on('error', (err) => {
                //We couldn't connect. err tells us why
                //Connection closed automatically on error
                this.notifyUser(port, 'error', err);
                //Don't reject on error. Failure to connect is not unexpected
                resolve();
            });
            //Set up timeout handling
            client.setTimeout(this.timeout);
            client.on('timeout', () => {
                this.notifyUser(port, 'timeout');
                client.destroy();
                //Don't reject on timeout.
                resolve();
            });
        });
    }
    //Notify user of result
    //Optional err parameter to send user specific error code
    notifyUser(port, status, err=null) {
        switch(status) {
            case 'success':
                this.formatter.success(`[CONNECTION] Port ${port} 
                    on ${this.host} is accepting connections.`);
                break;
            case 'timeout':
                this.formatter.error(`[TIMEOUT] Unable to connect 
                    to port ${port} on ${this.host}. Connection timed out.`);
                break;
            default:
                //Many different error codes we could get. Pass those on to the user
                this.formatter.error(`[${err.code}] Port ${port} 
                    on ${this.host} is not open to connections.`);
        }
    }
}


//-------------------
// Start Scanning
//-------------------


var scanner = new PortScanner(yargs.argv);
scanner.scanPorts();

