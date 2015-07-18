Rails.application.routes.draw do
  root 'welcome#index'
  resources :users

  get '/login' => 'sessions#new', as: 'login'
  post '/login' => 'sessions#create', as: 'create_session'
  delete '/logout' => 'sessions#destroy', as: 'logout'

  post '/chat_rooms' => 'chat_rooms#create', as: 'create_chat_room'
  get 'chat_rooms/:id' => 'chat_rooms#show', as: 'chat_room'

  post '/invitations' => 'invitations#create', as: 'create_invitation'
  delete '/invitations' => 'invitations#destroy', as: 'delete_invitation'
  post '/pusher/auth' => 'pusher#auth'
end
