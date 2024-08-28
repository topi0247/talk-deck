class SituationSerializer < ActiveModel::Serializer
  attributes :uuid, :title
  belongs_to :user
  has_many :contents
  has_many :targets
  has_many :likes
end
