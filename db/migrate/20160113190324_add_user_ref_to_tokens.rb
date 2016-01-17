class AddUserRefToTokens < ActiveRecord::Migration
  def change
    add_reference :tokens, :user, index: true, foreign_key: true
  end
end
