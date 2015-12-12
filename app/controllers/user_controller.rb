class UserController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def show
    puts '-----------user#show-----------'
    data = User.all
    render json: data
  end

  def create
    puts '-----------user#create-----------'
    User.create(name: params[:name], email: params[:email], project: params[:project])
    id = User.last.id
    render :json => {id: id}
  end

  def update
    puts '-----------user#update-----------'
    User.find(params[:id]).update(:name => params[:name], :email => params[:email], :project => params[:project])
    render nothing: true
  end

  def destroy
    puts '-----------user#delete-----------'
    User.find(params[:id]).destroy
    render nothing: true
  end

end