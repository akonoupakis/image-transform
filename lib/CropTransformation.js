var ImageTransformation = require('./ImageTransformation.js')
var easyimg = require('easyimage')
var jsonValidation = require('json-validation')

/**
 * The CropTransformation class.
 * @constructor
 * @extends ImageTransformation

 * @param {object} options - The crop transformation options
 * @param {number} options.x - The crop start position on the x axis
 * @param {number} options.y - The crop start position on the y axis
 * @param {number} options.width - The width to crop
 * @param {number} options.height - The height to crop
 */
var CropTransformation = function (options) {
  var validator = new jsonValidation.JSONValidation()

  var validationResult = validator.validate(options, {
    type: 'object',
    properties: {
      x: { type: 'number', required: true },
      y: { type: 'number', required: true },
      width: { type: 'number', required: true },
      height: { type: 'number', required: true }
    }
  })

  if (!validationResult.ok) {
    throw new Error(validationResult.errors + ' at ' + validationResult.path)
  }

  ImageTransformation.apply(this, arguments)

  this.type = 'crop'
}
CropTransformation.prototype = Object.create(ImageTransformation.prototype)

CropTransformation.prototype.process = function (source, target, cb) {
  var opts = {}
  opts.src = source
  opts.dst = target
  opts.x = this.options.x
  opts.y = this.options.y
  opts.cropwidth = this.options.width
  opts.cropheight = this.options.height
  opts.gravity = 'NorthWest'

  easyimg.crop(opts).then(function (image) {
    cb(null, image)
  }, function (err) {
    cb(err)
  })
}

module.exports = CropTransformation
