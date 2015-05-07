class ReportSerializer < ActiveModel::Serializer
  attributes :id, :date, :name, :starttime, :endtime
end