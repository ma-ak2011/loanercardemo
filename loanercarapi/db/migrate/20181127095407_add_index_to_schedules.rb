class AddIndexToSchedules < ActiveRecord::Migration[5.2]
  def up
    add_index :schedules, %i[user_id id]
  end

  def down
    remove_index :schedules, %i[user_id id]
  end
end
