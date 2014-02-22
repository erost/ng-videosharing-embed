# ng-videosharing-embed

Embed videos using AngularJS directives

[![Build Status](https://travis-ci.org/erost/ng-videosharing-embed.png?branch=master)](https://travis-ci.org/erost/ng-videosharing-embed)
***

## Purpose

A small project I've started while learning angularJS. It has no real purpose other than educational.

## Usage

### Requirements

* **AngularJS v1.0.0+** is currently required.

### Supported Video Sources

* **Youtube** (iframe)
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

Options are configured for each player, and allowed options are filtered using a whitelist.

Note: camelCase options must be changed to dash-format
