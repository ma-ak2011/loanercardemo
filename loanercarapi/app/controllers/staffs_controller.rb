# frozen_string_literal: true

class StaffsController < ApplicationController
  before_action :authenticate_token

  def index
    staffs = Staff.where(user_id: params[:user_id])
    list = staffs.map do |staff|
      {
        id: staff.id,
        name: staff.name,
        memo: staff.memo
      }
    end
    render json: { status: 200, staffs: list }
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def create
    staff = Staff.new(params.permit(
                        :user_id,
                        :name,
                        :memo
                      ))

    if staff.invalid?
      render json: { status: 400, messages: staff.errors.messages }
    end

    staff.save!
    render json: { status: 200, id: staff.id }
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def destroy
    Staff.where(user_id: params[:user_id])
         .where(id: params[:id]).destroy_all
    render json: { status: 200 }
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end

  def update
    staff = Staff.find_by(user_id: params[:user_id], id: params[:id])
    render json: { status: 402 } if staff.nil?

    render json: { status: 200, id: staff.id } if staff.update(
      params.permit(
        :name,
        :memo
      )
    )
  rescue StandardError => e
    Rails.logger.error(e.message)
    render json: { messages: [ERROR500], status: 500 }
  end
end
