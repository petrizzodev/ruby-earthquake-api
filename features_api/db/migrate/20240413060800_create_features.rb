class CreateFeatures < ActiveRecord::Migration[7.1]
  def change
    create_table :features do |t|
      t.string :external_id
      t.float :mag
      t.string :place
      t.integer :time
      t.string :url
      t.integer :tsunami
      t.string :magType
      t.string :title
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
