class Target < ApplicationRecord
  has_many :situation_targets, dependent: :destroy
  has_many :situations, through: :situation_targets
  validates :body, presence: true, uniqueness: true ,length: { maximum: 9 }
end
