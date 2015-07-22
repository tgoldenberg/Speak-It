# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150721142225) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chat_rooms", force: :cascade do |t|
    t.integer  "creator_id"
    t.integer  "invitee_id"
    t.integer  "turn",       default: 0
    t.boolean  "completed",  default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "chats", force: :cascade do |t|
    t.integer  "student_id"
    t.integer  "native_speaker_id"
    t.integer  "topic_id"
    t.integer  "chat_room_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "countries", force: :cascade do |t|
    t.string   "name"
    t.string   "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "feedbacks", force: :cascade do |t|
    t.integer  "chat_id"
    t.integer  "rating",       null: false
    t.text     "comment"
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "feedbacks", ["chat_id"], name: "index_feedbacks_on_chat_id", using: :btree

  create_table "invitations", force: :cascade do |t|
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.boolean  "seen",         default: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.boolean  "declined",     default: false
    t.boolean  "missed",       default: false
  end

  create_table "languages", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "code"
    t.string   "img_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "levels", force: :cascade do |t|
    t.string   "name"
    t.integer  "value"
    t.integer  "language_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "levels", ["language_id"], name: "index_levels_on_language_id", using: :btree

  create_table "topics", force: :cascade do |t|
    t.string   "name",        null: false
    t.integer  "language_id"
    t.integer  "level_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "topics", ["language_id"], name: "index_topics_on_language_id", using: :btree
  add_index "topics", ["level_id"], name: "index_topics_on_level_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",                                                                                                                                     null: false
    t.string   "email",                                                                                                                                        null: false
    t.string   "password_digest",                                                                                                                              null: false
    t.integer  "country_id"
    t.integer  "native_language_id"
    t.integer  "study_language_id"
    t.string   "avatar_url",         default: "https://i1.wp.com/design.atlassian.com/1.4/images/avatars/default-user/192/user-avatar-blue-96%402x.png?ssl=1"
    t.integer  "points",             default: 0
    t.integer  "level_id"
    t.datetime "created_at",                                                                                                                                   null: false
    t.datetime "updated_at",                                                                                                                                   null: false
    t.datetime "last_seen_at",       default: '2015-07-22 14:27:13'
  end

  add_index "users", ["country_id"], name: "index_users_on_country_id", using: :btree
  add_index "users", ["level_id"], name: "index_users_on_level_id", using: :btree

  add_foreign_key "feedbacks", "chats"
  add_foreign_key "levels", "languages"
  add_foreign_key "topics", "languages"
  add_foreign_key "topics", "levels"
  add_foreign_key "users", "countries"
  add_foreign_key "users", "levels"
end
