class ProjectController < ApplicationController

	skip_before_filter :verify_authenticity_token

  def index
    puts '-----------project#index-----------'
    puts 'user parameter: '
    puts params[:user]
    @user = User.where(name: params[:user])
    puts @user
    @t = User.create(name: 'Test_first', email: 'test@first.com', project: 1)
    puts @t.name
    @s = @t.projects.create(name: 'TestProject', time: 52)
    puts @s.name
    puts @t.projects
    render :json => @t.projects
  end

  # def index
  #   puts '-----------project#index-----------'
  #   @projects = Project.all
  #   render json: @projects
  # end

  def create
    puts '-----------project#create-----------'
    @project = Project.create(name: params[:name], time: params[:time])
    render :json => {id: @project.id}
  end

  def show
    puts '-----------project#show-----------'
    @project = Project.find(params[:id])
    render json: @project
  end

  def update
    puts '-----------project#update-----------'
    @project = Project.find(params[:id]).update(name: params[:name], time: params[:time])
    render nothing: true
  end

  def destroy
    puts '-----------project#delete-----------'

    @memberships = Membership.where(project_id: params[:id])
    @memberships.each do |membership|
      membership.destroy
    end 

    @project = Project.find(params[:id]).destroy

    render nothing: true
  end

end