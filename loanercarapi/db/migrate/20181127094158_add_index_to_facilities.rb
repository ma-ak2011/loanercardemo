# frozen_string_literal: true

class AddIndexToFacilities < ActiveRecord::Migration[5.2]
  def up
    add_index :facilities, %i[user_id id]
  end

  def down
    remove_index :facilities, %i[user_id id]
  end
end
