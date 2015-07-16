class CreateInvitations < ActiveRecord::Migration
  def change
    create_table :invitations do |t|
      t.integer :sender_id
      t.integer :recipient_id
      t.boolean :seen, default: false

      t.timestamps null: false
    end
  end
end
