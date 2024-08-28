class ContentSerializer < ActiveModel::Serializer
  attributes :title, :comment
  belongs_to :situation
end
