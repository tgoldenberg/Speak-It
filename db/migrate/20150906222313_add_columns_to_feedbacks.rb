class AddColumnsToFeedbacks < ActiveRecord::Migration
  def change
  	add_column :feedbacks, :pronunciation, :integer
  	add_column :feedbacks, :vocabulary, :integer
  	add_column :feedbacks, :descriptive, :integer
  end
end
