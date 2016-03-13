# image-transform
> image transformation utility with crop / stretch / fit methods

![VERSION](https://img.shields.io/npm/v/image-transform.svg)
![DOWNLOADS](https://img.shields.io/npm/dt/image-transform.svg)
[![ISSUES](https://img.shields.io/github/issues-raw/akonoupakis/image-transform.svg)](https://github.com/akonoupakis/image-transform/issues)
![LICENCE](https://img.shields.io/npm/l/image-transform.svg)

[![NPM](https://nodei.co/npm/image-transform.png?downloads=true)](https://nodei.co/npm/image-transform/)

## dependencies

install [ImageMagick](http://www.imagemagick.org/script/download.php)

## usage

```js
var ImageTransformer = require('image-transform');

var transformer = new ImageTransformer({
    tmp: server.getPath('www/public/tmp/') // the temp folder path to be used as file cache
});

var transformations = [{
    "type" : "crop",
    "options" : {
        "x" : 74,
        "y" : 37,
        "width" : 352,
        "height" : 552
    }
}, {
    "type" : "stretch",
    "options" : {
        "width" : 350,
        "height" : 350
    }
}, {
    "type" : "fit",
    "options" : {
        "width" : 200,
        "height" : 200
    }
}];

transformer.transform('./image.jpg', transformations, function(err, info, image) {
    if(err)
        throw err;
        
    res.writeHead(200, { 'Content-Type': 'image/' + info.type.toLowerCase() });
    res.write(image);
    res.end();
});
```

## license
```
The MIT License (MIT)

Copyright (c) 2016 akon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```