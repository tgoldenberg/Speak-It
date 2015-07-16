class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :name
      t.references :language
      t.references :level

      t.timestamps null: false
    end
  end
end
