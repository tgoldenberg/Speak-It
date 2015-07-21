class AddMissedToInvitations < ActiveRecord::Migration
  def change
    add_column :invitations, :missed, :boolean, default: false
  end
end
