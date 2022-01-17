/**
 * @version 0.1.2
 */

/**
 * Wrap WebGLRenderingContext objects with useful behavior.
 * @param {WebGLRenderingContext|HTMLCanvasElement} gl
 * @param {Object} [options] to pass to getContext()
 * @returns {Igloo}
 * @namespace
 */
function Igloo (gl, options) {
  let canvas
  if (gl instanceof HTMLCanvasElement) {
    canvas = gl
    gl = Igloo.getContext(gl, options)
  } else {
    canvas = gl.canvas
  }
  this.gl = gl
  this.canvas = canvas
  this.defaultFramebuffer = new Igloo.Framebuffer(gl, null)
}

/**
 * To be used in a vec2 GL_TRIANGLE_STRIP draw.
 * @type {Float32Array}
 * @constant
 */
Igloo.QUAD2 = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])

/**
 * Asynchronously or synchronously fetch data from the server.
 * @param {string} url
 * @param {Function} [callback] if provided, call is asynchronous
 * @returns {string}
 */
Igloo.fetch = function (url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, Boolean(callback))
  if (callback != null) {
    xhr.onload = function () {
      callback(xhr.responseText)
    }
  }
  xhr.send()
  return xhr.responseText
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {Object} [options] to pass to getContext()
 * @param {boolean} [noerror] If true, return null instead of throwing
 * @returns {?WebGLRenderingContext} a WebGL rendering context.
 */
Igloo.getContext = function (canvas, options, noerror) {
  let gl
  try {
    gl = canvas.getContext('webgl', options || {}) ||
            canvas.getContext('experimental-webgl', options || {})
  } catch (e) {
    gl = null
  }
  if (gl == null && !noerror) {
    throw new Error('Could not create WebGL context.')
  } else {
    return gl
  }
}

/**
 * @param {string} string
 * @returns {boolean} True if the string looks like a URL
 */
Igloo.looksLikeURL = function (string) {
  return /\s/.exec(string) == null
}

/**
 * @param {*} object
 * @returns {boolean} true if object is an array or typed array
 */
Igloo.isArray = function (object) {
  const name = Object.prototype.toString.apply(object, [])
  const re = / (Float(32|64)|Int(16|32|8)|Uint(16|32|8(Clamped)?))?Array]$/
  return re.exec(name) != null
}

/**
 * Creates a program from a program configuration.
 *
 * @param {string} vertex URL or source of the vertex shader
 * @param {string} fragment URL or source of the fragment shader
 * @param {Function} [transform] Transforms the shaders before compilation
 * @returns {Igloo.Program}
 */
Igloo.prototype.program = function (vertex, fragment, transform) {
  if (Igloo.looksLikeURL(vertex)) { vertex = Igloo.fetch(vertex) }
  if (Igloo.looksLikeURL(fragment)) { fragment = Igloo.fetch(fragment) }
  if (transform != null) {
    vertex = transform(vertex)
    fragment = transform(fragment)
  }
  return new Igloo.Program(this.gl, vertex, fragment)
}

/**
 * Create a new GL_ARRAY_BUFFER with optional data.
 * @param {ArrayBuffer|ArrayBufferView} [data]
 * @param {GLenum} [usage]
 * @returns {Igloo.Buffer}
 */
Igloo.prototype.array = function (data, usage) {
  const gl = this.gl
  const buffer = new Igloo.Buffer(gl, gl.ARRAY_BUFFER)
  if (data != null) {
    buffer.update(data, usage == null ? gl.STATIC_DRAW : usage)
  }
  return buffer
}

/**
 * Create a new GL_ELEMENT_ARRAY_BUFFER with optional data.
 * @param {ArrayBuffer|ArrayBufferView} [data]
 * @param {GLenum} [usage]
 * @returns {Igloo.Buffer}
 */
Igloo.prototype.elements = function (data, usage) {
  const gl = this.gl
  const buffer = new Igloo.Buffer(gl, gl.ELEMENT_ARRAY_BUFFER)
  if (data != null) {
    buffer.update(data, usage == null ? gl.STATIC_DRAW : usage)
  }
  return buffer
}

