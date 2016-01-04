app.factory('Membership', function($resource) {
  return $resource('/api/memberships/:userId', {userId: '@userId'}, {
    'update': {method: 'PUT'}
  });
});