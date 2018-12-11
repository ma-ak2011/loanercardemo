class AddDleteCascadeForeignKeyOfFacilityies < ActiveRecord::Migration[5.2]
  def up
    remove_foreign_key :facilities, :users
    add_foreign_key :facilities, :users, column: 'user_id', on_delete: :cascade
  end

  def down
    remove_foreign_key :facilities, :users
    add_foreign_key :facilities, :users, column: 'user_id'
  end
end
