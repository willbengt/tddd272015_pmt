# app/models/token.rb

require 'net/http'
require 'json'

class Token < ActiveRecord::Base

  belongs_to :user

  def to_params
    {'refresh_token' => refresh_token,
     'client_id' => GOOGLE_CONFIG['client_id'],
     'client_secret' => GOOGLE_CONFIG['client_secret'],
     'grant_type' => 'refresh_token'}
  end

  def request_token_from_google
    url = URI("https://accounts.google.com/o/oauth2/token")
    Net::HTTP.post_form(url, self.to_params)
  end

  def refresh!
    response = request_token_from_google
    data = JSON.parse(response.body)
    update_attributes(
        access_token: data['access_token'],
        expires_at: Time.now + (data['expires_in'].to_i).seconds)
  end

  def expired?
    return expires_at < Time.now
  end

  def fresh_token
    refresh! if expired?
    return access_token
  end

end