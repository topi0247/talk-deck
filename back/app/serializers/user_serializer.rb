class UserSerializer
  include JSONAPI::Serializer
  attributes :name
  has_many :situations
end
