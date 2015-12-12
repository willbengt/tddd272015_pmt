class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.float :time
      t.timestamps null: false
    end
  end
end
