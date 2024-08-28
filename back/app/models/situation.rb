class Situation < ApplicationRecord
  belongs_to :user
  has_many :contents, dependent: :destroy
  has_many :situation_targets, dependent: :destroy
  has_many :targets, through: :situation_targets
  has_many :likes, dependent: :destroy

  validates :title, presence: true, length: { maximum: 36 }
  validates :uuid, presence: true, uniqueness: true
  validate :validate_targets
  before_validation :set_uuid, on: :create

  def validate_targets
    errors.add(:targets, 'ターゲットは3つまで') if targets.size > 3
  end

  def set_uuid
    random_uuid = SecureRandom.uuid
    self.uuid = Base64.urlsafe_encode64([random_uuid.delete('-')].pack("H*")).tr('=', '')
  end
end
