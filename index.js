var fs = require('fs');
var easyimg = require('easyimage');
var md5 = require('md5');
var path = require('path');

var _ = require('underscore');

var ImageTransformer = function (options) {
    this.tempPath = (options || {}).tmp || './temp';
};

ImageTransformer.prototype.transform = function (src, transformations, cb) {
    try {
        var fileKey = md5(JSON.stringify({
            src: src,
            gen: transformations
        }));

        var fileExt = path.extname(src);

        var targetFilePath = src;
        var destFilePath = path.join(this.tempPath, fileKey + fileExt);

        var ctx = {};

        fs.exists(destFilePath, function (cbExists) {
            if (cbExists) {
                easyimg.info(destFilePath).then(function (image) {
                    fs.readFile(destFilePath, function (readErr, img) {
                        if (readErr) 
                            return cb(readErr);

                        cb(null, image, img);
                    });
                }, function (err) {
                    cb(err);
                });
            }
            else {
                var cropProcessors = [];

                var nextIndex = 0;
                var next = function () {
                    nextIndex++;
                    var processor = cropProcessors[nextIndex];
                    processor.process(ctx, next);
                };

                _.each(transformations, function (processor) {

                    cropProcessors.push({
                        process: function (ctxInternal, nextInternal) {

                            var options = {};

                            var fnName = undefined;
                            if (processor.type === 'crop') {
                                options.x = processor.options.x;
                                options.y = processor.options.y;
                                options.cropwidth = processor.options.width;
                                options.cropheight = processor.options.height;
                                options.gravity = 'NorthWest';

                                fnName = 'crop';
                            }
                            else if (processor.type === 'stretch') {
                                options.width = processor.options.width;
                                options.height = processor.options.height;
                                options.x = 0;
                                options.y = 0;
                                options.cropwidth = processor.options.width;
                                options.cropheight = processor.options.height;
                                options.gravity = 'Center';
                                options.fill = true;

                                fnName = 'rescrop';
                            }
                            else if (processor.type === 'fit') {
                                options.width = processor.options.width;
                                options.height = processor.options.height;

                                fnName = 'resize';
                            }

                            if (fnName) {
                                options.src = targetFilePath;
                                options.dst = destFilePath;

                                if (ctxInternal.imageObj) {
                                    options.src = destFilePath;
                                    options.dst = destFilePath;
                                }

                                easyimg[fnName](options).then(function (image) {
                                    ctxInternal.imageObj = image;
                                    ctxInternal.imageDst = destFilePath;

                                    nextInternal();
                                }, function (err) {
                                    return cb(err);
                                });
                            }
                            else {
                                nextInternal();
                            }
                        }
                    });

                });

                cropProcessors.push({
                    process: function (ctxInternal) {
                        fs.readFile(destFilePath, function (readErr, img) {
                            if (readErr) 
                                return cb(readErr);
                            
                            return cb(null, ctxInternal.imageObj, img);
                        });
                    }
                });

                var first = _.first(cropProcessors);
                first.process(ctx, next);
            }
        });
    }
    catch (err) {
        cb(err);
    };
};

module.exports = ImageTransformer;