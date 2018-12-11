class AddIndexToCustomers < ActiveRecord::Migration[5.2]
  def up
    add_index :customers, %i[user_id id]
  end

  def down
    remove_index :customers, %i[user_id id]
  end
end
