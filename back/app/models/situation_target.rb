class SituationTarget < ApplicationRecord
  belongs_to :situation
  belongs_to :target
end