/**
 * @param {TexImageSource} [source]
 * @param {GLenum} [format=GL_RGBA]
 * @param {GLenum} [wrap=GL_CLAMP_TO_EDGE]
 * @param {GLenum} [filter=GL_LINEAR]
 * @param {GLenum} [type=UNSIGNED_BYTE]
 * @returns {Igloo.Texture}
 */
Igloo.prototype.texture = function (source, format, wrap, filter, type) {
  const texture = new Igloo.Texture(this.gl, format, wrap, filter, type)
  if (source != null) {
    texture.set(source)
  }
  return texture
}

/**
 * @param {Igloo.Texture} [texture]
 * @returns {Igloo.Framebuffer}
 */
Igloo.prototype.framebuffer = function (texture) {
  const framebuffer = new Igloo.Framebuffer(this.gl)
  if (texture != null) { framebuffer.attach(texture) }
  return framebuffer
}

/**
 * Fluent WebGLProgram wrapper for managing variables and data. The
 * constructor compiles and links a program from a pair of shaders.
 * Throws an exception if compiling or linking fails.
 * @param {WebGLRenderingContext} gl
 * @param {string} vertex Shader source
 * @param {string} fragment Shader source
 * @constructor
 */
Igloo.Program = function (gl, vertex, fragment) {
  this.gl = gl
  this.debug = false
  const p = this.program = gl.createProgram()
  gl.attachShader(p, this.makeShader(gl.VERTEX_SHADER, vertex))
  gl.attachShader(p, this.makeShader(gl.FRAGMENT_SHADER, fragment))
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(p))
  }
  this.vars = {}
}

/**
 * Compile a shader from source.
 * @param {number} type
 * @param {string} source
 * @returns {WebGLShader}
 */
Igloo.Program.prototype.makeShader = function (type, source) {
  const gl = this.gl
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader
  } else {
    throw new Error(gl.getShaderInfoLog(shader))
  }
}

/**
 * Tell WebGL to use this program right now.
 * @returns {Igloo.Program} this
 */
Igloo.Program.prototype.use = function () {
  this.gl.useProgram(this.program)
  return this
}

/**
 * Declare/set a uniform or set a uniform's data.
 * @param {string} name uniform variable name
 * @param {number|Array|ArrayBufferView} [value]
 * @param {boolean} [i] if true use the integer version
 * @returns {Igloo.Program} this
 */
Igloo.Program.prototype.uniform = function (name, value, i) {
  if (value == null) {
    this.vars[name] = this.gl.getUniformLocation(this.program, name)
  } else {
    if (this.vars[name] == null) { this.uniform(name) }
    const v = this.vars[name]
    if (Igloo.isArray(value)) {
      const method = 'uniform' + value.length + (i ? 'i' : 'f') + 'v'
      this.gl[method](v, value)
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      if (i) {
        this.gl.uniform1i(v, value)
      } else {
        this.gl.uniform1f(v, value)
      }
    } else {
      throw new TypeError('Invalid uniform value: ' + value)
    }
  }
  return this
}

/**
 * Set a uniform's data to a specific matrix.
 * @param {string} name uniform variable name
 * @param {Array|ArrayBufferView} matrix
 * @param {boolean} [transpose=false]
 * @returns {Igloo.Program} this
 */
Igloo.Program.prototype.matrix = function (name, matrix, transpose) {
  if (this.vars[name] == null) { this.uniform(name) }
  const method = 'uniformMatrix' + Math.sqrt(matrix.length) + 'fv'
  this.gl[method](this.vars[name], Boolean(transpose), matrix)
  return this
}

/**
 * Like the uniform() method, but using integers.
 * @returns {Igloo.Program} this
 */
Igloo.Program.prototype.uniformi = function (name, value) {
  return this.uniform(name, value, true)
}

/**
 * Declare an attrib or set an attrib's buffer.
 * @param {string} name attrib variable name
 * @param {WebGLBuffer} [value]
 * @param {number} [size] element size (required if value is provided)
 * @param {number} [stride=0]
 * @returns {Igloo.Program} this
 */
