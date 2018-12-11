class Staffs < ActiveRecord::Migration[5.2]
  def up
    add_column :staffs, :age, :integer
  end

  def down
    remove_column :staffs, :age
  end
end
