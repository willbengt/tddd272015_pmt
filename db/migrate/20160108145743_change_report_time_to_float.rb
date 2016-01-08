class ChangeReportTimeToFloat < ActiveRecord::Migration
  def change
    change_column :timereports, :time, :float
  end
end
