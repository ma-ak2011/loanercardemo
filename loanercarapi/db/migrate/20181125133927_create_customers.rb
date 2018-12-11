# frozen_string_literal: true

class CreateCustomers < ActiveRecord::Migration[5.2]
  def up
    create_table :customers do |t|
      t.string :email
      t.string :name, null: false
      t.integer :age, null: false
      t.references :user

      t.timestamps
    end
    change_column_null :customers, :user_id, false
    add_foreign_key :customers, :users, column: 'user_id', on_delete: :cascade
  end

  def down
    drop_table :customers
  end
end
