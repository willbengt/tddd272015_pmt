class RemoveRedundantColumns < ActiveRecord::Migration
  def change
 #   remove_column :projects, :user_id
 #   remove_column :projects, :timereport_id
    remove_column :timereports, :project
    remove_column :tokens, :email
    remove_column :users, :project
    remove_column :users, :project_id
    remove_column :users, :token_id
  end
end
