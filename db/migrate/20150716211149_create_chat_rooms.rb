class CreateChatRooms < ActiveRecord::Migration
  def change
    create_table :chat_rooms do |t|
      t.integer :creator_id
      t.integer :invitee_id
      t.integer :turn, default: 0
      t.boolean :completed, default: false

      t.timestamps null: false
    end
  end
end
