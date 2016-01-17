class ReportController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
    if Project.where(params[:project]).authProjectMember?(params[:user], params[:token]) then
      @project = Project.where(params[:project]).first
      return render json: @project.timereports
    end

    return render nothing: true
  end


  def create
    puts '-----------timereport#create-----------'
    if Project.where(params[:project]).first.authProjectMember?(params[:user], params[:token]) then
      @timereport = Project.find(params[:project]).timereports.create(name: params[:name], time: params[:time], text: params[:text])
      return render :json => {id: @timereport.id}
    end

    return render nothing: true
  end


  def show
    puts '-----------timereport#show-----------'
    @project = Project.find(params[:id])

    if Project.where(params[:id]).first.authProjectMember?(params[:user], params[:token]) then
      return render json: @project.timereports
    end

      return render nothing: true
  end


  def update
    puts '-----------timereport#update-----------'
    if Project.where(params[:project]).first.authProjectMember?(params[:user], params[:token]) then
      Timereport.find(params[:id]).update(name: params[:name], time: params[:time], text: params[:text])
    end

    return render nothing: true
  end


  def get
    if Project.where(params[:project]).authProjectMember?(params[:user], params[:token]) then
      @report = Timereport.find(params[:id])
      return render :json => @report
    end

    return render nothing: true
  end


  def destroy
    puts '-----------destroy-----------'
    if Project.where(params[:project]).first.authProjectMember?(params[:user], params[:token]) then
      Timereport.find(params[:id]).destroy
      return render nothing: true
    end

    return render nothing:  true
  end
end