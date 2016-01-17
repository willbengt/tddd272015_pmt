class AddTokenRefToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :token, index: true, foreign_key: true
  end
end
