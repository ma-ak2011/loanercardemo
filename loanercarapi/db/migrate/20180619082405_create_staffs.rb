class CreateStaffs < ActiveRecord::Migration[5.2]
  def up
    create_table :staffs do |t|
      t.string :email
      t.string :name
      t.references :user, foreign_key: true

      t.timestamps
    end
  end

  def down
    drop_table :staffs
  end
end
