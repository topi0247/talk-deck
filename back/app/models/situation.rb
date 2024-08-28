class Situation < ApplicationRecord
  belongs_to :user
  has_many :contents, dependent: :destroy
  has_many :situation_targets, dependent: :destroy
  has_many :targets, through: :situation_targets

  validates :title, presence: true, length: { maximum: 36 }
  validates :uuid, presence: true, uniqueness: true
  validate :validate_targets

  def validate_targets
    errors.add(:targets, 'ターゲットは3つまで') if targets.size > 3
  end
end
