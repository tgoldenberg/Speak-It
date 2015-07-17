Rails.application.routes.draw do
  get '/login' => 'sessions#new', as: 'login'
  post '/login' => 'sessions#create', as: 'create_session'
  delete '/logout' => 'sessions#destroy', as: 'logout'

  root 'welcome#index'
end
