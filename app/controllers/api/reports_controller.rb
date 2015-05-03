class Api::ReportsController < ApplicationController
  respond_to :json

  def index
    serialized_reports =
      ActiveModel::ArraySerializer
               .new(Report.all, each_serializer: ReportSerializer)

    render json: serialized_reports
  end

  def update
    report = Report.find(params[:id])

    if report.update(report_params)
      render json: report
    else
      render json: report.errors.messages, status: :bad_request
    end
  end

  private

  def report_params
    attributes = [
      :date,
      :name,
      :starttime,
      :endtime
    ]

    params.require(:report).permit(attributes)
  end
end