class Staff < ApplicationRecord
  belongs_to :user
  has_many :schedules, foreign_key: :staff_id, dependent: :destroy

  # validations
  validates_presence_of :user_id, :name
end
