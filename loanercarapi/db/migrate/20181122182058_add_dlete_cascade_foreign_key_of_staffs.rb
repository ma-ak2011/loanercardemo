# frozen_string_literal: true

class AddDleteCascadeForeignKeyOfStaffs < ActiveRecord::Migration[5.2]
  def up
    remove_foreign_key :staffs, :users
    add_foreign_key :staffs, :users, column: 'user_id', on_delete: :cascade
  end

  def down
    remove_foreign_key :staffs, :users
    add_foreign_key :staffs, :users, column: 'user_id'
  end
end
