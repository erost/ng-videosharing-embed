# ng-videosharing-embed

Embed videos using AngularJS directives

[![Build Status](https://travis-ci.org/erost/ng-videosharing-embed.png?branch=master)](https://travis-ci.org/erost/ng-videosharing-embed)
***

## Purpose

A small project I've started while learning angularJS. It has no real purpose other than educational.

[![Support via Gittip](https://rawgithub.com/twolfson/gittip-badge/0.2.0/dist/gittip.png)](https://www.gittip.com/erost/)

## Usage

### Install

* `$ bower install ng-videosharing-embed`

### Requirements

* **AngularJS v1.0.0+** is supported

### Supported Video Sources

* **Youtube** (iframe)
* **Youtube no cookies** (iframe)
* **Dailymotion** (iframe)
* **Vimeo** (iframe)

### Test

Generic
```html
<a href="<videoUrl>" embed-video width=xxx height=xxx [options]></a>
```

Example
```html
<a href="http://www.youtube.com/watch?v=LOKyEt36Kjc" embed-video controls=0></a>
```

Player's options are unique for each video source.
For a list of available options, take a look at src/angular-embedplayer.js
