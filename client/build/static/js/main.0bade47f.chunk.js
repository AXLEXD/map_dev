(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(t,e,n){},19:function(t,e,n){},20:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(7),i=n.n(o),s=(n(18),n(4)),c=n(3),u=n(5),l=n(8),h=n(1),f=n(2);n(19);function d(){d=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,a=Object.defineProperty||function(t,e,n){t[e]=n.value},r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",i=r.asyncIterator||"@@asyncIterator",s=r.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(T){c=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),s=new M(r||[]);return a(i,"_invoke",{value:k(t,n,s)}),i}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(T){return{type:"throw",arg:T}}}t.wrap=u;var h={};function f(){}function p(){}function m(){}var v={};c(v,o,function(){return this});var g=Object.getPrototypeOf,y=g&&g(g(F([])));y&&y!==e&&n.call(y,o)&&(v=y);var w=m.prototype=f.prototype=Object.create(v);function b(t){["next","throw","return"].forEach(function(e){c(t,e,function(t){return this._invoke(e,t)})})}function x(t,e){var r;a(this,"_invoke",{value:function(a,o){function i(){return new e(function(r,i){!function a(r,o,i,s){var c=l(t[r],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==typeof h&&n.call(h,"__await")?e.resolve(h.__await).then(function(t){a("next",t,i,s)},function(t){a("throw",t,i,s)}):e.resolve(h).then(function(t){u.value=t,i(u)},function(t){return a("throw",t,i,s)})}s(c.arg)}(a,o,r,i)})}return r=r?r.then(i,i):i()}})}function k(t,e,n){var a="suspendedStart";return function(r,o){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===r)throw o;return L()}for(n.method=r,n.arg=o;;){var i=n.delegate;if(i){var s=C(i,n);if(s){if(s===h)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===a)throw a="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a="executing";var c=l(t,e,n);if("normal"===c.type){if(a=n.done?"completed":"suspendedYield",c.arg===h)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(a="completed",n.method="throw",n.arg=c.arg)}}}function C(t,e){var n=e.method,a=t.iterator[n];if(void 0===a)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,C(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),h;var r=l(a,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,h;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function M(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function F(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,r=function e(){for(;++a<t.length;)if(n.call(t,a))return e.value=t[a],e.done=!1,e;return e.value=void 0,e.done=!0,e};return r.next=r}}return{next:L}}function L(){return{value:void 0,done:!0}}return p.prototype=m,a(w,"constructor",{value:m,configurable:!0}),a(m,"constructor",{value:p,configurable:!0}),p.displayName=c(m,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,c(t,s,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(x.prototype),c(x.prototype,i,function(){return this}),t.AsyncIterator=x,t.async=function(e,n,a,r,o){void 0===o&&(o=Promise);var i=new x(u(e,n,a,r),o);return t.isGeneratorFunction(n)?i:i.next().then(function(t){return t.done?t.value:i.next()})},b(w),c(w,s,"Generator"),c(w,o,function(){return this}),c(w,"toString",function(){return"[object Generator]"}),t.keys=function(t){var e=Object(t),n=[];for(var a in e)n.push(a);return n.reverse(),function t(){for(;n.length;){var a=n.pop();if(a in e)return t.value=a,t.done=!1,t}return t.done=!0,t}},t.values=F,M.prototype={constructor:M,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function a(n,a){return i.type="throw",i.arg=t,e.next=n,a&&(e.method="next",e.arg=void 0),!!a}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],i=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var s=n.call(o,"catchLoc"),c=n.call(o,"finallyLoc");if(s&&c){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(t,e){for(var a=this.tryEntries.length-1;a>=0;--a){var r=this.tryEntries[a];if(r.tryLoc<=this.prev&&n.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,h):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),E(n),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var a=n.completion;if("throw"===a.type){var r=a.arg;E(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:F(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),h}},t}var p=0,m=2,v=["#000000","#FFFFFF","#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#800000","#008000","#000080","#808000","#800080","#008080","#808080","#C0C0C0","#FFC0CB","#FFA07A","#FF7F50","#FF6347","#FF4500","#FF8C00","#FFD700","#FFFFE0","#EEE8AA","#ADFF2F","#32CD32","#00FA9A","#00CED1","#6A5ACD","#7B68EE","#FF69B4","#8B4513"];function g(t,e,n,a,r){var o=n-t,i=a-e,s=1;i<0&&(s=-1,i=-i);for(var c=2*i-o,u=e,l=t;l<n+1;l++)r(l,u),c>0?(u+=s,c+=2*(i-o)):c+=2*i}function y(t,e,n,a,r){var o=n-t,i=a-e,s=1;o<0&&(s=-1,o=-o);for(var c=2*o-i,u=t,l=e;l<a+1;l++)r(u,l),c>0?(u+=s,c+=2*(o-i)):c+=2*o}function w(t,e,n,a){var r=t.x+n.x,o=t.y+n.y,i=e.x+n.x,s=e.y+n.y;r===i&&o===s&&a(r,o),Math.abs(s-o)<Math.abs(i-r)?r>i?g(i,s,r,o,a):g(r,o,i,s,a):o>s?y(i,s,r,o,a):y(r,o,i,s,a)}function b(t){return parseInt(t.substring(1),16)}function x(t){return"#"+(16777215&t).toString(16).padStart(6,"0")}var k=function(){function t(e,n){Object(h.a)(this,t),this.x=e,this.y=n}return Object(f.a)(t,[{key:"transform",value:function(t,e){this.x+=t,this.y+=e}},{key:"setTo",value:function(t,e){this.x=t,this.y=e}},{key:"isEqualTo",value:function(t){return this.x===t.x&&this.y===t.y}},{key:"notEqualTo",value:function(t){return this.x!==t.x||this.y!==t.y}},{key:"positive",value:function(){return this.x>=0&&this.y>=0}},{key:"multipliedby",value:function(e){return new t(this.x*e,this.y*e)}},{key:"transformedby",value:function(e,n){return new t(this.x+e,this.y+n)}}]),t}(),C=function(){function t(){Object(h.a)(this,t),this.data=null,this.image=null,this.dataview=null,this.imageview=null,this.numchunks=null,this.cellsize=2}return Object(f.a)(t,[{key:"getValues",value:function(t,e,n){var a=16*n,r=new k(0,0),o=new k(0,0);o.x=0===e.x?0:Math.floor(-1*e.x/a),o.y=0===e.y?0:Math.floor(-1*e.y/a);var i=t.getBoundingClientRect(),s=i.width,c=i.height;return r.x=Math.ceil(s/a)+1,r.y=Math.ceil(c/a)+1,{startpoint:o,numchunks:r}}},{key:"setMatrix",value:function(){var t=Object(l.a)(d().mark(function t(e,n,a,r,o){var i,s,c,u,l;return d().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(i=[],s=this,c=0;c<e.x;c++)for(u=0;u<e.y;u++)l={x:n.x+c,y:n.y+u},i.push(l);return t.abrupt("return",new Promise(function(t,n){fetch("".concat(window.location.hostname,":3001/getchunks"),{method:"POST",headers:{Accept:"application/octet-stream","Content-Type":"application/json"},body:JSON.stringify({coords:i,lines:a})}).then(function(t){return t.arrayBuffer()}).then(function(n){s.numchunks=e;var a=Date.now();s.data=n,s.dataview=new Uint32Array(s.data),s.image=new ArrayBuffer(n.byteLength*r*r),s.imageview=new Uint32Array(s.image);for(var i=new Uint32Array(n),c=0;c<s.numchunks.x;c++)for(var u=0;u<s.numchunks.y;u++)for(var l=0;l<16;l++)for(var h=0;h<16;h++)for(var f=16*c*r+u*s.numchunks.x*256*r*r+l*r+h*s.numchunks.x*16*r*r,d=i[s.getDataIndex(c,u,l,h)],p=d<<16&16711680|4278255360&d|d>>16&255,m=0;m<r;m++)for(var v=0;v<r;v++){var g=f+m+v*s.numchunks.x*16*r;s.imageview[g]=p}s.cellsize=r,o(Date.now()-a),t()})}));case 4:case"end":return t.stop()}},t,this)}));return function(e,n,a,r,o){return t.apply(this,arguments)}}()},{key:"getChunkPosOffset",value:function(t,e){var n=Math.floor(t.x/16)-e.x,a=t.x-16*(n+e.x),r=Math.floor(t.y/16)-e.y;return{i:n,j:r,k:a,l:t.y-16*(r+e.y)}}},{key:"getDataIndex",value:function(t,e,n,a){return t*this.numchunks.y*256+256*e+16*n+a}}]),t}(),_=function(t){function e(t){var n;return Object(h.a)(this,e),(n=Object(s.a)(this,Object(c.a)(e).call(this,t))).state={tool_mode:m,debug_mode:!1,show_stats:!0,color_selected:1672153,stroke_radius:1,update:{time:0,tot_time:0,num_updates:1},transcode:{time:0,tot_time:0,num_updates:1},draw:{time:0,tot_time:0,num_updates:1},cursorx:0,cursory:0,offsetx:0,offsety:0,chunkx:0,chunky:0,cxstart:0,cystart:0,cxend:0,cyend:0},n.strokecanvasRef=Object(a.createRef)(),n.getColorSelected=function(){return n.state.color_selected},n.getDebugMode=function(){return n.state.debug_mode},n.getToolMode=function(){return n.state.tool_mode},n.changeToolMode=function(t){n.setState({tool_mode:t})},n.changeColor=function(t){if("number"!==typeof t)throw"penis";n.setState({color_selected:t}),n.changeToolMode(p),n.drawStrokeCanvas(t)},n.isSelected=function(t){return"string"===typeof t?b(t)===n.state.color_selected:"number"===typeof t?t===n.state.color_selected:void 0},n.changeUpdateTime=function(t){n.setState({update:{time:t,tot_time:n.state.update.tot_time+t,num_updates:n.state.update.num_updates+1}})},n.changeTranscodeTime=function(t){n.setState({transcode:{time:t,tot_time:n.state.transcode.tot_time+t,num_updates:n.state.transcode.num_updates+1}})},n.changeDrawTime=function(t){n.setState({draw:{time:t,tot_time:n.state.draw.tot_time+t,num_updates:n.state.draw.num_updates+1}})},n.changeCursorLoc=function(t){n.setState({cursorx:t.x,cursory:t.y})},n.changeOffsetLoc=function(t){n.setState({offsetx:t.x,offsety:t.y})},n.changeChunkLoc=function(t,e){n.setState({chunkx:t,chunky:e})},n}return Object(u.a)(e,t),Object(f.a)(e,[{key:"componentDidMount",value:function(){document.body.style.overflow="hidden",this.strokecanvas=this.strokecanvasRef.current,this.drawStrokeCanvas()}},{key:"drawStrokeCanvas",value:function(t){var e=50*(this.state.stroke_radius+2);this.strokecanvas.width=e,this.strokecanvas.height=e;var n=this.strokecanvas.getContext("2d");n.clearRect(0,0,this.strokecanvas.width,this.strokecanvas.height),n.fillStyle="#ffffff",n.fillRect(0,0,this.strokecanvas.width,this.strokecanvas.height),n.fillStyle=x(t),n.fillRect(50,50,50,50)}},{key:"mapDownload",value:function(){var t,e={x1:this.state.cxstart,y1:this.state.cystart,x2:this.state.cxend,y2:this.state.cyend};e.x1===e.x2||e.y1===e.y2||e.x1>e.x2||e.y1>e.y2||fetch("".concat(window.location.hostname,":3001/getimage"),{method:"POST",headers:{Accept:"application/octet-stream","Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(e){return t=e.headers.get("Content-Disposition").split('"')[1],e.blob()}).then(function(e){var n=window.URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.setAttribute("download",t),document.body.appendChild(a),a.click(),a.parentNode.removeChild(a)})}},{key:"render",value:function(){var t=this;return r.a.createElement("div",{className:"App-wrapper"},r.a.createElement(E,{toolmode:this.state.tool_mode,getToolMode:this.getToolMode,changeToolMode:this.changeToolMode,getDebugMode:this.getDebugMode,changeUpdateTime:this.changeUpdateTime,changeTranscodeTime:this.changeTranscodeTime,changeDrawTime:this.changeDrawTime,getColorSelected:this.getColorSelected,changeCursorLoc:this.changeCursorLoc,changeOffsetLoc:this.changeOffsetLoc,changeChunkLoc:this.changeChunkLoc,changeColor:this.changeColor}),r.a.createElement(M,{isSelected:this.isSelected,changeColor:this.changeColor,color:this.state.color_selected}),r.a.createElement("div",{className:"drawer primary"},this.state.show_stats?r.a.createElement("div",{style:{position:"absolute",right:"0.8vw"}},"(",this.state.update.time,"ms, avg: ",Math.round(this.state.update.tot_time/this.state.update.num_updates),"ms, ",this.state.update.num_updates," updates)",r.a.createElement("br",null),"(",this.state.transcode.time,"ms, avg: ",Math.round(this.state.transcode.tot_time/this.state.transcode.num_updates),"ms, ",this.state.transcode.num_updates," transcodes);",r.a.createElement("br",null),"(",this.state.draw.time,"ms, avg: ",Math.round(this.state.draw.tot_time/this.state.draw.num_updates),"ms, ",this.state.draw.num_updates," draws)",r.a.createElement("br",null),"Cursor: (",this.state.cursorx,",",this.state.cursory,")",r.a.createElement("br",null),"Offset: (",this.state.offsetx,",",this.state.offsety,")",r.a.createElement("br",null),"Chunk: (",this.state.chunkx,",",this.state.chunky,")"):null,r.a.createElement("div",{className:"toolbutton"+(this.getToolMode()===p?"selected":"")+" blockbutton"+(this.getToolMode()===p?"selected":""),onClick:function(){t.changeToolMode(p)}},"draw"),r.a.createElement("div",{className:"toolbutton"+(1===this.getToolMode()?"selected":"")+" blockbutton"+(1===this.getToolMode()?"selected":""),onClick:function(){t.changeToolMode(1)}},"eyedrop"),r.a.createElement("div",{className:"toolbutton"+(this.getToolMode()===m?"selected":"")+" blockbutton"+(this.getToolMode()===m?"selected":""),onClick:function(){t.changeToolMode(m)}},"move"),r.a.createElement("input",{checked:this.state.debug_mode,type:"checkbox",onChange:function(){t.setState({debug_mode:!t.state.debug_mode})}})," Debug Mode\u2002",r.a.createElement("input",{checked:this.state.show_stats,type:"checkbox",onChange:function(){t.setState({show_stats:!t.state.show_stats})}})," Stats",r.a.createElement("table",{className:"download-wrapper"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("p",null,"from:\xa0"),r.a.createElement("input",{defaultValue:"0",type:"number",style:{width:"35px"},onChange:function(e){return t.setState({cxstart:parseInt(e.target.value)})}}),r.a.createElement("input",{defaultValue:"0",type:"number",style:{width:"35px"},onChange:function(e){return t.setState({cystart:parseInt(e.target.value)})}}))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("p",null,"to:\xa0"),r.a.createElement("input",{defaultValue:"0",type:"number",style:{width:"35px"},onChange:function(e){return t.setState({cxend:parseInt(e.target.value)})}}),r.a.createElement("input",{defaultValue:"0",type:"number",style:{width:"35px"},onChange:function(e){return t.setState({cyend:parseInt(e.target.value)})}}))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("p",null,"Save PNG:"),r.a.createElement("div",{className:"download-button",onClick:function(){return t.mapDownload()}},r.a.createElement("img",{src:"save.png",alt:"save"})))))),r.a.createElement("canvas",{ref:this.strokecanvasRef,style:{width:"10vmin",height:"10vmin"}})))}}]),e}(r.a.Component),E=function(t){function e(t){var n;return Object(h.a)(this,e),(n=Object(s.a)(this,Object(c.a)(e).call(this,t))).drawLines=[],n.lastdraw=0,n.scale=4,n.tempscale=n.scale,n.cellpos={i:0,j:0,k:0,l:0},n.map_grid=null,n.canvasRef=Object(a.createRef)(),n.mapoffset=new k(0,0),n.celloffset=new k(0,0),n.currentcell=new k(0,0),n.startpoint=new k(0,0),n.cursorcurrent=new k(0,0),n.lmousedown=!1,n.rmousedown=!1,n.mousepos=new k(0,0),n.canvas=null,n.replacecanvas=null,n.is_updating=!1,n.drawcache=[],n}return Object(u.a)(e,t),Object(f.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.canvas=this.canvasRef.current,this.replacecanvas=document.createElement("canvas"),this.map_grid=new C,this.resizeCanvas(this.canvas),window.addEventListener("resize",function(){return t.resizeCanvas(t.canvas)}),setTimeout(this.updateCanvas(),1e3)}},{key:"getCursorPosition",value:function(t,e){var n=e.getBoundingClientRect(),a=t.clientX-n.left,r=t.clientY-n.top,o=new k(a/(this.tempscale/this.scale),r/(this.tempscale/this.scale));return this.mousepos=o,o}},{key:"getCurrentCell",value:function(){var t=Math.floor((this.cursorcurrent.x-this.mapoffset.x*this.scale)/this.scale),e=Math.floor((this.cursorcurrent.y-this.mapoffset.y*this.scale)/this.scale);return new k(t,e)}},{key:"moveMap",value:function(t,e){var n=(e.x-t.x)/this.scale,a=(e.y-t.y)/this.scale;this.mapoffset.transform(n,a),this.celloffset.setTo(Math.floor(this.mapoffset.x),Math.floor(this.mapoffset.y)),this.props.changeOffsetLoc(this.celloffset)}},{key:"drawMap",value:function(t,e,n){var a=this,r=Date.now();if(null!==this.map_grid.image&&null!==this.map_grid.numchunks){var o,i,s=this.map_grid.cellsize,c=function(t,n,a,r){o=(16*(t+e.x)+a)*s+g,i=(16*(n+e.y)+r)*s+y,h.fillRect(o,i,s,s)},u=16*this.map_grid.numchunks.x*s;if(4*this.map_grid.image.byteLength%u===0){var l=new ImageData(new Uint8ClampedArray(this.map_grid.image),u),h=t.getContext("2d"),f=this.replacecanvas.getContext("2d");f.clearRect(0,0,this.replacecanvas.width,this.replacecanvas.height),f.putImageData(l,0,0);var d=t.getBoundingClientRect(),m=d.width,v=d.height;h.clearRect(0,0,m,v),h.fillStyle="#ffffff",h.fillRect(0,0,t.width,t.height);var g=Math.floor(this.mapoffset.x*s),y=Math.floor(this.mapoffset.y*s),b=16*e.x*s+g,C=16*e.y*s+y;if(h.drawImage(this.replacecanvas,b,C),this.props.getDebugMode()){h.beginPath();for(var _=0;_<this.map_grid.numchunks.x;_++)for(var E=0;E<this.map_grid.numchunks.y;E++)o=16*(_+e.x)*s+g,i=16*(E+e.y)*s+y,h.fillStyle="#000000",h.lineWidth=.01*Math.floor(this.scale),h.moveTo(o,0),h.lineTo(o,v),h.moveTo(0,i),h.lineTo(m,i);h.stroke()}this.drawcache.forEach(function(t){t.forEach(function(t){w(t.p1,t.p2,t.offset,function(e,n){var r=new k(e-t.offset.x,n-t.offset.y),o=a.map_grid.getChunkPosOffset(r,a.startpoint),i=o.i,s=o.j,u=o.k,l=o.l;h.fillStyle=x(t.blockid),c(i,s,u,l)})})}),this.props.toolmode===p&&(h.fillStyle=x(this.props.getColorSelected())+"ff",c(this.cellpos.i,this.cellpos.j,this.cellpos.k,this.cellpos.l)),this.props.changeDrawTime(Date.now()-r)}}}},{key:"updateCanvas",value:function(){var t=this,e=Date.now(),n=Math.floor(this.tempscale),a=this.map_grid.getValues(this.canvas,this.mapoffset.multipliedby(n),n),r=a.startpoint,o=a.numchunks,i=this.drawLines;this.drawLines=[],this.is_updating=!0,this.map_grid.setMatrix(o,r,i,n,this.props.changeTranscodeTime).then(function(){t.replacecanvas.width=n*o.x*16,t.replacecanvas.height=n*o.y*16,t.resizeCanvas(t.canvas),t.canvasscale(t.canvas,t.tempscale/n,t.tempscale/n),t.scale=Math.floor(t.tempscale),t.startpoint=r,t.drawMap(t.canvas,r,!0),t.props.changeUpdateTime(Date.now()-e),t.is_updating=!1}).then(function(){t.drawcache.push([]),t.drawcache.length>4&&t.drawcache.shift()}),setTimeout(function(){t.updateCanvas()},1e3)}},{key:"resizeCanvas",value:function(t){var e=t.getBoundingClientRect(),n=e.width,a=e.height;if(t.width!==n||t.height!==a){var r=window.devicePixelRatio,o=void 0===r?1:r,i=t.getContext("2d");return t.width=1*n*o,t.height=1*a*o,i.scale(o,o),!0}return!1}},{key:"canvasscale",value:function(t,e,n){t.getContext("2d").scale(e,n)}},{key:"moveCursor",value:function(t){var e=!1,n=this.getCursorPosition(t,this.canvas);this.rmousedown&&(this.moveMap(this.cursorcurrent,n),e=!0),this.cursorcurrent=n;var a=this.getCurrentCell();return this.currentcell.isEqualTo(a)||(this.lmousedown&&this.drawLine(this.currentcell,a),this.currentcell=a,this.cellpos=this.map_grid.getChunkPosOffset(this.currentcell,this.startpoint),this.props.changeCursorLoc(this.currentcell),this.props.changeChunkLoc(this.cellpos.i+this.startpoint.x,this.cellpos.j+this.startpoint.y),e=!0),e}},{key:"drawLine",value:function(t,e){var n={p1:t,p2:e,offset:this.celloffset,blockid:this.props.getColorSelected()};this.drawcache[this.drawcache.length-1].push(n),this.drawLines.push(n)}},{key:"render",value:function(){var t=this;return r.a.createElement("div",null,r.a.createElement("canvas",{ref:this.canvasRef,className:"map-canvas primary",style:{cursor:function(){switch(t.props.toolmode){case 1:return"crosshair";case m:return"move";default:return"default"}}()},onContextMenu:function(t){t.preventDefault()},onMouseDown:function(e){if(e.preventDefault(),0===e.button)switch(t.props.toolmode){case 1:console.log("eyedroptool used");var n=t.map_grid.getChunkPosOffset(t.currentcell,t.startpoint),a=n.i,r=n.j,o=n.k,i=n.l,s=t.map_grid.getDataIndex(a,r,o,i);t.props.changeColor(t.map_grid.dataview[s]);break;case m:t.rmousedown=!0;break;default:t.lmousedown=!0,t.drawLine(t.currentcell,t.currentcell),t.drawMap(t.canvas,t.startpoint)}else 2===e.button&&(t.rmousedown=!0)},onMouseUp:function(e){t.lmousedown=!1,t.rmousedown=!1,t.drawMap(t.canvas,t.startpoint)},onMouseMove:function(e){t.moveCursor(e)&&t.drawMap(t.canvas,t.startpoint)},onMouseLeave:function(e){t.moveCursor(e),t.lmousedown=!1,t.rmousedown=!1,t.drawMap(t.canvas,t.startpoint)},onWheel:function(e){var n=t.tempscale-Math.floor(e.deltaY)/1e3,a=t.tempscale;t.tempscale=n>3?n:3;t.scale;console.log(t.tempscale);var r=t.tempscale/a;t.canvasscale(t.canvas,r,r),t.drawMap(t.canvas,t.startpoint)}}))}}]),e}(r.a.Component),M=function(t){function e(t){var n;return Object(h.a)(this,e),(n=Object(s.a)(this,Object(c.a)(e).call(this,t))).handleChange=function(t){n.props.changeColor(t.target.value)},n}return Object(u.a)(e,t),Object(f.a)(e,[{key:"render",value:function(){var t=this;return r.a.createElement("div",{className:"palette primary"},v.map(function(e,n){return r.a.createElement("div",{key:n,style:{backgroundColor:"".concat(e)},className:"blockbutton"+(t.props.isSelected(e)?"selected":""),onClick:function(){t.props.changeColor(b(e))}})}),r.a.createElement("input",{style:{width:"100px",border:"none"},value:this.props.color,type:"color",onChange:this.handleChange}))}}]),e}(r.a.Component);var F=function(){return r.a.createElement(_,null)},L=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,21)).then(function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,o=e.getLCP,i=e.getTTFB;n(t),a(t),r(t),o(t),i(t)})};i.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(F,null))),L()},9:function(t,e,n){t.exports=n(20)}},[[9,1,2]]]);
//# sourceMappingURL=main.0bade47f.chunk.js.map