class Schedule < ApplicationRecord
  belongs_to :user
  belongs_to :facility
  belongs_to :customer
  belongs_to :staff

  # validations
  validates_presence_of :user_id, :facility_id, :customer_id, :staff_id, :start, :end, :rental_reason
end
