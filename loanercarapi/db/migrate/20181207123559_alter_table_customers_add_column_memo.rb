class AlterTableCustomersAddColumnMemo < ActiveRecord::Migration[5.2]
  def up
    add_column :customers, :memo, :string, limit: 1000, null: false, default: ''
  end

  def down
    remove_column :customers, :memo
  end
end
