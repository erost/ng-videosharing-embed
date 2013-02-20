describe('filter', function() {
	beforeEach(module('embedplayer'));
	
	describe('videoOptions', function() {
		it('should created a string of HTTP GET parameters', inject(function (videoOptionsFilter) {
			expect(videoOptionsFilter({ 'autoplay' : '?/?' , 'loop' : 'no' })).toEqual('?autoplay=?/?&loop=no');
			expect(videoOptionsFilter({ 'autoplay' : 1 , 'loop' : 'no' })).toEqual('?autoplay=1&loop=no');
		}))
	})
})