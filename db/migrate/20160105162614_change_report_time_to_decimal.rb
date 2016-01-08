class ChangeReportTimeToDecimal < ActiveRecord::Migration
  def change
    change_column :timereports, :time, :decimal, :precision => 5, :scale => 2
  end
end
