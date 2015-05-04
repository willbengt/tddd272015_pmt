class ReportController < ApplicationController

  skip_before_filter :verify_authenticity_token
  def index
    @report = Report.all
  end
  def create
    puts 'hej'



  end
  def new

  end
  def show

  end
  def hejsan
    report = Report.create(title: params[:title])

    render json: report
  end

end
