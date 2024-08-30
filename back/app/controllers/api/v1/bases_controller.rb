class Api::V1::BasesController < ApplicationController
  before_action :authenticate!

  def authenticate!
    token = request.headers['Authorization']
    return if token.blank?
    decode = Jwt.decode(token.split(' ').last).first
    expired = decode['expired']
    @current_user = nil
    if expired + 2.weeks < Time.now.to_i
      render json: { error: '認証期間切れです' }, status: :unauthorized
      return
    end
    user_id = decode['user_id']
    @current_user = User.find_by(id: user_id)
  end
end
