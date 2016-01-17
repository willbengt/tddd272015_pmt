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

    if @user['first_name'].nil?
      @user['first_name'] = "Unknown"
    end

    redirect_to('http://tddd27-timereportapp.rhcloud.com?' + @auth['token'] + '&' + @user['first_name'] + '&' + @auth['expires_at'].to_s)
    
#      redirect_to('http://localhost:3000?' + @auth['token'] + '&' + @user['first_name'] + '&' + @auth['expires_at'].to_s)
  end

  def update
    puts @token = User.where(name: params[:user]).first.token
    @token.refresh!
    render JSON: @token
  end

end