# frozen_string_literal: true

class FacilitiesController < ApplicationController
  before_action :authenticate_token

  def index
    facilities = Facility.where(user_id: params[:user_id])
    list = facilities.map do |facility|
      {
        id: facility.id,
        name: facility.name,
        car_type: facility.car_type,
        expire_date: facility.expire_date,
        memo: facility.memo
      }
    end
    render json: { status: 200, facilities: list }
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def create
    facility = Facility.new(params.permit(
                              :user_id,
                              :name,
                              :car_type,
                              :expire_date,
                              :memo
                            ))

    if facility.invalid?
      render json: { status: 400, messages: facility.errors.messages }
    end

    facility.save!
    render json: { status: 200, id: facility.id }
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def destroy
    Facility.where(user_id: params[:user_id])
            .where(id: params[:id]).destroy_all
    render json: { status: 200 }
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def update
    facility = Facility.find_by(user_id: params[:user_id], id: params[:id])
    render json: { status: 402 } if facility.nil?

    render json: { status: 200, id: facility.id } if facility.update(
      params.permit(
        :name,
        :car_type,
        :expire_date,
        :memo
      )
    )
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end
end
