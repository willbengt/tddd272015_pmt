class ProjectController < ApplicationController

	skip_before_filter :verify_authenticity_token

  def index
    puts '-----------project#index-----------'
    @projects = Project.all
    render json: @projects
  end

  def create
    puts '-----------project#create-----------'
    @project = Project.create(name: params[:name])
    render :json => {id: @project.id}
  end

  def show
    puts '-----------project#show-----------'
    @project = Project.find(params[:id])
    render json: @project
  end

  def update
    puts '-----------project#update-----------'
    @project = Project.find(params[:id]).update(:name => params[:name])
    render nothing: true
  end

  def destroy
    puts '-----------project#delete-----------'
    @project = Project.find(params[:id]).destroy
    render nothing: true
  end

end