Igloo.Program.prototype.attrib = function (name, value, size, stride) {
  const gl = this.gl
  if (value == null) {
    this.vars[name] = gl.getAttribLocation(this.program, name)
  } else {
    if (this.vars[name] == null) { this.attrib(name) } // get location
    value.bind()
    gl.enableVertexAttribArray(this.vars[name])
    gl.vertexAttribPointer(this.vars[name], size, gl.FLOAT,
      false, stride == null ? 0 : stride, 0)
  }
  return this
}

/**
 * Call glDrawArrays or glDrawElements with this program.
 *
 * If the debug property is set to true on this Igloo.Program object,
 * getError() is called immediately after the draw to check for
 * errors.
 * @param {number} mode
 * @param {number} count the number of vertex attribs to render
 * @param {GLenum} [type] use glDrawElements of this type
 * @returns {Igloo.Program} this
 */
Igloo.Program.prototype.draw = function (mode, count, type) {
  const gl = this.gl
  if (type == null) {
    gl.drawArrays(mode, 0, count)
  } else {
    gl.drawElements(mode, count, type, 0)
  }
  if (this.debug && gl.getError() !== gl.NO_ERROR) {
    throw new Error('WebGL rendering error')
  }
  return this
}

/**
 * Disables all attribs from this program.
 * @returns {Igloo.Program} this
 */
Igloo.Program.prototype.disable = function () {
  for (const attrib in this.vars) {
    const location = this.vars[attrib]
    if (Object.prototype.hasOwnProperty.call(this.vars, attrib)) {
      if (typeof location === 'number') {
        this.gl.disableVertexAttribArray(location)
      }
    }
  }
  return this
}

/**
 * Fluent WebGLBuffer wrapper.
 * @param {WebGLRenderingContext} gl
 * @param {GLenum} [target] either GL_ARRAY_BUFFER or GL_ELEMENT_ARRAY_BUFFER
 * @returns {WebGLProgram}
 * @constructor
 */
Igloo.Buffer = function (gl, target) {
  this.gl = gl
  this.buffer = gl.createBuffer()
  this.target = (target == null ? gl.ARRAY_BUFFER : target)
  this.size = -1
}

/**
 * Binds this buffer to ARRAY_BUFFER.
 * @returns {Igloo.Buffer} this
 */
Igloo.Buffer.prototype.bind = function () {
  this.gl.bindBuffer(this.target, this.buffer)
  return this
}

/**
 * @param
 * @param {ArrayBuffer|ArrayBufferView} data
 * @param {GLenum} [usage]
 * @returns {Igloo.Buffer} this
 */
Igloo.Buffer.prototype.update = function (data, usage) {
  const gl = this.gl
  if (data instanceof Array) {
    data = new Float32Array(data)
  }
  usage = usage == null ? gl.DYNAMIC_DRAW : usage
  this.bind()
  if (this.size !== data.byteLength) {
    gl.bufferData(this.target, data, usage)
    this.size = data.byteLength
  } else {
    gl.bufferSubData(this.target, 0, data)
  }
  return this
}

/**
 * Create a new texture, optionally filled blank.
 * @param {WebGLRenderingContext} gl
 * @param {GLenum} [format=GL_RGBA]
 * @param {GLenum} [wrap=GL_CLAMP_TO_EDGE]
 * @param {GLenum} [filter=GL_LINEAR]
 * @param {GLenum} [type=UNSIGNED_BYTE]
 * @returns {Igloo.Texture}
 */
Igloo.Texture = function (gl, format, wrap, filter, type) {
  this.gl = gl
  const texture = this.texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  wrap = wrap == null ? gl.CLAMP_TO_EDGE : wrap
  filter = filter == null ? gl.LINEAR : filter
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)
  this.format = format == null ? gl.RGBA : format
  this.type = type == null ? gl.UNSIGNED_BYTE : type
}

/**
 * @param {number} [unit] active texture unit to bind
 * @returns {Igloo.Texture}
 */
Igloo.Texture.prototype.bind = function (unit) {
  const gl = this.gl
  if (unit != null) {
    gl.activeTexture(gl.TEXTURE0 + unit)
  }
  gl.bindTexture(gl.TEXTURE_2D, this.texture)
  return this
}

/**
 * Set texture to particular size, filled with vec4(0, 0, 0, 1).
 * @param {number} width
 * @param {number} height
 * @returns {Igloo.Texture}
 */
