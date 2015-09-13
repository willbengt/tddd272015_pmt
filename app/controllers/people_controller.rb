class PeopleController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def test
    puts '-----------test-----------'

    render :json => {msg: 'ok'}
  end

end