class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :name
      t.language :references
      t.level :references

      t.timestamps null: false
    end
  end
end
