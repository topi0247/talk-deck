Rails.application.routes.draw do
  get '/auth/:provider/callback', to: 'api/v1/sessions#create'
  namespace :api do
    namespace :v1 do
      resource :users, only: %i[show update]
      resources :situations, only: %i[index show create]
      resources :targets, only: %i[index create]
      get 'situations/all_count', to: 'situations#all_count'
    end
  end
end
