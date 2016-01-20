class ProjectController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
    puts '-----------project#index-----------'
    if params[:user] == 'admin' then
      @projects = Project.all
    else
      puts params[:user]
      @user = User.where(:name => params[:user]).first
      @projects = @user.projects if @user.authenticated?(params[:token])
    end
    render :json => @projects
  end

  def create
    puts '-----------project#create-----------'
    @user = User.where(:name => params[:user]).first
    @project = @user.projects.create(name: params[:name], time: params[:time]) if @user.authenticated?(params[:token])
    render :json => {id: @project.id}
  end

  def show
    puts '-----------project#show-----------'
    @user = User.where(:name => params[:user]).first
    @project = @user.projects.find(params[:id]) if @user.authenticated?(params[:token])
    render json: @project
  end

  def update
    puts '-----------project#update-----------'
    @user = User.where(:name => params[:user]).first
    @user.projects.find(params[:id]).update(name: params[:name], time: params[:time]) if @user.authenticated?(params[:token])
    render nothing: true
  end

  def destroy
    puts '-----------project#delete-----------'
    @project = Project.find(params[:id]).destroy
    render nothing: true
  end

end