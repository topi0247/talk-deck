class Api::V1::TargetsController < ApplicationController
  def index
    targets = Target.all
    render json: targets, status: :ok
  end

  private

  def target_params
    params.require(:target).permit(:body)
  end
end
