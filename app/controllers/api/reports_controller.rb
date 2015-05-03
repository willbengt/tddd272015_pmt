class Api::ReportsController < ApplicationController
  respond_to :json

  def index
    serialized_reports =
      ActiveModel::ArraySerializer
               .new(Report.all, each_serializer: ReportSerializer)

    render json: serialized_reports
  end
end