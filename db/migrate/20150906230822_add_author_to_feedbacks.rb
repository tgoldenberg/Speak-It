class AddAuthorToFeedbacks < ActiveRecord::Migration
  def change
  	add_column :feedbacks, :author, :string
  end
end
