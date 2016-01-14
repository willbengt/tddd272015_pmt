app.factory('Project', function($resource) {
  return $resource('/api/projects/:id', {id: '@id'}, {
		'update': {method: 'PUT'}
	});
});

