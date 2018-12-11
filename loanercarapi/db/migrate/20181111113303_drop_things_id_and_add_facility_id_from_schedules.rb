class DropThingsIdAndAddFacilityIdFromSchedules < ActiveRecord::Migration[5.2]
  def up
    add_column :schedules, :facility_id, :bigint
  end

  def down
    remove_column :schedules, :facility_id
  end
end
