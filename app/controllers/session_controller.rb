class SessionController < ApplicationController

  skip_before_filter :verify_authenticity_token

  layout false

  def create
    @user = request.env['omniauth.auth']['info']
    @auth = request.env['omniauth.auth']['credentials']

    @t = User.where(:email => @user['email']).first

    if @t.blank?
      @t = User.create(name: @user['first_name'], email: @user['email'])
      @t.create_token(
          access_token: @auth['token'],
          refresh_token: @auth['refresh_token'],
          expires_at: Time.at(@auth['expires_at']).to_datetime
      )
    else
      @t.token.update(access_token: @auth['token'], expires_at: Time.at(@auth['expires_at']).to_datetime)
    end

      redirect_to('http://tddd27-timereportapp.rhcloud.com?' + @auth['token'] + '&' + @user['first_name'])
  end

end