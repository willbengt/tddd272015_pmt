class ReportController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
  #  @report = Report.all
    puts 'index has been initiated'
    render json: Report.all
  end

  def create
    puts 'hej_______________________________________________'



  end
  def new

  end
  #def hejsan
  #  report = Report.create(title: params[:title])
  #
  #  render json: report
  #end

  def show
    puts "-------------------------------------------------enter fetch data"
    data = Timereport.all
    render json: data
  end
end
