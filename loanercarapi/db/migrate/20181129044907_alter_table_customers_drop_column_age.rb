class AlterTableCustomersDropColumnAge < ActiveRecord::Migration[5.2]
  def up
    remove_column :customers, :age
  end
  def down
    add_column :customers, :age, :integer
  end
end
