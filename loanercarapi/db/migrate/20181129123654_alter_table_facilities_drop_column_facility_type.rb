class AlterTableFacilitiesDropColumnFacilityType < ActiveRecord::Migration[5.2]
  def up
    remove_column :facilities, :facility_type
  end
  def down
    add_column :facilities, :facility_type, :string
  end
end
