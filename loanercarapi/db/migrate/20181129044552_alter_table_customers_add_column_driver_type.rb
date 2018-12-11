class AlterTableCustomersAddColumnDriverType < ActiveRecord::Migration[5.2]
  def up
    add_column :customers, :driver_type, :integer
  end
  def down
    remove_column :customers, :driver_type
  end
end
