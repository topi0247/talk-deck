class Like < ApplicationRecord
  belongs_to :user
  belongs_to :situation
  has_many :contents, through: :situation
  has_many :targets, through: :situation
end
