class ContentSerializer
  include JSONAPI::Serializer
  attributes :title, :comment
  belongs_to :situation
end
