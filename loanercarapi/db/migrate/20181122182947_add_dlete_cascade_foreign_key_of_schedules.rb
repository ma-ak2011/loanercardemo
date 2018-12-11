class AddDleteCascadeForeignKeyOfSchedules < ActiveRecord::Migration[5.2]
  def up
    remove_foreign_key :schedules, :users
    remove_foreign_key :schedules, :staffs
    add_foreign_key :schedules, :users, column: 'user_id', on_delete: :cascade
    add_foreign_key :schedules, :staffs, column: 'staff_id', on_delete: :cascade
    add_foreign_key :schedules, :facilities, column: 'facility_id', on_delete: :cascade
  end

  def down
    remove_foreign_key :schedules, :users
    remove_foreign_key :schedules, :staffs
    remove_foreign_key :schedules, :facilities
    add_foreign_key :schedules, :users, column: 'user_id'
    add_foreign_key :schedules, :staffs, column: 'staff_id'
  end
end
