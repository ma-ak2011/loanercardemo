class DropColumnStaffIdAndAddColumnCustomerId < ActiveRecord::Migration[5.2]
  def up
    add_column :schedules, :customer_id, :integer
    remove_column :schedules, :staff_id
  end

  def down
    remove_column :schedules, :customer_id
    add_column :schedules, :staff_id, :bigint
    add_foreign_key :schedules, :staffs, column: 'staff_id'
  end
end
