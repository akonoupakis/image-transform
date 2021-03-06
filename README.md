# image-transform
> image transformation utility with crop / stretch / fit methods

![VERSION](https://img.shields.io/npm/v/image-transform.svg)
![DOWNLOADS](https://img.shields.io/npm/dt/image-transform.svg)
[![ISSUES](https://img.shields.io/github/issues-raw/akonoupakis/image-transform.svg)](https://github.com/akonoupakis/image-transform/issues)
![LICENCE](https://img.shields.io/npm/l/image-transform.svg)

[![BUILD](https://api.travis-ci.org/akonoupakis/image-transform.svg?branch=master)](http://travis-ci.org/akonoupakis/image-transform)
![STANDARDJS](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)
[![DEPENDENCIES](https://david-dm.org/akonoupakis/image-transform.svg)](https://david-dm.org/akonoupakis/image-transform)

[![NPM](https://nodei.co/npm/image-transform.png?downloads=true)](https://nodei.co/npm/image-transform/)

## overview

Use this image transformer to read images from a physical location, apply transformations on a copy, and keep the copy cached for future use.

## dependencies

Install [ImageMagick](http://www.imagemagick.org/script/download.php)

## transformations
The image transformations may be used serially for the same image.

* crop: takes position (x, y) and dimensions (width, height) and crops the given image.
* stretch: takes dimensions (width, height) and resizes/crops the image to stretch within the dimensions container
* fit: takes dimensions (width, height) and force fits the image to the container

## usage

Check out this [tutorial](https://cdn.rawgit.com/akonoupakis/image-transform/master/docs/jsdoc/tutorial-getting-started.html) to get started.

## copyright and license

Code and documentation copyright 2016 akon. Code released under [the MIT license](https://cdn.rawgit.com/akonoupakis/image-transform/master/LICENSE).