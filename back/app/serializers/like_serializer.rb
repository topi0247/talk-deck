class LikeSerializer < ActiveModel::Serializer
  attributes :user, :title, :uuid, :isLikes
  has_many :contents
  has_many :targets

  def user
    {uuid: object.situation.user.uuid, name: object.situation.user.name}
  end

  def title
    object.situation.title
  end

  def uuid
    object.situation.uuid
  end
end