Igloo.Texture.prototype.blank = function (width, height) {
  const gl = this.gl
  this.bind()
  gl.texImage2D(gl.TEXTURE_2D, 0, this.format, width, height,
    0, this.format, this.type, null)
  return this
}

/**
 * Set the texture to a particular image.
 * @param {Array|ArrayBufferView|TexImageSource} source
 * @param {number} [width]
 * @param {number} [height]
 * @returns {Igloo.Texture}
 */
Igloo.Texture.prototype.set = function (source, width, height) {
  const gl = this.gl
  this.bind()
  if (source instanceof Array) {
    if (this.type === gl.FLOAT) {
      source = new Float32Array(source)
    } else {
      source = new Uint8Array(source)
    }
  }
  if (width != null || height != null) {
    gl.texImage2D(gl.TEXTURE_2D, 0, this.format,
      width, height, 0, this.format,
      this.type, source)
  } else {
    gl.texImage2D(gl.TEXTURE_2D, 0, this.format,
      this.format, this.type, source)
  }
  return this
}

/**
 * Set part of the texture to a particular image.
 * @param {Array|ArrayBufferView|TexImageSource} source
 * @param {number} xoff
 * @param {number} yoff
 * @param {number} [width]
 * @param {number} [height]
 * @returns {Igloo.Texture}
 */
Igloo.Texture.prototype.subset = function (source, xoff, yoff, width, height) {
  const gl = this.gl
  this.bind()
  if (source instanceof Array) {
    if (this.type === gl.FLOAT) {
      source = new Float32Array(source)
    } else {
      source = new Uint8Array(source)
    }
  }
  if (width != null || height != null) {
    gl.texSubImage2D(gl.TEXTURE_2D, 0, xoff, yoff,
      width, height,
      this.format, this.type, source)
  } else {
    gl.texSubImage2D(gl.TEXTURE_2D, 0, xoff, yoff,
      this.format, this.type, source)
  }
  return this
}

/**
 * Copy part/all of the current framebuffer to this image.
 * @param {Array|ArrayBufferView|TexImageSource} source
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @returns {Igloo.Texture}
 */
Igloo.Texture.prototype.copy = function (x, y, width, height) {
  const gl = this.gl
  gl.copyTexImage2D(gl.TEXTURE_2D, 0, this.format, x, y, width, height, 0)
  return this
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {WebGLFramebuffer} [framebuffer] to be wrapped (null for default)
 * @returns {Igloo.Framebuffer}
 */
Igloo.Framebuffer = function (gl, framebuffer) {
  this.gl = gl
  this.framebuffer =
        arguments.length === 2 ? framebuffer : gl.createFramebuffer()
  this.renderbuffer = null
}

/**
 * @returns {Igloo.Framebuffer}
 */
Igloo.Framebuffer.prototype.bind = function () {
  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer)
  return this
}

/**
 * @returns {Igloo.Framebuffer}
 */
Igloo.Framebuffer.prototype.unbind = function () {
  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)
  return this
}

/**
 * @param {Igloo.Texture} texture
 * @returns {Igloo.Framebuffer}
 */
Igloo.Framebuffer.prototype.attach = function (texture) {
  const gl = this.gl
  this.bind()
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D, texture.texture, 0)
  return this
}

/**
 * Attach a renderbuffer as a depth buffer for depth-tested rendering.
 * @param {number} width
 * @param {number} height
 * @returns {Igloo.Framebuffer}
 */
Igloo.Framebuffer.prototype.attachDepth = function (width, height) {
  const gl = this.gl
  this.bind()
  if (this.renderbuffer == null) {
    this.renderbuffer = gl.createRenderbuffer()
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16,
      width, height)
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER, this.renderbuffer)
  }
  return this
}

const quadvert = `#ifdef GL_ES
precision mediump float;
#endif

attribute vec2 quad;

void main() {
    gl_Position = vec4(quad, 0, 1.0);
}
`
const copyfrag = `#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

void main() {
    gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);
}`

