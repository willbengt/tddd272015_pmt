class MembershipController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    puts '-----------membership#index-----------'
    @memberships = Membership.all
    render json: @memberships
  end
end
