# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:create], raise: false

  def create
    if user = User.valid_login?(params[:email], params[:password])
      user.allow_token_to_be_used_only_once
      send_auth_token_for_valid_login_of(user)
    else
      render_unauthorized('Error with your login or password')
    end
  end

  def destroy
    current_user.logout
    head :ok
  end

  def authenticate
    user = authenticate_token
    render json: { status: 200, user: user }
  end

  private

  def send_auth_token_for_valid_login_of(user)
    render json: { status: 200, user: user }
  end

  def allow_token_to_be_used_only_once_for(user)
    user.regenerate_token
  end

  def logout
    current_user.invalidate_token
  end
end
