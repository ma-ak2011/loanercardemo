class AlterTableSchedulesAlterCustomerIdBigInteger < ActiveRecord::Migration[5.2]
  def up
    change_column :schedules, :customer_id, :bigint
  end

  def down
    change_column :schedules, :customer_id, :integer
  end
end
