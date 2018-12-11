class DropFromAndToAndAddStartAndEndFromSchedules < ActiveRecord::Migration[5.2]
  def up
    add_column :schedules, :start, :datetime, null: false
    add_column :schedules, :end, :datetime, null: false
    remove_column :schedules, :from
    remove_column :schedules, :to
  end

  def down
    remove_column :schedules, :start
    remove_column :schedules, :end
    add_column :schedules, :from, :datetime
    add_column :schedules, :to, :datetime
  end
end
