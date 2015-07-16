class CreateLanguages < ActiveRecord::Migration
  def change
    create_table :languages do |t|
      t.string :name, null: false, uniqueness: true
      t.string :code, null: false, uniqueness: true
      t.string :img_url

      t.timestamps null: false
    end
  end
end
