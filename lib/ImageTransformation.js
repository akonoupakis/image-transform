/**
 * The ImageTransformation base class.
 * @class
 * @abstract
 */
var ImageTransformation = function (options) {
  this.type = ''
  this.options = options
}

/**
 * Transforms to target

 * @param {string} source - The source file path
 * @param {string} target - The target file path
 * @param {ImageTransformation~processCallback} cb - The callback function
 */
ImageTransformation.prototype.process = function (source, target, cb) {
  /**
  * @callback ImageTransformation~processCallback
  * @param {Error} err - The error occured
  * @param {ImageInfo} res - The transformed resultInfo
  */

  throw new Error('transformation not implemented')
}

module.exports = ImageTransformation

/**
 * @typedef {Object} ImageInfo
 * @property {number} width - The image width
 * @property {number} height - The image height
 */
