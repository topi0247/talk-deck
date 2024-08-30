include Pagy::Backend

class Api::V1::LikesController < Api::V1::BasesController

  def index
    current_page = calc_current_page(params[:page])
    pagy, situations = pagy(@current_user.likes.includes(situation: :contents), page: current_page, limit: 9)
    render json: situations, each_serializer: LikeSerializer, current_user: @current_user, status: :ok
  end

  def create
    situation = Situation.find_by(uuid: like_params[:uuid])
    like = Like.new(user: @current_user, situation: situation)
    if like.save
      head :created
    else
      head :bad_request
    end
  end

  def destroy
    situation = Situation.find_by(uuid: params[:id])
    like = Like.find_by(user: @current_user, situation: situation)
    if like.destroy
      head :ok
    else
      head :bad_request
    end
  end

  def all_count
    render json: { count: @current_user.likes.count }, status: :ok
  end

  private

  def like_params
    params.require(:like).permit(:uuid)
  end

  def calc_current_page(page)
    current_page = page || 1
    total_page = (Situation.all.count / 9.0).ceil
    current_page = total_page if current_page.to_i >= total_page
    current_page = 1 if current_page.to_i <= 0
    current_page
  end
end
