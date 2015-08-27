class ReportController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
    puts 'index has been initiated'
    render json: Report.all
  end

  def create
    @report = Timereport.create(name: params[:name], project: params[:project], time: params[:time], text: params[:text])
    render nothing: true
  end

  def show
    data = Timereport.all
    render json: data
  end

  def delete
    puts params[:id]
    @report = Timereport.find(params[:id]).destroy
    render :json => {msg: 'ok'}
  end
end
