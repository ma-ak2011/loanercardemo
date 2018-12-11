class AlterTableFacilitiesAddColumnsExpireDateAndMemo < ActiveRecord::Migration[5.2]
  def up
    add_column :facilities, :memo, :string, limit: 1000, null: false, default: ''
    add_column :facilities, :expire_date, :datetime, null: false
  end

  def down
    remove_column :facilities, :memo
    remove_column :facilities, :expire_date
  end
end
