class CreateUsers < ActiveRecord::Migration[5.2]
  def up
    create_table :users do |t|
      t.string :email, :string, null: false
      t.string :password_digest, :string
      t.string :name
      t.string :company_name
      t.string :address
      t.string :token
      t.datetime :token_created_at

      t.timestamps
    end
  end

  def down
    drop_table :users
  end
end
