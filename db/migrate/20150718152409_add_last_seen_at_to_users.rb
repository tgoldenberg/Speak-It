class AddLastSeenAtToUsers < ActiveRecord::Migration
  def change
    add_column :users, :last_seen_at, :datetime, default: 5.minutes.ago
  end
end
