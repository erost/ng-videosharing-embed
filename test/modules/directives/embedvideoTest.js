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
				rootElement = $compile('<embed-video ng-href="//www.youtube.com/watch?v=LOKyEt36Kjc" controls=0 >Watch</embed-video>')(scope);
				scope.$apply();
				var element = rootElement[0].firstChild;
				expect(element).toBeDefined();
				expect(element.nodeName.toLowerCase()).toEqual('iframe');
				var elementData = getURLandOptions(element.getAttribute('src'));
				expect(elementData.url).toEqual('//www.youtube.com/embed/LOKyEt36Kjc');
				expect(Object.keys(elementData.options).length).toEqual(4);
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
				rootElement = $compile('<embed-video ng-href="http://youtu.be/LOKyEt36Kjc" controls=0 >Watch</embed-video>')(scope);
				scope.$apply();
				var element = rootElement[0].firstChild;
				expect(element).toBeDefined();
				expect(element.nodeName.toLowerCase()).toEqual('iframe');
				var elementData = getURLandOptions(element.getAttribute('src'));
				expect(elementData.url).toEqual('http://www.youtube.com/embed/LOKyEt36Kjc');
				expect(Object.keys(elementData.options).length).toEqual(4);
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
				rootElement = $compile('<embed-video ng-href="https://www.youtube.com/watch?v=LOKyEt36Kjc" controls=0 >Watch</embed-video>')(scope);
				scope.$apply();
				var element = rootElement[0].firstChild;
				expect(element).toBeDefined();
				expect(element.nodeName.toLowerCase()).toEqual('iframe');
				var elementData = getURLandOptions(element.getAttribute('src'));
				expect(elementData.url).toEqual('https://www.youtube.com/embed/LOKyEt36Kjc');
				expect(Object.keys(elementData.options).length).toEqual(4);
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
				rootElement = $compile('<embed-video ng-href="//www.youtube.com/watch?v=LOKyEt36Kjc" controls=0 >Watch</embed-video>')(scope);
				scope.$apply();
				var element = rootElement[0].firstChild;
				expect(element).toBeDefined();
				expect(element.nodeName.toLowerCase()).toEqual('iframe');
				var elementData = getURLandOptions(element.getAttribute('src'));
				expect(elementData.url).toEqual('//www.youtube.com/embed/LOKyEt36Kjc');
				expect(Object.keys(elementData.options).length).toEqual(4);
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
				rootElement = $compile('<embed-video ng-href="http://www.dailymotion.com/video/xxd68z" width="1280" height="720">Watch</embed-video>')(scope);
				scope.$apply();
				var element = rootElement[0].firstChild;
				expect(element).toBeDefined();
				expect(element.nodeName.toLowerCase()).toEqual('iframe');
				var elementData = getURLandOptions(element.getAttribute('src'));
				expect(elementData.url).toEqual('http://www.dailymotion.com/embed/video/xxd68z');
				expect(Object.keys(elementData.options).length).toEqual(3);
				expect(elementData.options.logo).toEqual('0');
				expect(elementData.options.autoPlay).toEqual('0');
				expect(element.getAttribute('width').trim()).toEqual('1280');
				expect(element.getAttribute('height').trim()).toEqual('720');
			});
		}))
	})
	
	describe('embed vimeo', function() {
		it('should embed a vimeo video', inject(function () {
			inject(function ($compile) {
				var rootElement;
				rootElement = $compile('<embed-video ng-href="//vimeo.com/53953" color=c9ff23 >Watch</embed-video>')(scope);
				scope.$apply();
				var element = rootElement[0].firstChild;
				expect(element).toBeDefined();
				expect(element.nodeName.toLowerCase()).toEqual('iframe');
				var elementData = getURLandOptions(element.getAttribute('src'));
				expect(elementData.url).toEqual('//player.vimeo.com/video/53953');
				expect(elementData.options.color).toEqual('c9ff23');
				expect(elementData.options.loop).toEqual('0');
				expect(elementData.options.autoplay).toEqual('0');
			});
		}))
	})
})
