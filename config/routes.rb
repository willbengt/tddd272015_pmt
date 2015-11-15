Rails.application.routes.draw do
  get 'report/index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end



  # automatically creates routes for CRUD operations for ReportController
  # resources :report

  get '/report', to: 'report#show'
  post '/report', to: 'report#create'
  put '/report/:id', to: 'report#update'
  delete '/report/:id', to: 'report#destroy'

  get 'api/users', to: 'people#show'
  post 'api/users', to: 'people#create'
  put 'api/users/:id', to: 'people#update'
  delete 'api/users/:id', to: 'people#destroy'

  get 'api/projects', to: 'project#index'
  post 'api/projects', to: 'project#create'
  get 'api/projects/:id', to: 'project#show'
  put 'api/projects/:id', to: 'project#update'
  delete 'api/projects/:id', to: 'project#destroy'

  put '/authenticate' => 'session#authenticate'

  
  #get '/project', to: 'project#show'
  #post '/project', to: 'project#create'
  #put '/project/:id', to: 'project#update'
  #delete '/project/:id', to: 'project#destroy'

  #-- Redundant will be deleted when calls from front has been overhauled
  #get '/reports' => 'report#get_all'
  #get '/fetchdata' => 'report#get_all'
  #post '/senddata' => 'report#create'
  #post '/reports' => 'report#create'
  #put '/deletedata' => 'report#delete'
  #delete '/reports/:id' => 'report#delete'
end
