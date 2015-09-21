class ProjectController < ApplicationController

	skip_before_filter :verify_authenticity_token

  def show
    puts '-----------project#show-----------'
    data = Project.all
    render json: data
  end

end