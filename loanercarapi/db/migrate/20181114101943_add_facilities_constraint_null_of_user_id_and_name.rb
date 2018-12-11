class AddFacilitiesConstraintNullOfUserIdAndName < ActiveRecord::Migration[5.2]
  def up
    change_column_null :facilities, :user_id, false
    change_column_null :facilities, :name, false
  end

  def down
    change_column_null :facilities, :user_id, true
    change_column_null :facilities, :name, true
  end
end
