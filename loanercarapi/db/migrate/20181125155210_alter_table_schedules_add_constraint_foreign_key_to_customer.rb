class AlterTableSchedulesAddConstraintForeignKeyToCustomer < ActiveRecord::Migration[5.2]
  def up
    add_foreign_key :schedules, :customers, column: 'customer_id', on_delete: :cascade
  end
  def down
    remove_foreign_key :schedules, :customers
  end
end
