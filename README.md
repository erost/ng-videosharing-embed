# ng-videosharing-embed

Embed videos using AngularJS directives

[![Build Status](https://travis-ci.org/erost/ng-videosharing-embed.png?branch=master)](https://travis-ci.org/erost/ng-videosharing-embed)
***

## Purpose

A small project I've started while learning angularJS. It has no real purpose other than educational.

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SX83QR8JRVZWW)

## Usage

### Install

* `$ bower install ng-videosharing-embed`

Once installed, add videosharing-embed as a dependency in your module:

* `angular.module('myModule', ['videosharing-embed']);`

### Requirements

* **AngularJS v1.0.0+** is supported

### Supported Video Sources

* **Youtube** (standard and nocookies, iframe, JS API support)
* **Dailymotion** (iframe, JS API support)
* **Vimeo** (iframe, JS API support)
* **Youku** (iframe, tentative)

**Note on JS API:**

Each iframe should be identified with a unique id. That ID can be configured by **iframe-id**

Example
```html
<embed-video iframe-id="vimeo1" api="1" player_id="vimeo1" ng-href="//vimeo.com/111690998"><a href="//vimeo.com/111690998">Watch</a></embed-video>
```

### Test

Generic
```html
<embed-video href="<videoUrl>" width=xxx height=xxx [options]></embed-video>
```

Example
```html
<embed-video data-ng-href="http://www.youtube.com/watch?v=LOKyEt36Kjc" controls=0><a href="http://www.youtube.com/watch?v=LOKyEt36Kjc">Watch</a></embed-video>
```

Player's options are unique for each video source.
For a list of available options, take a look at src/angular-embedplayer.js, or the player official documentation
