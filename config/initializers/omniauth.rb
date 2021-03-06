#config/initalizers/omniauth.rb
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, GOOGLE_CONFIG['client_id'], GOOGLE_CONFIG['client_secret'], {
     scope: ['email',
             'https://www.googleapis.com/auth/gmail.modify'],
     access_type: 'offline',
                         skip_jwt: true}

end
