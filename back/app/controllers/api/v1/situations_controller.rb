include Pagy::Backend

class Api::V1::SituationsController < Api::V1::BasesController
  skip_before_action :authenticate!, only: %i[index show]

  def index
    current_page = params[:page] || 1
    pagy, situation = pagy(Situation.includes(:targets, :contents).all, page: current_page)
    render json: situations, status: :ok
  end

  def show
    situation = Situation.find(params[:id])
    render json: situation, status: :ok
  end

  def create
    ApplicationRecord.transaction do
      situation = Situation.new(situation_params.except(:targets, :body))
      situation.user = @current_user
      situation.save!

      situation_params[:targets].each do |target_body|
        target = Target.find_or_create_by!(body: target_body)
        situation.targets << target
      end

      situation_params[:body].each do |content|
        situation.contents.create!(content)
      end

      render json: {uuid: situation.uuid}, status: :created
    rescue ActiveRecord::RecordInvalid => e
      Rails.logger.error(e.message)
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def all_count
    render json: { count: Situation.all.count }, status: :ok
  end

  private

  def situation_params
    params.require(:situation).permit(:title, targets: [], body: [:title, :comment])
  end
end
