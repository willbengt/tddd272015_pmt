class AddNumberToReport < ActiveRecord::Migration
  def change
    add_column :reports, :number, :integer
  end
end
