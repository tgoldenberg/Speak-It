Rails.application.routes.draw do
  post '/invitations' => 'invitations#create', as: 'create_invitation'
  delete '/invitations' => 'invitations#destroy', as: 'delete_invitation'

  resources :users

  get '/login' => 'sessions#new', as: 'login'
  post '/login' => 'sessions#create', as: 'create_session'
  delete '/logout' => 'sessions#destroy', as: 'logout'

  root 'welcome#index'
end
