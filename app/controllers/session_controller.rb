class SessionController < ApplicationController

  skip_before_filter :verify_authenticity_token

  layout false

  def create
    @auth = request.env['omniauth.auth']['credentials']
  end

  def authenticate
   # token = params[:id]

   # require 'google/apis/drive_v2'
   # drive = Google::Apis::DriveV2::DriveService.new
  end

=begin
    require 'net/http'
    callbackParameters = (Net::HTTP.get(URI.parse('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+ token))).split(',')
    userData = {}

    for i in 0..7
      temp = callbackParameters[i].split('"')
      userData[temp[1]] = temp[3]
    end

    if userData['audience'] == '462878784674-q643pcp1acsrh17m9ms2s84tkpupgbnn.apps.googleusercontent.com'
      if not User.exists?(userId: userData['user_id'])
=begin
        create(userData['user_id'], userData['email'])
        render :json => {'msg' => 'New user created'}

        render :json => (create(userData['user_id'], userData['email']))
      else
        render json:  (User.find(userData['user_id']))
      end
    else
      render :json => {'msg' => 'Incorrect clientID'}
    end
  end

  def create(varUserId, varEmail, varUserLevel = 1)
    @user = User.create(userId: varUserId, email: varEmail, userLevel: varUserLevel)
    if @user.save
      return @user
    else
      return {:errors => @user.errors.full_message}, :status => 422
    end
  end
=end
end