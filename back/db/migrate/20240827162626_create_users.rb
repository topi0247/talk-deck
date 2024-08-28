class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :provider, null: false
      t.string :uid, null: false
      t.string :name, null: false, limit: 10
      t.string :uuid, null: false

      t.timestamps
    end
    add_index :users, %i[provider uid], unique: true
    add_index :users, :uuid, unique: true
  end
end
