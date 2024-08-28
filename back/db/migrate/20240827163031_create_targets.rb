class CreateTargets < ActiveRecord::Migration[7.1]
  def change
    create_table :targets do |t|
      t.string :body, null: false, limit: 9
    end
    add_index :targets, :body, unique: true
  end
end
