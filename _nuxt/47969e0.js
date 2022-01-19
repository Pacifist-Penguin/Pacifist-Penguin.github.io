(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{187:function(t,e,r){var content=r(296);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(75).default)("56b15182",content,!0,{sourceMap:!1})},188:function(t,e,r){var content=r(298);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(75).default)("333059d4",content,!0,{sourceMap:!1})},206:function(t,e,r){"use strict";var n=r(2),o=r(117),l=r(116);r(257),r(16),r(259),r(264),r(266),r(267),r(268),r(271),r(272),r(273),r(274),r(275),r(276),r(277),r(278),r(280),r(281),r(282),r(283),r(284),r(285),r(286),r(287),r(291),r(292),r(293),r(28),r(294),r(70);function f(t,e){var canvas;t instanceof HTMLCanvasElement?(canvas=t,t=f.getContext(t,e)):canvas=t.canvas,this.gl=t,this.canvas=canvas,this.defaultFramebuffer=new f.Framebuffer(t,null)}f.QUAD2=new Float32Array([-1,-1,1,-1,-1,1,1,1]),f.fetch=function(t,e){var r=new XMLHttpRequest;return r.open("GET",t,Boolean(e)),null!=e&&(r.onload=function(){e(r.responseText)}),r.send(),r.responseText},f.getContext=function(canvas,t,e){var r;try{r=canvas.getContext("webgl",t||{})||canvas.getContext("experimental-webgl",t||{})}catch(t){r=null}if(null!=r||e)return r;throw new Error("Could not create WebGL context.")},f.looksLikeURL=function(t){return null==/\s/.exec(t)},f.isArray=function(object){var t=Object.prototype.toString.apply(object,[]);return null!=/ (Float(32|64)|Int(16|32|8)|Uint(16|32|8(Clamped)?))?Array]$/.exec(t)},f.prototype.program=function(t,e,r){return f.looksLikeURL(t)&&(t=f.fetch(t)),f.looksLikeURL(e)&&(e=f.fetch(e)),null!=r&&(t=r(t),e=r(e)),new f.Program(this.gl,t,e)},f.prototype.array=function(data,t){var e=this.gl,r=new f.Buffer(e,e.ARRAY_BUFFER);return null!=data&&r.update(data,null==t?e.STATIC_DRAW:t),r},f.prototype.elements=function(data,t){var e=this.gl,r=new f.Buffer(e,e.ELEMENT_ARRAY_BUFFER);return null!=data&&r.update(data,null==t?e.STATIC_DRAW:t),r},f.prototype.texture=function(source,t,e,filter,r){var n=new f.Texture(this.gl,t,e,filter,r);return null!=source&&n.set(source),n},f.prototype.framebuffer=function(t){var e=new f.Framebuffer(this.gl);return null!=t&&e.attach(t),e},f.Program=function(t,e,r){this.gl=t,this.debug=!1;var p=this.program=t.createProgram();if(t.attachShader(p,this.makeShader(t.VERTEX_SHADER,e)),t.attachShader(p,this.makeShader(t.FRAGMENT_SHADER,r)),t.linkProgram(p),!t.getProgramParameter(p,t.LINK_STATUS))throw new Error(t.getProgramInfoLog(p));this.vars={}},f.Program.prototype.makeShader=function(t,source){var e=this.gl,r=e.createShader(t);if(e.shaderSource(r,source),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))return r;throw new Error(e.getShaderInfoLog(r))},f.Program.prototype.use=function(){return this.gl.useProgram(this.program),this},f.Program.prototype.uniform=function(t,e,i){if(null==e)this.vars[t]=this.gl.getUniformLocation(this.program,t);else{null==this.vars[t]&&this.uniform(t);var r=this.vars[t];if(f.isArray(e)){var n="uniform"+e.length+(i?"i":"f")+"v";this.gl[n](r,e)}else{if("number"!=typeof e&&"boolean"!=typeof e)throw new TypeError("Invalid uniform value: "+e);i?this.gl.uniform1i(r,e):this.gl.uniform1f(r,e)}}return this},f.Program.prototype.matrix=function(t,e,r){null==this.vars[t]&&this.uniform(t);var n="uniformMatrix"+Math.sqrt(e.length)+"fv";return this.gl[n](this.vars[t],Boolean(r),e),this},f.Program.prototype.uniformi=function(t,e){return this.uniform(t,e,!0)},f.Program.prototype.attrib=function(t,e,r,n){var o=this.gl;return null==e?this.vars[t]=o.getAttribLocation(this.program,t):(null==this.vars[t]&&this.attrib(t),e.bind(),o.enableVertexAttribArray(this.vars[t]),o.vertexAttribPointer(this.vars[t],r,o.FLOAT,!1,null==n?0:n,0)),this},f.Program.prototype.draw=function(t,e,r){var n=this.gl;if(null==r?n.drawArrays(t,0,e):n.drawElements(t,e,r,0),this.debug&&n.getError()!==n.NO_ERROR)throw new Error("WebGL rendering error");return this},f.Program.prototype.disable=function(){for(var t in this.vars){var e=this.vars[t];Object.prototype.hasOwnProperty.call(this.vars,t)&&"number"==typeof e&&this.gl.disableVertexAttribArray(e)}return this},f.Buffer=function(t,e){this.gl=t,this.buffer=t.createBuffer(),this.target=null==e?t.ARRAY_BUFFER:e,this.size=-1},f.Buffer.prototype.bind=function(){return this.gl.bindBuffer(this.target,this.buffer),this},f.Buffer.prototype.update=function(data,t){var e=this.gl;return data instanceof Array&&(data=new Float32Array(data)),t=null==t?e.DYNAMIC_DRAW:t,this.bind(),this.size!==data.byteLength?(e.bufferData(this.target,data,t),this.size=data.byteLength):e.bufferSubData(this.target,0,data),this},f.Texture=function(t,e,r,filter,n){this.gl=t;var o=this.texture=t.createTexture();t.bindTexture(t.TEXTURE_2D,o),r=null==r?t.CLAMP_TO_EDGE:r,filter=null==filter?t.LINEAR:filter,t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,filter),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,filter),this.format=null==e?t.RGBA:e,this.type=null==n?t.UNSIGNED_BYTE:n},f.Texture.prototype.bind=function(t){var e=this.gl;return null!=t&&e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,this.texture),this},f.Texture.prototype.blank=function(t,e){var r=this.gl;return this.bind(),r.texImage2D(r.TEXTURE_2D,0,this.format,t,e,0,this.format,this.type,null),this},f.Texture.prototype.set=function(source,t,e){var r=this.gl;return this.bind(),source instanceof Array&&(source=this.type===r.FLOAT?new Float32Array(source):new Uint8Array(source)),null!=t||null!=e?r.texImage2D(r.TEXTURE_2D,0,this.format,t,e,0,this.format,this.type,source):r.texImage2D(r.TEXTURE_2D,0,this.format,this.format,this.type,source),this},f.Texture.prototype.subset=function(source,t,e,r,n){var o=this.gl;return this.bind(),source instanceof Array&&(source=this.type===o.FLOAT?new Float32Array(source):new Uint8Array(source)),null!=r||null!=n?o.texSubImage2D(o.TEXTURE_2D,0,t,e,r,n,this.format,this.type,source):o.texSubImage2D(o.TEXTURE_2D,0,t,e,this.format,this.type,source),this},f.Texture.prototype.copy=function(t,e,r,n){var o=this.gl;return o.copyTexImage2D(o.TEXTURE_2D,0,this.format,t,e,r,n,0),this},f.Framebuffer=function(t,e){this.gl=t,this.framebuffer=2===arguments.length?e:t.createFramebuffer(),this.renderbuffer=null},f.Framebuffer.prototype.bind=function(){return this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.framebuffer),this},f.Framebuffer.prototype.unbind=function(){return this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this},f.Framebuffer.prototype.attach=function(t){var e=this.gl;return this.bind(),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t.texture,0),this},f.Framebuffer.prototype.attachDepth=function(t,e){var r=this.gl;return this.bind(),null==this.renderbuffer&&(this.renderbuffer=r.createRenderbuffer(),r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_COMPONENT16,t,e),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,this.renderbuffer)),this};var h="#ifdef GL_ES\nprecision mediump float;\n#endif\n\nattribute vec2 quad;\n\nvoid main() {\n    gl_Position = vec4(quad, 0, 1.0);\n}\n",c=Object(o.a)((function t(canvas,e){Object(l.a)(this,t);var r=this.igloo=new f(canvas),n=r.gl;if(null==n)throw alert("Could not initialize WebGL!"),new Error("No WebGL");e=this.scale=e||4;var o=canvas.width,c=canvas.height;this.viewsize=new Float32Array([o,c]),this.statesize=new Float32Array([o/e,c/e]),this.timer=null,this.lasttick=t.now(),this.fps=0,n.disable(n.DEPTH_TEST),this.programs={copy:r.program(h,"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform sampler2D state;\nuniform vec2 scale;\n\nvoid main() {\n    gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);\n}"),gol:r.program(h,"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform sampler2D state;\nuniform vec2 scale;\n\nint get(vec2 offset) {\n    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);\n}\n\nvoid main() {\n    int sum =\n        get(vec2(-1.0, -1.0)) +\n        get(vec2(-1.0,  0.0)) +\n        get(vec2(-1.0,  1.0)) +\n        get(vec2( 0.0, -1.0)) +\n        get(vec2( 0.0,  1.0)) +\n        get(vec2( 1.0, -1.0)) +\n        get(vec2( 1.0,  0.0)) +\n        get(vec2( 1.0,  1.0));\n    if (sum == 3) {\n        gl_FragColor = vec4(1.0, 0.9, 0, 0.25);\n    } else if (sum == 2) {\n        float current = float(get(vec2(0.0, 0.0)));\n        gl_FragColor = vec4(current, current, current, 1.0);\n    } else {\n        gl_FragColor = vec4(0.1, 0.1, 0.25, 0.2);\n    }\n}\n")},this.buffers={quad:r.array(f.QUAD2)},this.textures={front:r.texture(null,n.RGBA,n.REPEAT,n.NEAREST).blank(this.statesize[0],this.statesize[1]),back:r.texture(null,n.RGBA,n.REPEAT,n.NEAREST).blank(this.statesize[0],this.statesize[1])},this.framebuffers={step:r.framebuffer()},this.setRandom()}));c.now=function(){return Math.floor(Date.now()/1e3)},c.compact=function(t){for(var e=new Uint8Array(t.length/8),i=0;i<t.length;i++){var r=Math.floor(i/8),n=i%8,o=t[i]?1:0;e[r]|=o<<n}return e.buffer},c.expand=function(t){for(var e=new Uint8Array(t),r=new Uint8Array(8*e.length),i=0;i<r.length;i++){var n=Math.floor(i/8),o=i%8;r[i]=e[n]>>o&1}return r},c.prototype.set=function(t){for(var e=new Uint8Array(this.statesize[0]*this.statesize[1]*4),i=0;i<t.length;i++){var r=4*i;e[r+0]=e[r+1]=e[r+2]=t[i]?255:0,e[r+3]=255}return this.textures.front.subset(e,0,0,this.statesize[0],this.statesize[1]),this},c.prototype.setRandom=function(p){var t=this.statesize[0]*this.statesize[1];p=null==p?.5:p;for(var e=new Uint8Array(t),i=0;i<t;i++)e[i]=Math.random()<p?1:0;return this.set(e),this},c.prototype.setEmpty=function(){return this.set(new Uint8Array(this.statesize[0]*this.statesize[1])),this},c.prototype.swap=function(){var t=this.textures.front;return this.textures.front=this.textures.back,this.textures.back=t,this},c.prototype.step=function(){c.now()!==this.lasttick?(this.lasttick=c.now(),this.fps=0):this.fps++;var t=this.igloo.gl;return this.framebuffers.step.attach(this.textures.back),this.textures.front.bind(0),t.viewport(0,0,this.statesize[0],this.statesize[1]),this.programs.gol.use().attrib("quad",this.buffers.quad,2).uniformi("state",0).uniform("scale",this.statesize).draw(t.TRIANGLE_STRIP,4),this.swap(),this},c.prototype.draw=function(){var t=this.igloo.gl;return this.igloo.defaultFramebuffer.bind(),this.textures.front.bind(0),t.viewport(0,0,this.viewsize[0],this.viewsize[1]),this.programs.copy.use().attrib("quad",this.buffers.quad,2).uniformi("state",0).uniform("scale",this.viewsize).draw(t.TRIANGLE_STRIP,4),this},c.prototype.poke=function(t,e,r){var n=255*r;return this.textures.front.subset([n,n,n,255],t,e,1,1),this},c.prototype.get=function(){var t=this.igloo.gl,e=this.statesize[0],r=this.statesize[1];this.framebuffers.step.attach(this.textures.front);var n=new Uint8Array(e*r*4);t.readPixels(0,0,e,r,t.RGBA,t.UNSIGNED_BYTE,n);for(var o=new Uint8Array(e*r),i=0;i<e*r;i++)o[i]=n[4*i]>128?1:0;return o},c.prototype.start=function(){return null==this.timer&&(this.timer=setInterval((function(){d.step(),d.draw()}),60)),this},c.prototype.stop=function(){return clearInterval(this.timer),this.timer=null,this},c.prototype.toggle=function(){null==this.timer?this.start():this.stop()},c.prototype.eventCoord=function(t){var e=t.target,r=e.offset(),n=t.pageX-r.left-1,o=e.height()-(t.pageY-r.top-1);return[Math.floor(n/this.scale),Math.floor(o/this.scale)]};var d=null,v=function(canvas,t){d=new c(canvas,t).draw().start()},m=n.a.extend({name:"DefaultLayout",mounted:function(){v(this.$refs.canvas)}}),y=(r(295),r(41)),component=Object(y.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("canvas",{ref:"canvas",staticClass:"canvas",attrs:{width:"1024",height:"512"}}),t._v(" "),r("div",{staticClass:"main_content"},[r("nav-header"),t._v(" "),r("main",[r("section",[r("Nuxt")],1)]),t._v(" "),t._m(0)],1)])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("footer",[r("hr"),t._v("\n      This site is under\n      "),r("a",{attrs:{href:"https://www.gnu.org/licenses/agpl-3.0.en.html"}},[t._v("GNU Affero General Public License")]),t._v(".\n      So here is the "),r("a",{attrs:{href:"https://github.com/NewPirateOfUASeas/portfolio/tree/master"}},[t._v("source code")]),t._v(".\n    ")])}],!1,null,null,null);e.a=component.exports;installComponents(component,{NavHeader:r(308).default})},209:function(t,e,r){r(210),t.exports=r(211)},295:function(t,e,r){"use strict";r(187)},296:function(t,e,r){var n=r(74)(!1);n.push([t.i,":root{--background:rgba(45,43,85,0.66667);--background-dark:#1e1e3f;--foreground:#bdb2fc;--anchors:#4d21fc;--visited-anchor:#b362ff;--contrast:#fad000;--contrast-lite:#ffee80;--contrast-lite-2:#faefa5;--definitions:#fb94ff;--inversion-for-dark-icons:invert(73%) sepia(27%) saturate(6659%) hue-rotate(359deg) brightness(106%) contrast(105%)}h1,h2,h3{color:#fb94ff;color:var(--definitions)}a{color:#4d21fc;color:var(--anchors)}*{color:#bdb2fc;color:var(--foreground);font-family:sans-serif}a:visited{color:#b362ff;color:var(--visited-anchor)}body{margin:0;background-color:rgba(45,43,85,.66667)!important;background-color:var(--background)!important}html{font-size:16px}.canvas{width:100vw;height:100vh;position:fixed;z-index:0}.main_content{width:100vw;min-height:100vh;background-color:rgba(45,43,85,.66667);background-color:var(--background);position:absolute;z-index:1;top:0}footer,section{padding-left:20vmin;padding-right:20vmin}@media (prefers-contrast:more),(prefers-reduced-motion:reduce){.canvas{display:none}}@media (prefers-contrast:more){:root{--background:#2d2b55}}@media screen and (max-width:768px){footer,section{padding-left:0;padding-right:0;font-size:1.3rem}}",""]),t.exports=n},297:function(t,e,r){"use strict";r(188)},298:function(t,e,r){var n=r(74)(!1);n.push([t.i,"a[data-v-0e032eaa]{text-decoration:none;color:#fff}li[data-v-0e032eaa]{list-style:none}.navbar[data-v-0e032eaa]{display:flex;align-items:center;justify-content:center;background-color:var(--background)}.menu[data-v-0e032eaa]{display:flex;grid-gap:1em;gap:1em;font-size:1.25rem;z-index:2}.menu a[data-v-0e032eaa]:hover{background-color:var(--background-dark);border-radius:.5rem}.menu a[data-v-0e032eaa]{padding:.5rem 1rem}.services[data-v-0e032eaa]{position:relative}.dropdown[data-v-0e032eaa]{background-color:var(--background-dark);position:absolute;display:none;top:1.2rem}.dropdown li+li[data-v-0e032eaa]{margin-top:1rem}.services:hover .dropdown[data-v-0e032eaa]{display:block}.hamburger[data-v-0e032eaa],input[type=checkbox][data-v-0e032eaa]{display:none}.hamburger[data-v-0e032eaa]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}li a[data-v-0e032eaa]:hover{background-color:var(--background-dark);color:var(--contrast)}a.nuxt-link-exact-active[data-v-0e032eaa]{color:var(--contrast-lite)}header[data-v-0e032eaa]{max-width:1000px;margin:0 auto}@media (max-width:768px){.menu[data-v-0e032eaa]{display:none;position:absolute;background-color:var(--background);right:0;left:0;text-align:center;padding:1rem 0;margin-top:0}.menu li+li[data-v-0e032eaa]{margin-top:1rem}.hamburger[data-v-0e032eaa],input[type=checkbox]:checked~.menu[data-v-0e032eaa]{display:block}.hamburger[data-v-0e032eaa]{font-size:2rem;padding-left:1rem}.dropdown[data-v-0e032eaa]{left:50%;top:1rem}.menu li a[data-v-0e032eaa]{padding-top:1rem;padding-bottom:1rem;display:block;width:100%}.navbar[data-v-0e032eaa]{justify-content:space-between}}",""]),t.exports=n},308:function(t,e,r){"use strict";r.r(e);r(297);var n=r(41),component=Object(n.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("nav",{staticClass:"navbar"},[r("div",{staticClass:"nav-links"},[r("input",{attrs:{id:"checkbox_toggle",type:"checkbox"}}),t._v(" "),r("label",{staticClass:"hamburger",attrs:{for:"checkbox_toggle"}},[t._v("☰")]),t._v(" "),r("ul",{staticClass:"menu"},[r("li",[r("nuxt-link",{attrs:{to:"/"}},[t._v("\n          About me / Contacts\n        ")])],1),t._v(" "),r("li",[r("nuxt-link",{attrs:{to:"/project-list"}},[t._v("\n          Projects demo\n        ")])],1),t._v(" "),t._m(0),t._v(" "),r("li",[r("nuxt-link",{attrs:{to:"/credits"}},[t._v("\n          Credits\n        ")])],1),t._v(" "),r("li",[r("nuxt-link",{attrs:{to:"/blog"}},[t._v("\n          Blog\n        ")])],1)])])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",[r("a",{attrs:{href:"https://github.com/NewPirateOfUASeas"}},[t._v(" Git ")])])}],!1,null,"0e032eaa",null);e.default=component.exports}},[[209,9,1,10]]]);