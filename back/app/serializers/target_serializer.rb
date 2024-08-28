class TargetSerializer < ActiveModel::Serializer
  attributes :body
  belongs_to :situation
end
