# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_08_27_165036) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contents", force: :cascade do |t|
    t.string "title", limit: 36, null: false
    t.string "comment", limit: 50
    t.integer "order_by", default: 0, null: false
  end

  create_table "situation_targets", force: :cascade do |t|
    t.bigint "situation_id", null: false
    t.bigint "target_id", null: false
    t.index ["situation_id"], name: "index_situation_targets_on_situation_id"
    t.index ["target_id"], name: "index_situation_targets_on_target_id"
  end

  create_table "situations", force: :cascade do |t|
    t.string "title", limit: 36, null: false
    t.string "uuid", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_situations_on_user_id"
    t.index ["uuid"], name: "index_situations_on_uuid", unique: true
  end

  create_table "targets", force: :cascade do |t|
    t.string "body", limit: 9, null: false
    t.index ["body"], name: "index_targets_on_body", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", null: false
    t.string "uid", null: false
    t.string "name", limit: 10, null: false
    t.string "uuid", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true
    t.index ["uuid"], name: "index_users_on_uuid", unique: true
  end

  add_foreign_key "situation_targets", "situations"
  add_foreign_key "situation_targets", "targets"
  add_foreign_key "situations", "users"
end
