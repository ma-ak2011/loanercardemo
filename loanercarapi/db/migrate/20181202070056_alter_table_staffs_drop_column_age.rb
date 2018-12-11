class AlterTableStaffsDropColumnAge < ActiveRecord::Migration[5.2]
  def up
    remove_column :staffs, :age
  end
  def down
    add_column :staffs, :age, :integer
  end
end
