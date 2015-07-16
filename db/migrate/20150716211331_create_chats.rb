class CreateChats < ActiveRecord::Migration
  def change
    create_table :chats do |t|
      t.integer :student_id
      t.integer :native_id
      t.integer :topic_id

      t.timestamps null: false
    end
  end
end
