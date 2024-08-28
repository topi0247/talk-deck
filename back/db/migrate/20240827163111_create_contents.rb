class CreateContents < ActiveRecord::Migration[7.1]
  def change
    create_table :contents do |t|
      t.string :title, null: false, limit: 36
      t.string :comment, limit: 50
      t.integer :order_by, null: false, default: 0
    end
  end
end
