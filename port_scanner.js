!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=function(){function t(){r(this,t),this.redText="[31m",this.resetText="[0m"}return o(t,[{key:"reset",value:function(){console.log("[0m")}},{key:"success",value:function(t){t=this.undent(t),console.log("[32m"+t),this.reset()}},{key:"error",value:function(t){t=this.undent(t),console.log("[31m"+t),this.reset()}},{key:"info",value:function(t){t=this.undent(t),console.log("[33m"+t),this.reset()}},{key:"undent",value:function(t){return t.replace(/\s{2,}/g," ")}}]),t}();e.Formatter=s},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(2),a=r(i),u=n(3),c=r(u),h=n(4),f=n(0);c.default.usage("Usage: node port_scanner.js [options]").option("port",{alias:"p",type:"number",describe:"Single port to scan"}).option("start",{alias:"s",type:"number",describe:"Starting port (inclusive)"}).option("end",{alias:"e",type:"number",describe:"Ending port (inclusive)"}).option("host",{alias:"h",type:"string",describe:"Address or hostname to scan",default:"127.0.0.1"}).option("timeout",{alias:"t",type:"number",describe:"Number of milliseconds to wait for a connection",default:2e3}).example("node port_scanner.js -s 5000 -e 5002 -h reddit.com -t 1000").example("node port_scanner.js -p 5000"),new(function(){function t(e){o(this,t),console.log(e.s),this.host=e.host,this.timeout=e.timeout,this.start=0===e.start?0:e.start||null,this.end=0===e.end?0:e.end||null,this.port=0===e.port?0:e.port||null,this.formatter=new f.Formatter,this.validator=new h.Validator(e)}return s(t,[{key:"scanPorts",value:function(){var t=this;if(this.validator.checkErrors())if(this.port||0===this.port)this.formatter.info("[INFO] Scanning port "+this.port+" on "+this.host),this.connectToPort(this.port).then(function(){t.formatter.info("[INFO] Scanning completed.")}).catch(function(){t.formatter.error("[ERROR] Something went \n                        wrong in the scanning process. \n                        Run "+t.formatter.resetText+"node port_scanner.js \n                        --help "+t.formatter.redText+"for \n                        information on how to use this scanner.")});else if(this.start&&this.end||0===this.start&&this.end){var e=[];this.formatter.info("[INFO] Scanning "+this.host+" for ports between \n                "+this.start+" and "+this.end);for(var n=this.start;n<=this.end;)e.push(this.connectToPort(n)),n++;Promise.all(e).then(function(){t.formatter.info("[INFO] Scanning completed.")}).catch(function(){t.formatter.error("[ERROR] Something went \n                        wrong in the scanning process. Run \n                        "+t.formatter.resetText+"node port_scanner.js\n                         --help "+t.formatter.redText+"for \n                        information on how to use this scanner.")})}}},{key:"connectToPort",value:function(t){var e=this;return this.formatter.info("[INFO] Attempting to connect to port \n            "+t+" on "+this.host),new Promise(function(n){var r=a.default.connect({port:t,host:e.host},function(){e.notifyUser(t,"success"),r.destroy(),n()});r.on("error",function(r){e.notifyUser(t,"error",r),n()}),r.setTimeout(e.timeout),r.on("timeout",function(){e.notifyUser(t,"timeout"),r.destroy(),n()})})}},{key:"notifyUser",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;switch(e){case"success":this.formatter.success("[CONNECTION] Port "+t+" \n                    on "+this.host+" is accepting connections.");break;case"timeout":this.formatter.error("[TIMEOUT] Unable to connect \n                    to port "+t+" on "+this.host+". Connection timed out.");break;default:this.formatter.error("["+n.code+"] Port "+t+" \n                    on "+this.host+" is not open to connections.")}}}]),t}())(c.default.argv).scanPorts()},function(t,e){t.exports=require("net")},function(t,e){t.exports=require("yargs")},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Validator=void 0;var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=n(0),i=function(){function t(e){r(this,t),this.port=e.port,this.start=e.start,this.end=e.end,this.timeout=e.timeout,this.formatter=new s.Formatter,this.validationMapping={general:[[!this.port&&0!==this.port&&!this.start&&0!==this.start&&!this.end&&0!==this.end,"[ERROR] No ports specified. Run "+this.formatter.resetText+"node \n\t\t\t\t\t\tport_scanner.js --help "+this.formatter.redText+"for information \n\t\t\t\t\t\ton how to use this scanner."],[this.port&&this.start&&this.end,"[ERROR] Please choose either a single port or a range of \n\t\t\t\t\tports to scan, not both. Run "+this.formatter.resetText+"node \n\t\t\t\t\tport_scanner.js --help "+this.formatter.redText+"for information on \n\t\t\t\t\thow to use this scanner."],[this.start&&!this.end&&0!==this.end,"[ERROR] No ending port specified. To scan a single port, \n\t\t\t\t\tplease use "+this.formatter.resetText+"--port\n\t\t\t\t\t"+this.formatter.redText+", or run "+this.formatter.resetText+"\n\t\t\t\t\tnode port_scanner.js \n\t\t\t\t\t--help "+this.formatter.redText+"for more options."],[!this.start&&0!==this.start&&this.end,"[ERROR] No starting port specified. To scan a single port, \n\t\t\t\t\t please use "+this.formatter.resetText+"--port\n\t\t\t\t\t "+this.formatter.redText+", or \n\t\t\t\t\t run "+this.formatter.resetText+"node port_scanner.js --help \n\t\t\t\t\t "+this.formatter.redText+"for more options."],[this.timeout<0,"[ERROR] Timeout must be a positive value."]],port:[[this.port<0||this.port>65535,"[ERROR] Port number must be between 0 and 65535."],[this.port%1!=0,"[ERROR] Port must be a whole number."]],start_end:[[this.start<0||this.end>65535,"[ERROR] Port numbers must be between 0 and 65535."],[this.start%1!=0||this.end%1!=0,"[ERROR] Port must be a whole number."],[this.start>=this.end,"[ERROR] Starting port should be a smaller number than ending port."]]}}return o(t,[{key:"validateInput",value:function(t){var e=!0,n=!0,r=!1,o=void 0;try{for(var s,i=this.validationMapping[t][Symbol.iterator]();!(n=(s=i.next()).done);n=!0){var a=s.value,u=a[0],c=a[1];u&&(this.formatter.error(c),e=!1)}}catch(t){r=!0,o=t}finally{try{!n&&i.return&&i.return()}finally{if(r)throw o}}return e}},{key:"checkErrors",value:function(){return!!this.validateInput("general")&&(this.port||0===this.port?this.validateInput("port"):this.validateInput("start_end"))}}]),t}();e.Validator=i}]);