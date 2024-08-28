Rails.application.routes.draw do
  get '/auth/:provider/callback', to: 'api/v1/sessions#create'
  namespace :api do
    namespace :v1 do
      get 'situations/all_count', to: 'situations#all_count'
      get 'situations/current_user', to: 'situations#current_user_situations'
      get 'situations/current_user_all_count', to: 'situations#current_user_all_count'
      get 'likes_all_count', to: 'likes#all_count'
      resource :users, only: %i[show update]
      resources :situations, only: %i[index show create]
      resources :targets, only: %i[index create]
      resources :likes, only: %i[index create destroy]
    end
  end
end
