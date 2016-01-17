class ReportController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
    puts 'index has been initiated'
    render json: Timereport.all
  end

  def create
    puts '-----------create-----------'
    @report = Timereport.create(name: params[:name], project: params[:project], time: params[:time], text: params[:text])
    id = Timereport.last.id
    render :json => {id: id}
  end

  def show
    puts '-----------show-----------'
    @report = Timereport.find(params[:id])
    render json: @report
  end

  def update
    puts '-----------report#update-----------'
    Timereport.find(params[:id]).update(name: params[:name], project: params[:project], time: params[:time], text: params[:text])
    render nothing: true
  end

  def get
    puts params[:id]
    @report = Timereport.find(params[:id])
    render :json => @report
  end

  def destroy
    puts '-----------destroy-----------'
    @report = Timereport.find(params[:id]).destroy
    render nothing: true
  end
end