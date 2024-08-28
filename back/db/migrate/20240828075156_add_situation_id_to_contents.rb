class AddSituationIdToContents < ActiveRecord::Migration[7.1]
  def change
    add_column :contents, :situation_id, :integer
    add_index :contents, :situation_id
  end
end
