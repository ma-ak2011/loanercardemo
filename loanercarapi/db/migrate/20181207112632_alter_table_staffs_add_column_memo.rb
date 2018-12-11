class AlterTableStaffsAddColumnMemo < ActiveRecord::Migration[5.2]
  def up
    add_column :staffs, :memo, :string, limit: 1000, null: false, default: ''
  end

  def down
    remove_column :staffs, :memo
  end
end
