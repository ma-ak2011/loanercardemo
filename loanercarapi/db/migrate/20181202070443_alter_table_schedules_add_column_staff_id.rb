class AlterTableSchedulesAddColumnStaffId < ActiveRecord::Migration[5.2]
  def down
    remove_column :schedules, :staff_id
  end

  def up
    add_column :schedules, :staff_id, :bigint
    add_foreign_key :schedules, :staffs, column: 'staff_id', on_delete: :cascade
  end
end
