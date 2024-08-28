class Content < ApplicationRecord
  belongs_to :situation
  validates :title, presence: true, length: { maximum: 36 }
  validates :comment, presence: true, length: { maximum: 50 }
end