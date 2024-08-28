class LikeSerializer < ActiveModel::Serializer
  attributes :user, :title, :uuid, :isLike
  has_many :contents
  has_many :targets

  def user
    { uuid: object.situation.user.uuid, name: object.situation.user.name }
  end

  def title
    object.situation.title
  end

  def uuid
    object.situation.uuid
  end

  def isLike
    if @instance_options[:current_user].present?
      @instance_options[:current_user].likes.exists?(situation_id: object.situation.id)
    else
      false
    end
  end
end
