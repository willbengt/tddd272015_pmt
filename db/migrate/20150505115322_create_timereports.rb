class CreateTimereports < ActiveRecord::Migration
  def change
    create_table :timereports do |t|
      t.string :name
      t.integer :project
      t.integer :time
      t.text :text

      t.timestamps null: false
    end
  end
end
