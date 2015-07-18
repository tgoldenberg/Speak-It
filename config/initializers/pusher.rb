require 'pusher'

app_id = ENV["pusher_app_id"]
pusher_key = ENV["pusher_key"]
secret = ENV["pusher_secret"]

Pusher.url = "https://#{pusher_key}:#{secret}@api.pusherapp.com/apps/#{app_id}"
Pusher.logger = Rails.logger
