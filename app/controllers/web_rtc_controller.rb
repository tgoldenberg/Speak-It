class WebRtcController < ApplicationController
  def connect
    stream = params[:stream]
    other_user_id = params[:other_user_id]
    channel = 'private-conversation.' + other_user_id.to_s
    Pusher.trigger(channel, 'add_stream', stream.to_json)
    render json: "Good!"
  end
end
