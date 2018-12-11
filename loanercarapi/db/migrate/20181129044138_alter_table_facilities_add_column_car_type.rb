class AlterTableFacilitiesAddColumnCarType < ActiveRecord::Migration[5.2]
  def up
    add_column :facilities, :car_type, :integer
  end
  def down
    remove_column :facilities, :car_type
  end
end
