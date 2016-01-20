Rails.application.routes.draw do

  get '/auth/:provider/callback', to: 'session#create'

  get 'api/reports', to: 'timereport#index'
  post 'api/reports', to: 'timereport#create'
  get 'api/reports/:id', to: 'timereport#show'
  put 'api/reports/:id', to: 'timereport#update'
  delete 'api/reports/:id', to: 'timereport#destroy'

  get 'api/users', to: 'user#index'
  post 'api/users', to: 'user#create'
  put 'api/users/:id', to: 'user#update'
  delete 'api/users/:id', to: 'user#destroy'

  get 'api/projects', to: 'project#index'
  post 'api/projects', to: 'project#create'
  get 'api/projects/:id', to: 'project#show'
  put 'api/projects/:id', to: 'project#update'
  delete 'api/projects/:id', to: 'project#destroy'

  get 'api/memberships', to: 'membership#index'
  post 'api/memberships', to: 'membership#create'
  put 'api/memberships/:userId', to: 'membership#update'

  get 'api/session/', to: 'session#update'

  get 'test/auth', to: 'session#test'

end
