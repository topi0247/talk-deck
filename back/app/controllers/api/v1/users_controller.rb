class Api::V1::UsersController < Api::V1::BasesController
  def show
    if @current_user
      render json: @current_user, serializer: UserSerializer, status: :ok
    else
      render json: { error: 'ユーザーが見つかりません' }, status: :not_found
    end
  end

  def update
    if @current_user.update(user_params)
      render json: { name: @current_user.name }, status: :ok
    else
      render json: { error: '更新に失敗しました' }, status: :unprocessable_entity
    end
  end

  def destroy
    if @current_user.destroy
      render json: { message: 'ユーザーを削除しました' }, status: :ok
    else
      render json: { error: '削除に失敗しました' }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
