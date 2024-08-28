class User < ApplicationRecord
  has_many :situations, dependent: :destroy
  has_many :likes, dependent: :destroy

  validates :provider, presence: true
  validates :uid, presence: true
  validates :name, presence: true, length: { maximum: 10 }
  validates :uuid, presence: true, uniqueness: true


  def self.find_or_create_from_auth(auth)
    provider = auth[:provider]
    uid = auth[:uid]
    name = auth[:info][:name]

    find_or_create_by(provider: provider, uid: uid) do |user|
      user.name = name.slice(0, 10)
      user.uuid = SecureRandom.uuid
    end
  end
end