const golfrag = `#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
}

void main() {
    int sum =
        get(vec2(-1.0, -1.0)) +
        get(vec2(-1.0,  0.0)) +
        get(vec2(-1.0,  1.0)) +
        get(vec2( 0.0, -1.0)) +
        get(vec2( 0.0,  1.0)) +
        get(vec2( 1.0, -1.0)) +
        get(vec2( 1.0,  0.0)) +
        get(vec2( 1.0,  1.0));
    if (sum == 3) {
        gl_FragColor = vec4(1.0, 0.9, 0, 0.25);
    } else if (sum == 2) {
        float current = float(get(vec2(0.0, 0.0)));
        gl_FragColor = vec4(current, current, current, 1.0);
    } else {
        gl_FragColor = vec4(0.1, 0.1, 0.25, 0.2);
    }
}
`
/**
 * Game of Life simulation and display.
 * @param {HTMLCanvasElement} canvas Render target
 * @param {number} [scale] Size of each cell in pixels (power of 2)
 */

class GOL {
  constructor (canvas, scale) {
    const igloo = this.igloo = new Igloo(canvas)
    const gl = igloo.gl
    if (gl == null) {
      alert('Could not initialize WebGL!')
      throw new Error('No WebGL')
    }
    scale = this.scale = scale || 4
    const w = canvas.width; const h = canvas.height
    this.viewsize = new Float32Array([w, h])
    this.statesize = new Float32Array([w / scale, h / scale])
    this.timer = null
    this.lasttick = GOL.now()
    this.fps = 0

    gl.disable(gl.DEPTH_TEST)
    this.programs = {
      copy: igloo.program(quadvert, copyfrag),
      gol: igloo.program(quadvert, golfrag)
    }
    this.buffers = {
      quad: igloo.array(Igloo.QUAD2)
    }
    this.textures = {
      front: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
        .blank(this.statesize[0], this.statesize[1]),
      back: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
        .blank(this.statesize[0], this.statesize[1])
    }
    this.framebuffers = {
      step: igloo.framebuffer()
    }
    this.setRandom()
  }
}

/**
 * @returns {number} The epoch in integer seconds
 */
GOL.now = function () {
  return Math.floor(Date.now() / 1000)
}

/**
 * Compact a simulation state into a bit array.
 * @param {Object} state Array-like state object
 * @returns {ArrayBuffer} Compacted bit array
 */
GOL.compact = function (state) {
  const compact = new Uint8Array(state.length / 8)
  for (let i = 0; i < state.length; i++) {
    const ii = Math.floor(i / 8)
    const shift = i % 8
    const bit = state[i] ? 1 : 0
    compact[ii] |= bit << shift
  }
  return compact.buffer
}

/**
 * Expand a simulation state from a bit array.
 * @param {ArrayBuffer} compact Compacted bit array
 * @returns {Object} Array-like state object
 */
GOL.expand = function (buffer) {
  const compact = new Uint8Array(buffer)
  const state = new Uint8Array(compact.length * 8)
  for (let i = 0; i < state.length; i++) {
    const ii = Math.floor(i / 8)
    const shift = i % 8
    state[i] = (compact[ii] >> shift) & 1
  }
  return state
}

/**
 * Set the entire simulation state at once.
 * @param {Object} state Boolean array-like
 * @returns {GOL} this
 */
GOL.prototype.set = function (state) {
  const rgba = new Uint8Array(this.statesize[0] * this.statesize[1] * 4)
  for (let i = 0; i < state.length; i++) {
    const ii = i * 4
    rgba[ii + 0] = rgba[ii + 1] = rgba[ii + 2] = state[i] ? 255 : 0
    rgba[ii + 3] = 255
  }
  this.textures.front.subset(rgba, 0, 0, this.statesize[0], this.statesize[1])
  return this
}

/**
 * Fill the entire state with random values.
 * @param {number} [p] Chance of a cell being alive (0.0 to 1.0)
 * @returns {GOL} this
 */
GOL.prototype.setRandom = function (p) {
  const size = this.statesize[0] * this.statesize[1]
  p = p == null ? 0.5 : p
  const rand = new Uint8Array(size)
  for (let i = 0; i < size; i++) {
    rand[i] = Math.random() < p ? 1 : 0
  }
  this.set(rand)
  return this
}

