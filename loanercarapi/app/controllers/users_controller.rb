# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_token, except: :create

  def create
    user = User.new(params.permit(
                      :email, :password, :name, :company_name
                    ))

    if user.invalid?
      render json: { status: 400, messages: user.errors.messages }
    end

    user.save!
    render json: { status: 200, user: {
      id: user.id,
      token: user.token,
      name: user.name,
      email: user.email
    }}
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def show
    user = User.find_by(id: params[:id])
    render json: { status: 200, user: {
      id: user.id,
      token: user.token,
      name: user.name,
      email: user.email
    }}
  end
end
