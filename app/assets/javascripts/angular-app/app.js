app = angular
.module('app', [
	function() {
		console.log('angular app running');
	}
])

.config([
  '$httpProvider', function($httpProvider) {
    return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);