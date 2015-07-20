Rails.application.routes.draw do
  post 'web_rtc/connect' => 'web_rtc#connect', as: 'rtc_connect'

  root 'welcome#index'
  resources :users

  get '/login' => 'sessions#new', as: 'login'
  post '/login' => 'sessions#create', as: 'create_session'
  delete '/logout' => 'sessions#destroy', as: 'logout'
  post '/chat_rooms' => 'chat_rooms#create', as: 'create_chat_room'
  put 'chat_rooms/:id' => 'chat_rooms#update', as: 'update_chat_room'
  get 'chat_rooms/:id' => 'chat_rooms#show', as: 'chat_room'
  get 'feedbacks/new' => 'feedbacks#new', as: 'new_feedback'
  get 'feedbacks/:id' => 'feedbacks#show', as: 'feedback'
  post '/feedbacks' => 'feedbacks#create', as: 'create_feedback'
  post '/invitations' => 'invitations#create', as: 'create_invitation'
  delete '/invitations' => 'invitations#destroy', as: 'delete_invitation'
  post '/pusher/auth' => 'pusher#auth'
end
