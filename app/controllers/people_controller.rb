class PeopleController < ApplicationController

  skip_before_filter :verify_authenticity_token

  #def index
   # puts 'index has been initiated'
    #render json: People.all
  #end

  def show
    puts '-----------people#show-----------'
    data = People.all
    render json: data
  end

  def create
    puts '-----------people#create-----------'
    People.create(name: params[:name], email: params[:email])
    id = People.last.id
    render :json => {success: true, id: id}
  end

  def update
    puts '-----------people#update-----------'
    People.find(params[:id]).update(:name => params[:name], :email => params[:email])
    render nothing: true
  end

  def destroy
    puts '-----------people#delete-----------'
    People.find(params[:id]).destroy
    render nothing: true
  end

end