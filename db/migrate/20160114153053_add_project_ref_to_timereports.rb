class AddProjectRefToTimereports < ActiveRecord::Migration
  def change
    add_reference :timereports, :project, index: true, foreign_key: true
  end
end
