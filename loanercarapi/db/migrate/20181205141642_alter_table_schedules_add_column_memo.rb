# frozen_string_literal: true

class AlterTableSchedulesAddColumnMemo < ActiveRecord::Migration[5.2]
  def up
    add_column :schedules, :memo, :string, limit: 1000, null: false, default: ''
  end

  def down
    remove_column :schedules, :memo
  end
end
