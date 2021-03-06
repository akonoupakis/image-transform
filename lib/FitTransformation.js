var ImageTransformation = require('./ImageTransformation.js')
var easyimg = require('easyimage')
var jsonValidation = require('json-validation')

/**
 * The FitTransformation class.
 * @constructor
 * @extends ImageTransformation

 * @param {object} options - The fit transformation options
 * @param {number} options.width - The width to resize
 * @param {number} options.height - The height to resize
 */
var FitTransformation = function (options) {
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

  this.type = 'fit'
}
FitTransformation.prototype = Object.create(ImageTransformation.prototype)

FitTransformation.prototype.process = function (source, target, cb) {
  var opts = {}
  opts.src = source
  opts.dst = target
  opts.width = this.options.width
  opts.height = this.options.height

  easyimg.resize(opts).then(function (image) {
    cb(null, image)
  }, function (err) {
    cb(err)
  })
}

module.exports = FitTransformation
