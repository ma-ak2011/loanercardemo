class Facility < ApplicationRecord
  belongs_to :user
  has_many :schedules, foreign_key: :facility_id, dependent: :destroy

  # validations
  validates_presence_of :user_id, :name
end
