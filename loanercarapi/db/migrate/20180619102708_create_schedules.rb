class CreateSchedules < ActiveRecord::Migration[5.2]
  def up
    create_table :schedules do |t|
      t.datetime :from
      t.datetime :to
      t.references :user, foreign_key: true
      t.references :staff, foreign_key: true

      t.timestamps
    end
  end

  def down
    drop_table :schedules
  end
end
