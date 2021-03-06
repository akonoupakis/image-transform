var fs = require('fs')
var easyimg = require('easyimage')
var md5 = require('md5')
var path = require('path')

var CropTransformation = require('./CropTransformation.js')
var StretchTransformation = require('./StretchTransformation.js')
var FitTransformation = require('./FitTransformation.js')

var _ = require('underscore')

/**
 * The ImageTransformer class.
 * @constructor

 * @param {object} options - The options
 * @param {string} options.path - The path to store temporary files
 */
var ImageTransformer = function (options) {
  this.tempPath = (options || {}).path || './temp'
}

/**
 * Get the tranformed image result.

 * @param {string} src - The source image path
 * @param {ImageTransformation[]} transformations - The transformations to apply. Includes {@link CropTransformation}, {@link StretchTransformation} and {@link FitTransformation}.
 * @param {ImageTransformer~transformCallback} cb - The callback function
 */
ImageTransformer.prototype.transform = function (src, transformations, cb) {
  /**
  * @callback ImageTransformer~transformCallback
  * @param {Exception} err - The exception object
  * @param {object} imageInfo - The image info
  * @param {Image} image - The image
  */

  try {
    var fileKey = md5(JSON.stringify({
      src: src,
      gen: transformations
    }))

    var fileExt = path.extname(src)

    var targetFilePath = src
    var destFilePath = path.join(this.tempPath, fileKey + fileExt)

    fs.exists(destFilePath, function (cbExists) {
      if (cbExists) {
        easyimg.info(destFilePath).then(function (image) {
          fs.readFile(destFilePath, function (readErr, img) {
            if (readErr) {
              return cb(readErr)
            }

            cb(null, image, img)
          })
        }, function (err) {
          cb(err)
        })
      } else {
        var processors = []

        _.each(transformations, function (transformation) {
          if (transformation && transformation.type === 'crop') {
            processors.push(new CropTransformation(transformation.options))
          }
          if (transformation && transformation.type === 'stretch') {
            processors.push(new StretchTransformation(transformation.options))
          }
          if (transformation && transformation.type === 'fit') {
            processors.push(new FitTransformation(transformation.options))
          }
        })

        var imageObj

        var processTransformation = function () {
          var transformation = transformations.shift()

          if (transformation) {
            var processor

            if (transformation && transformation.type === 'crop') {
              processor = new CropTransformation(transformation.options)
            }
            if (transformation && transformation.type === 'stretch') {
              processor = new StretchTransformation(transformation.options)
            }
            if (transformation && transformation.type === 'fit') {
              processor = new FitTransformation(transformation.options)
            }

            if (processor) {
              var fromFilePath = targetFilePath
              var toFilePath = destFilePath

              if (imageObj) {
                fromFilePath = destFilePath
                toFilePath = destFilePath
              }

              processor.process(fromFilePath, toFilePath, function (err, res) {
                if (err) {
                  cb(err)
                } else {
                  imageObj = res

                  processTransformation()
                }
              })
            } else {
              processTransformation()
            }
          } else {
            fs.readFile(destFilePath, function (readErr, img) {
              if (readErr) {
                return cb(readErr)
              }

              return cb(null, imageObj, img)
            })
          }
        }

        processTransformation()
      }
    })
  } catch (err) {
    cb(err)
  }
}

module.exports = ImageTransformer
