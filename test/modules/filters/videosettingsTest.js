describe('filter', function() {
	beforeEach(module('videosharing-embed'));

	describe('videoSettings', function() {
		it('should created a string of HTTP GET parameters', inject(function (videoSettingsFilter) {
			expect(videoSettingsFilter({ 'autoplay' : '?/?' , 'loop' : 'no' })).toEqual('?autoplay=?/?&loop=no');
			expect(videoSettingsFilter({ 'autoplay' : 1 , 'loop' : 'no' })).toEqual('?autoplay=1&loop=no');
			expect(videoSettingsFilter({ 'autoplay' : 1 , 'loop' : 'no', 'wmode' : 'transparent' })).toEqual('?autoplay=1&loop=no&wmode=transparent');
			expect(videoSettingsFilter({ 'wmode' : 'transparent' , 'loop' : 'no' })).toEqual('?wmode=transparent&loop=no');
		}))
	})
})