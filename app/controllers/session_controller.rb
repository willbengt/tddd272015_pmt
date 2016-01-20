class SessionController < ApplicationController

  skip_before_filter :verify_authenticity_token

  layout false

  def create
    @user = request.env['omniauth.auth']['info']
    @auth = request.env['omniauth.auth']['credentials']
    if @user['first_name'].nil?
      @user['first_name'] = @user['email'].split("@").first
    end


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
      redirect_to('http://tddd27-timereportapp.rhcloud.com?' + @auth['token'] + '&' + @user['first_name'] + '&' + @auth['expires_at'].to_s)

  end

  def update
    puts @token = User.where(name: params[:user]).first.token
    @token.refresh!
    render JSON: @token
  end

  def test
    puts "session#test - only for testing purposes"

    @email = "test@email.com"
    @token = "ya29.bQLjyHDKPsX0k33O17MWfrog2WkXLQTfMbj6ShRe0e51-3KPtaHF2-_NMQbwPP4prFlivw"
    @expires_at = 1453128650

    @t = User.where(:email => @email).first

    if @t.blank?
      @t = User.create(name: @email.split("@").first, email: @email)
      @t.create_token(
        access_token: @token,
        expires_at: Time.at(@expires_at).to_datetime
      )
    end

    redirect_to('http://localhost:3000?' + @token + '&' + @email.split("@").first + '&' + @expires_at.to_s)

  end

end