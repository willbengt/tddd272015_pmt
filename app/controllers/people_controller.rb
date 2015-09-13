class PeopleController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
    puts 'index has been initiated'
    render json: People.all
  end

  def create
    puts '-----------people#create-----------'
    People.create(name: params[:name], email: params[:email])
    render nothing: true
  end

end