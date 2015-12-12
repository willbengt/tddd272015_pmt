app.factory('Membership', function($resource) {
  return $resource('/api/memberships/:id', {id: '@id'}, {
    'update': {method: 'PUT'}
  });
});