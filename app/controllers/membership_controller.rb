class MembershipController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    puts '-----------membership#index-----------'
    @memberships = Membership.all
    render json: @memberships
  end

  def create
    puts '-----------membership#create-----------'
    @membership = Membership.create(user_id: params[:userId], project_id: params[:projectId])
    render nothing: true
  end

  def update
    puts '-----------membership#update-----------'

    @memberships = Membership.where(user_id: params[:userId])
    puts @memberships
    # puts Project.find(1).users
    # puts Project.find(2).users
    # puts Project.find(4).users
    # puts User.find(1).projects

    if @memberships
      puts @memberships.count
      @memberships.each do |membership|
        membership.destroy
      end 
    end

    @projects = params[:userProjects]

    if @projects
      @projects.each do |project|
        Membership.create(user_id: params[:userId], project_id: project)
      end 
    end

    # puts Project.find(1).users
    # puts Project.find(2).users
    # puts Project.find(4).users
    # puts User.find(1).projects
  
    render nothing: true
  end
end
