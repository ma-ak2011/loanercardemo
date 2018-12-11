# frozen_string_literal: true

class SchedulesController < ApplicationController
  before_action :authenticate_token

  def index
    schedules = Schedule.where(user_id: params[:user_id])
    list = schedules.map do |schedule|
      {
        id: schedule.id,
        customer_id: schedule.customer_id,
        staff_id: schedule.staff_id,
        facility_id: schedule.facility_id,
        start: schedule.start,
        end: schedule.end,
        memo: schedule.memo,
        rental_reason: schedule.rental_reason,
        user_id: schedule.user_id
      }
    end
    render json: { status: 200, schedules: list }
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def create
    schedule = Schedule.new(
      params.permit(:user_id, :customer_id, :staff_id,
                    :facility_id, :start, :end, :memo, :rental_reason)
    )

    schedule.save!
    render json: { status: 200, id: schedule.id }
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def update
    schedule = Schedule.find_by(user_id: params[:user_id], id: params[:id])
    render json: { status: 402 } if schedule.nil?

    render json: { status: 200, id: schedule.id } if schedule.update(
      params.permit(:customer_id, :staff_id, :facility_id, :start, :end, :memo, :rental_reason)
    )
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def destroy
    Schedule.where(user_id: params[:user_id])
            .where(id: params[:id]).destroy_all
    render json: { status: 200 }
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end
end
