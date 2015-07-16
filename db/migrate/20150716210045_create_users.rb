class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.integer :country_id
      t.integer :native_language_id
      t.integer :study_language_id
      t.string :avatar_url
      t.integer :points
      t.integer :level_id

      t.timestamps null: false
    end
  end
end
