class AlterTableSchedulesAddColumnRentalReason < ActiveRecord::Migration[5.2]
  def up
    add_column :schedules, :rental_reason, :integer
  end

  def down
    remove_column :schedules, :rental_reason
  end
end
