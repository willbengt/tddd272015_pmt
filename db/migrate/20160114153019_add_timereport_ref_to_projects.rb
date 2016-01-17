class AddTimereportRefToProjects < ActiveRecord::Migration
  def change
    add_reference :projects, :timereport, index: true, foreign_key: true
  end
end
