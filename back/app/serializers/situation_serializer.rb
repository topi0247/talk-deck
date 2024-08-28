class SituationSerializer < ActiveModel::Serializer
  attributes :uuid, :title, :isLike
  belongs_to :user
  has_many :contents
  has_many :targets

  def isLike
    if @instance_options[:current_user].present?
      @instance_options[:current_user].likes.exists?(situation_id: object.id)
    else
      false
    end
  end
end