/**
 * Clear the simulation state to empty.
 * @returns {GOL} this
 */
GOL.prototype.setEmpty = function () {
  this.set(new Uint8Array(this.statesize[0] * this.statesize[1]))
  return this
}

/**
 * Swap the texture buffers.
 * @returns {GOL} this
 */
GOL.prototype.swap = function () {
  const tmp = this.textures.front
  this.textures.front = this.textures.back
  this.textures.back = tmp
  return this
}

/**
 * Step the Game of Life state on the GPU without rendering anything.
 * @returns {GOL} this
 */
GOL.prototype.step = function () {
  if (GOL.now() !== this.lasttick) {
    this.lasttick = GOL.now()
    this.fps = 0
  } else {
    this.fps++
  }
  const gl = this.igloo.gl
  this.framebuffers.step.attach(this.textures.back)
  this.textures.front.bind(0)
  gl.viewport(0, 0, this.statesize[0], this.statesize[1])
  this.programs.gol.use()
    .attrib('quad', this.buffers.quad, 2)
    .uniformi('state', 0)
    .uniform('scale', this.statesize)
    .draw(gl.TRIANGLE_STRIP, 4)
  this.swap()
  return this
}

/**
 * Render the Game of Life state stored on the GPU.
 * @returns {GOL} this
 */
GOL.prototype.draw = function () {
  const gl = this.igloo.gl
  this.igloo.defaultFramebuffer.bind()
  this.textures.front.bind(0)
  gl.viewport(0, 0, this.viewsize[0], this.viewsize[1])
  this.programs.copy.use()
    .attrib('quad', this.buffers.quad, 2)
    .uniformi('state', 0)
    .uniform('scale', this.viewsize)
    .draw(gl.TRIANGLE_STRIP, 4)
  return this
}

/**
 * Set the state at a specific position.
 * @param {number} x
 * @param {number} y
 * @param {boolean} state True/false for live/dead
 * @returns {GOL} this
 */
GOL.prototype.poke = function (x, y, state) {
  const v = state * 255
  this.textures.front.subset([v, v, v, 255], x, y, 1, 1)
  return this
}

/**
 * @returns {Object} Boolean array-like of the simulation state
 */
GOL.prototype.get = function () {
  const gl = this.igloo.gl; const w = this.statesize[0]; const h = this.statesize[1]
  this.framebuffers.step.attach(this.textures.front)
  const rgba = new Uint8Array(w * h * 4)
  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgba)
  const state = new Uint8Array(w * h)
  for (let i = 0; i < w * h; i++) {
    state[i] = rgba[i * 4] > 128 ? 1 : 0
  }
  return state
}

/**
 * Run the simulation automatically on a timer.
 * @returns {GOL} this
 */
GOL.prototype.start = function () {
  if (this.timer == null) {
    this.timer = setInterval(function () {
      gol.step()
      gol.draw()
    }, 60)
  }
  return this
}

/**
 * Stop animating the simulation.
 * @returns {GOL} this
 */
GOL.prototype.stop = function () {
  clearInterval(this.timer)
  this.timer = null
  return this
}

/**
 * Toggle the animation state.
 * @returns {GOL} this
 */
GOL.prototype.toggle = function () {
  if (this.timer == null) {
    this.start()
  } else {
    this.stop()
  }
}

/**
 * Find simulation coordinates for event.
 * This is a workaround for Firefox bug #69787 and jQuery bug #8523.
 * @returns {Array} target-relative offset
 */
GOL.prototype.eventCoord = function (event) {
  const target = event.target
  const offset = target.offset()
  const border = 1
  const x = event.pageX - offset.left - border
  const y = target.height() - (event.pageY - offset.top - border)
  return [Math.floor(x / this.scale), Math.floor(y / this.scale)]
}

/**
 * Manages the user interface for a simulation.
 */

/* Initialize everything. */
let gol = null

/**
 * Game of Life simulation and display.
 * @param {HTMLCanvasElement} canvas Render target
 * @param {number} [scale] Size of each cell in pixels (power of 2)
 */

const init = (canvas, scale) => {
  gol = new GOL(canvas, scale).draw().start()
}

export default init
