var ImageTransformation = require('./ImageTransformation.js')
var easyimg = require('easyimage')
var jsonValidation = require('json-validation')

/**
 * The StretchImageTransformation class.
 * @constructor
 * @extends ImageTransformation

 * @param {object} options - The stretch transformation options
 * @param {number} options.width - The width to stretch
 * @param {number} options.height - The height to stretch
 */
var StretchImageTransformation = function (options) {
  var validator = new jsonValidation.JSONValidation()

  var validationResult = validator.validate(options, {
    type: 'object',
    properties: {
      width: { type: 'number', required: true },
      height: { type: 'number', required: true }
    }
  })

  if (!validationResult.ok) {
    throw new Error(validationResult.errors + ' at ' + validationResult.path)
  }

  ImageTransformation.apply(this, arguments)

  this.type = 'stretch'
}
StretchImageTransformation.prototype = Object.create(ImageTransformation.prototype)

StretchImageTransformation.prototype.process = function (source, target, cb) {
  ImageTransformation.prototype.process.apply(this, arguments)

  var opts = {}
  opts.src = source
  opts.dst = target
  opts.width = this.options.width
  opts.height = this.options.height
  opts.x = 0
  opts.y = 0
  opts.cropwidth = this.options.width
  opts.cropheight = this.options.height
  opts.gravity = 'Center'
  opts.fill = true

  easyimg.rescrop(opts).then(function (image) {
    cb(null, image)
  }, function (err) {
    cb(err)
  })
}

module.exports = StretchImageTransformation
