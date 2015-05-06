class ReportController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
  #  @report = Report.all
    puts 'index has been initiated'
    render json: Report.all
  end

  def create
    puts 'hej_______________________________________________'
    #report = Timereport.create(name: "hej", project: 1, time: 8, text: "trollboll" )
    @report = Timereport.create(name: params[:name], project: params[:project], time: params[:time], text: params[:text])
    render json: 'ok'
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
