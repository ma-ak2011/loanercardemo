# frozen_string_literal: true

class CustomersController < ApplicationController
  before_action :authenticate_token

  def index
    customers = Customer.where(user_id: params[:user_id])
    list = customers.map do |customer|
      {
        id: customer.id,
        name: customer.name,
        driver_type: customer.driver_type,
        memo: customer.memo
      }
    end
    render json: { status: 200, customers: list }
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def create
    customer = Customer.new(params.permit(
                              :user_id,
                              :name,
                              :driver_type,
                              :memo
                            ))

    if customer.invalid?
      render json: { status: 400, messages: customer.errors.messages }
    end

    customer.save!
    render json: { status: 200, id: customer.id }
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def destroy
    Customer.where(user_id: params[:user_id])
            .where(id: params[:id]).destroy_all
    render json: { status: 200 }
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def update
    customer = Customer.find_by(user_id: params[:user_id], id: params[:id])
    render json: { status: 402 } if customer.nil?

    render json: { status: 200, id: customer.id } if customer.update(
      params.permit(
        :name,
        :driver_type,
        :memo
      )
    )
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end
end
