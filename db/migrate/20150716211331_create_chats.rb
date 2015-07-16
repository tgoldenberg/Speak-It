class CreateChats < ActiveRecord::Migration
  def change
    create_table :chats do |t|
      t.references :student, index: true, foreign_key: true
      t.references :native_speaker, index: true, foreign_key: true
      t.references :topic, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
