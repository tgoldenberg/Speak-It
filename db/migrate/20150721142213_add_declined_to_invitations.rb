class AddDeclinedToInvitations < ActiveRecord::Migration
  def change
    add_column :invitations, :declined, :boolean, default: false
  end
end
