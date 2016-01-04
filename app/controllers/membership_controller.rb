class MembershipController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    puts '-----------membership#index-----------'
    @memberships = Membership.all
    render json: @memberships
  end

  def update
    puts '-----------membership#update-----------'

    @memberships = Membership.where(user_id: params[:userId])
    
    @memberships.each do |membership|
      membership.destroy
    end 

    @projects = params[:userProjects]

    @projects.each do |project|
      Membership.create(user_id: params[:userId], project_id: project)
    end 
    
    render nothing: true
  end
end
