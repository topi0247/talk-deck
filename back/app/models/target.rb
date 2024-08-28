class Target < ApplicationRecord
  belongs_to :situation
  validates :body, presence: true, length: { maximum: 9 }
end
