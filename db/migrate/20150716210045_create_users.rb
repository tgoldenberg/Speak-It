class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false, uniqueness: true
      t.string :email, null: false, uniqueness: true
      t.string :password_digest, null: false
      t.references :country, index: true, foreign_key: true
      t.references :native_language, index: true, foreign_key: true
      t.references :study_language, index: true, foreign_key: true
      t.string :avatar_url, default: "https://i1.wp.com/design.atlassian.com/1.4/images/avatars/default-user/192/user-avatar-blue-96%402x.png?ssl=1"
      t.integer :points, default: 0
      t.references :level, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
