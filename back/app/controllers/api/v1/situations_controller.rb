include Pagy::Backend

class Api::V1::SituationsController < Api::V1::BasesController
  skip_before_action :authenticate!, only: %i[index show all_count]

  def index
    current_page = params[:page] || 1
    total_page = (Situation.all.count / 9).ceil
    current_page = total_page if current_page.to_i >= total_page
    current_page = 1 if current_page.to_i <= 0
    pagy, situations = pagy(Situation.includes(:targets, :contents).all.order(created_at: :desc), page: current_page, limit: 9)
    render json: situations, each_serializer: SituationSerializer, current_user: @current_user, status: :ok
  end

  def show
    situation = Situation.find_by(uuid: params[:id])
    render json: situation, serializer: SituationSerializer, current_user: @current_user, status: :ok
  end

  def create
    ApplicationRecord.transaction do
      situation = Situation.new(situation_params.except(:targets, :body))
      situation.user = @current_user
      situation.save!

      situation_params[:targets].each do |target_body|
        next if target_body.blank?
        target = Target.find_or_create_by!(body: target_body)
        situation.targets << target
      end

      situation_params[:body].each do |content|
        situation.contents.create!(content)
      end

      render json: {uuid: situation.uuid}, status: :created
    rescue => e
      Rails.logger.error(e.message)
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def all_count
    render json: { count: Situation.all.count }, status: :ok
  end

  def current_user_all_count
    render json: { count: @current_user.situations.count }, status: :ok
  end

  def current_user_situations
    current_page = params[:page] || 1
    total_page = (@current_user.situations.count / 9).ceil
    current_page = total_page if current_page.to_i >= total_page
    current_page = 1 if current_page.to_i <= 0
    pagy, situations = pagy(@current_user.situations.order(created_at: :desc), page: current_page)
    render json: situations, each_serializer: SituationSerializer, status: :ok
  end

  private

  def situation_params
    params.require(:situation).permit(:title, targets: [], body: [:title, :comment])
  end
end
