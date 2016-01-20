class ReportController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
    puts '-----------timereport#index-----------'

    @user = User.where(:name => params[:user]).first

    if @user.authenticated?(params[:token])
      @reports = Timereport.all 

      return render :json => @reports
    end

    return render nothing: true
  end


  def create
    puts '-----------timereport#create-----------'
    if Project.find(params[:project]).authProjectMember?(params[:user], params[:token]) then
      @timereport = Project.find(params[:project]).timereports.create(name: params[:name], time: params[:time], text: params[:text])
      return render :json => {id: @timereport.id}
    end

    return render nothing: true
  end


  def show
    puts '-----------timereport#show-----------'
    @project_id = params[:id]
    if Project.find(@project_id).authProjectMember?(params[:user], params[:token]) then
      @project = Project.find(@project_id)
      return render json: @project.timereports
    end

    return render nothing: true
  end


  def update
    puts '-----------timereport#update-----------'
    if Project.find(params[:project]).authProjectMember?(params[:user], params[:token]) then
      Timereport.find(params[:id]).update(name: params[:name], time: params[:time], text: params[:text])
    end

    return render nothing: true
  end


  def destroy
    puts '-----------timereport#destroy-----------'
    if Project.find(params[:project]).authProjectMember?(params[:user], params[:token]) then
      Timereport.find(params[:id]).destroy
      return render nothing: true
    end

    return render nothing:  true
  end
end