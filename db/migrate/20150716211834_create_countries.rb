class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.string :name
      t.string :image_url

      t.timestamps null: false
    end
  end
end
