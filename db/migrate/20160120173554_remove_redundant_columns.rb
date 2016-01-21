class RemoveRedundantColumns < ActiveRecord::Migration
  def change
    remove_column :timereports, :project
    remove_column :tokens, :email
    remove_column :users, :project
  end
end
