# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_09_130800) do

  create_table "customers", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email"
    t.string "name", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "driver_type"
    t.string "memo", limit: 1000, default: "", null: false
    t.index ["user_id", "id"], name: "index_customers_on_user_id_and_id"
    t.index ["user_id"], name: "index_customers_on_user_id"
  end

  create_table "facilities", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "car_type"
    t.string "memo", limit: 1000, default: "", null: false
    t.datetime "expire_date", null: false
    t.index ["user_id", "id"], name: "index_facilities_on_user_id_and_id"
    t.index ["user_id"], name: "index_facilities_on_user_id"
  end

  create_table "schedules", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "facility_id", null: false
    t.datetime "start", null: false
    t.datetime "end", null: false
    t.bigint "customer_id"
    t.bigint "staff_id"
    t.string "memo", limit: 1000, default: "", null: false
    t.integer "rental_reason"
    t.index ["customer_id"], name: "fk_rails_b367e1df40"
    t.index ["facility_id"], name: "fk_rails_e9e7eaf3a8"
    t.index ["staff_id"], name: "fk_rails_47d3b4284b"
    t.index ["user_id", "id"], name: "index_schedules_on_user_id_and_id"
    t.index ["user_id"], name: "index_schedules_on_user_id"
  end

  create_table "staffs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email"
    t.string "name", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "memo", limit: 1000, default: "", null: false
    t.index ["user_id"], name: "index_staffs_on_user_id"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email", null: false
    t.string "string"
    t.string "password_digest"
    t.string "name"
    t.string "company_name"
    t.string "address"
    t.string "token"
    t.datetime "token_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "customers", "users", on_delete: :cascade
  add_foreign_key "facilities", "users", on_delete: :cascade
  add_foreign_key "schedules", "customers", on_delete: :cascade
  add_foreign_key "schedules", "facilities", on_delete: :cascade
  add_foreign_key "schedules", "staffs", on_delete: :cascade
  add_foreign_key "schedules", "users", on_delete: :cascade
  add_foreign_key "staffs", "users", on_delete: :cascade
end
