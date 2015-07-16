class CreateLevels < ActiveRecord::Migration
  def change
    create_table :levels do |t|
      t.string :name
      t.integer :value
      t.language :references

      t.timestamps null: false
    end
  end
end
