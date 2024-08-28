class UserSerializer < ActiveModel::Serializer
  attributes :name, :uuid
  has_many :situations
end
