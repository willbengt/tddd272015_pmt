class DeleteReport < ActiveRecord::Migration
  def change
    drop_table :reports
  end
end
