describe('embedVideo', function() {
	beforeEach(module('videosharing-embed'));
	var scope;
	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));
	
	var getURLandOptions = function(url) {
		return {
			url : url.split('?')[0],
			options : function() {
				rawOptions = url.split('?')[1].split('&');
				var options = {};
				angular.forEach(rawOptions, function(rawOption) {
					var split = rawOption.split('=');
					options[split[0]] = split[1];
				});
				return options;
			}()
		}
	}
	
	describe('embed youtube', function() {
		it('should embed a youtube video', inject(function () {
			inject(function ($compile) {
				var rootElement;
				rootElement = $compile('<a ng-href="http://www.youtube.com/watch?v=-LOKyEt36Kjc" embed-video controls=0 >Watch</a>')(scope);
				scope.$apply();
				var element = rootElement[0];
				expect(element).toBeDefined();
				expect(element.nodeName.toLowerCase()).toEqual('iframe');
				var elementData = getURLandOptions(element.getAttribute('src'));
				expect(elementData.url).toEqual('http://www.youtube.com/embed/-LOKyEt36Kjc');
				expect(Object.keys(elementData.options).length).toEqual(3);
				expect(elementData.options.loop).toEqual('0');
				expect(elementData.options.controls).toEqual('0');
				expect(elementData.options.autoplay).toEqual('0');
			});
		}))
	})
	
	describe('embed youtube short URL', function() {
		it('should embed a youtube video by short URL', inject(function () {
			inject(function ($compile) {
				var rootElement;
				rootElement = $compile('<a ng-href="http://youtu.be/LOKyEt36Kjc" embed-video controls=0 >Watch</a>')(scope);
				scope.$apply();
				var element = rootElement[0];
				expect(element).toBeDefined();
				expect(element.nodeName.toLowerCase()).toEqual('iframe');
				var elementData = getURLandOptions(element.getAttribute('src'));
				expect(elementData.url).toEqual('http://www.youtube.com/embed/LOKyEt36Kjc');
				expect(Object.keys(elementData.options).length).toEqual(3);
				expect(elementData.options.loop).toEqual('0');
				expect(elementData.options.controls).toEqual('0');
				expect(elementData.options.autoplay).toEqual('0');
			});
		}))
	})
	
	describe('embed https youtube', function() {
		it('should embed a youtube video using https protocol', inject(function () {
			inject(function ($compile) {
				var rootElement;
				rootElement = $compile('<a ng-href="https://www.youtube.com/watch?v=LOKyEt36Kjc" embed-video controls=0 >Watch</a>')(scope);
				scope.$apply();
				var element = rootElement[0];
				expect(element).toBeDefined();
				expect(element.nodeName.toLowerCase()).toEqual('iframe');
				var elementData = getURLandOptions(element.getAttribute('src'));
				expect(elementData.url).toEqual('https://www.youtube.com/embed/LOKyEt36Kjc');
				expect(Object.keys(elementData.options).length).toEqual(3);
				expect(elementData.options.loop).toEqual('0');
				expect(elementData.options.controls).toEqual('0');
				expect(elementData.options.autoplay).toEqual('0');
			});
		}))
	})

	describe('embed protocol agnostic youtube', function() {
		it('should embed a youtube video using no protocol', inject(function () {
			inject(function ($compile) {
				var rootElement;
				rootElement = $compile('<a ng-href="//www.youtube.com/watch?v=LOKyEt36Kjc" embed-video controls=0 >Watch</a>')(scope);
				scope.$apply();
				var element = rootElement[0];
				expect(element).toBeDefined();
				expect(element.nodeName.toLowerCase()).toEqual('iframe');
				var elementData = getURLandOptions(element.getAttribute('src'));
				expect(elementData.url).toEqual('//www.youtube.com/embed/LOKyEt36Kjc');
				expect(Object.keys(elementData.options).length).toEqual(3);
				expect(elementData.options.loop).toEqual('0');
				expect(elementData.options.controls).toEqual('0');
				expect(elementData.options.autoplay).toEqual('0');
			});
		}))
	})
	
	describe('embed dailymotion', function() {
		it('should embed a dailymotion video', inject(function () {
			inject(function ($compile) {
				var rootElement;
				rootElement = $compile('<a ng-href="http://www.dailymotion.com/video/xxd68z" embed-video force-quality="hq" width="1280" height="720">Watch</a>')(scope);
				scope.$apply();
				var element = rootElement[0];
				expect(element).toBeDefined();
				expect(element.nodeName.toLowerCase()).toEqual('iframe');
				var elementData = getURLandOptions(element.getAttribute('src'));
				expect(elementData.url).toEqual('http://www.dailymotion.com/embed/video/xxd68z');
				expect(Object.keys(elementData.options).length).toEqual(3);
				expect(elementData.options.forceQuality).toEqual('hq');
				expect(elementData.options.logo).toEqual('0');
				expect(elementData.options.autoPlay).toEqual('0');
				expect(strip(element.getAttribute('width'))).toEqual('1280');
				expect(strip(element.getAttribute('height'))).toEqual('720');
			});
		}))
	})
	
	describe('embed vimeo', function() {
		it('should embed a vimeo video', inject(function () {
			inject(function ($compile) {
				var rootElement;
				rootElement = $compile('<a ng-href="http://vimeo.com/53953" embed-video color=c9ff23 >Watch</a>')(scope);
				scope.$apply();
				var element = rootElement[0];
				expect(element).toBeDefined();
				expect(element.nodeName.toLowerCase()).toEqual('iframe');
				var elementData = getURLandOptions(element.getAttribute('src'));
				expect(elementData.url).toEqual('http://player.vimeo.com/video/53953');
				expect(Object.keys(elementData.options).length).toEqual(3);
				expect(elementData.options.color).toEqual('c9ff23');
				expect(elementData.options.loop).toEqual('0');
				expect(elementData.options.autoplay).toEqual('0');
			});
		}))
	})
})
