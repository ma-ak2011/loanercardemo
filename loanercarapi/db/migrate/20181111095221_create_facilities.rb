class CreateFacilities < ActiveRecord::Migration[5.2]
  def up
    create_table :facilities do |t|
      t.string :name
      t.string :facility_type
      t.references :user, foreign_key: true

      t.timestamps
    end
  end

  def down
    drop_table :facilities
  end
end
