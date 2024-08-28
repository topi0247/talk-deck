class UserSerializer < ActiveModel::Serializer
  attributes :name, :uuid
  has_many :situations
  has_many :likes
end
