class TargetSerializer
  include JSONAPI::Serializer
  attributes :body
  belongs_to :situation
end
