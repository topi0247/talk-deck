class CreateSituationTargets < ActiveRecord::Migration[7.1]
  def change
    create_table :situation_targets do |t|
      t.references :situation, null: false, foreign_key: true
      t.references :target, null: false, foreign_key: true
    end
  end
end
