# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  def require_login
    authenticate_token || render_unauthorized('Access denied')
  end

  def current_user
    @current_user ||= authenticate_token
  end

  protected

  def render_unauthorized(message)
    errors = { errors: [{ detail: message }] }
    render json: errors, status: :unauthorized
  end

  def authenticate_token
    authenticate_or_request_with_http_token do |token, _options|
      if user = User.with_unexpired_token(token, 90.days.ago)
        # Compare the tokens in a time-constant manner, to mitigate timing attacks.
        ActiveSupport::SecurityUtils.secure_compare(
          ::Digest::SHA256.hexdigest(token),
          ::Digest::SHA256.hexdigest(user.token)
        )
        user
      end
    end
  end
end
