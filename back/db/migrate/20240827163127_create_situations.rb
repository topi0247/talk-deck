class CreateSituations < ActiveRecord::Migration[7.1]
  def change
    create_table :situations do |t|
      t.string :title, null: false, limit: 36
      t.string :uuid, null: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
    add_index :situations, :uuid, unique: true
  end
end
