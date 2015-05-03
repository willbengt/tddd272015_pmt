class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.string :date
      t.string :name
      t.string :starttime
      t.string :endtime

      t.timestamps null: false
    end
  end
end
