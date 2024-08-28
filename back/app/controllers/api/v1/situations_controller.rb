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
    situation = Situation.new(situation_params)
    if situation.save
      render json: {uuid: situation.uuid}, status: :created
    else
      render json: { error: '登録に失敗しました' }, status: :unprocessable_entity
    end
  end

  def all_count
    render json: { count: Situation.all.count }, status: :ok
  end

  private

  def situation_params
    params.require(:situation).permit(:title, targets:[], body: [:title, :comment])
  end
end
