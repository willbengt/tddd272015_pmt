class AddProjectToPeople < ActiveRecord::Migration
  def change
  	add_column :people, :project, :integer
  end
end
