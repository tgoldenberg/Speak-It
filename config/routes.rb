Rails.application.routes.draw do
  post 'web_rtc/connect' => 'web_rtc#connect', as: 'rtc_connect'

  root 'welcome#index'
  resources :users, only: [:create, :new, :edit, :destroy, :update, :show]
  get '/change_locale/:locale', to: 'settings#change_locale', as: :change_locale
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
  put '/invitations/miss/:id' => 'invitations#recipient_miss', as: 'missed_invitation'
  put '/invitations/decline/:id' => 'invitations#recipient_decline', as: 'declined_invitation'
  delete '/invitations/:id' => 'invitations#sender_cancel', as: 'delete_invitation'
  post '/pusher/auth' => 'pusher#auth'
  put '/invitations/seen' => 'invitations#update_seen', as: 'make_invitation_seen'
  get 'auth/:provider/callback', to: 'sessions#omniauth'
  get 'auth/failure', to: redirect('/')
  post 'auth/:provider/callback', to: 'sessions#omniauth'
  post 'auth/failure', to: redirect('/')
  get 'sessions/omniauth_select_languages', to: 'sessions#omniauth_select_languages', as: 'omniauth_select_languages'
end
