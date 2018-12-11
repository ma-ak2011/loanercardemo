# frozen_string_literal: true

class User < ApplicationRecord
  attr_accessor(
    :VALID_EMAIL_REGEX
  )
  has_many :staff, foreign_key: :user_id, dependent: :destroy
  has_many :facilities, foreign_key: :user_id, dependent: :destroy
  has_many :schedules, foreign_key: :user_id, dependent: :destroy

  # validations
  validates :email,
            presence: true, uniqueness: true,
            length: { maximum: 75 },
            format: { with: VALID_EMAIL_REGEX }

  has_secure_token
  has_secure_password

  def self.valid_login?(email, password)
    user = find_by(email: email)
    user if user&.authenticate(password)
  end

  def self.with_unexpired_token(token, period)
    where(token: token).where('token_created_at >= ?', period).first
  end

  def allow_token_to_be_used_only_once
    regenerate_token
    touch(:token_created_at)
  end

  def logout
    invalidate_token
  end

  private

  # This method is not available in has_secure_token
  def invalidate_token
    update_columns(token: nil)
  end

  def validate_password?
    password.present? || password_confirmation.present?
  end
end
