class AddSchedulesConstraintNullOfUserIdAndStaffIdAndFacilityId < ActiveRecord::Migration[5.2]
  def up
    change_column_null :schedules, :user_id, false
    change_column_null :schedules, :staff_id, false
    change_column_null :schedules, :facility_id, false
  end

  def down
    change_column_null :schedules, :user_id, true
    change_column_null :schedules, :staff_id, true
    change_column_null :schedules, :facility_id, true
  end
end
