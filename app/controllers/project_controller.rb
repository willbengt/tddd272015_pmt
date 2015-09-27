class ProjectController < ApplicationController

	skip_before_filter :verify_authenticity_token

  def show
    puts '-----------project#show-----------'
    data = Project.all
    render json: data
  end

  def create
    puts '-----------project#create-----------'
    Project.create(name: params[:name])
    id = Project.last.id
    render :json => {id: id}
  end

  def destroy
    puts '-----------project#delete-----------'
    Project.find(params[:id]).destroy
    render nothing: true
  end

end