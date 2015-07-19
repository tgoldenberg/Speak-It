class FeedbacksController < ApplicationController
  def new
    @feedback = Feedback.new
    @chat_room = ChatRoom.find_by(id: params[:chat_room_id])
    @chat = @chat_room.chats.find_by(native_speaker_id: current_user.id)
    @ratings = [["One Star", 1], ["Two Stars", 2], ["Three Stars", 3]]
  end

  def create
    @feedback = Feedback.new(feedback_params)
    user = @feedback.recipient
    user.points += @feedback.rating * 2
    if user.points >= 10
      curr_level = user.level
      user.level = Level.find_by(language_id: curr_level.language_id,
        value: curr_level.value + 1) if user.level.value < 10
      user.points = 0
    end
    user.save
    if @feedback.save
      flash[:notice] = ["Successfully sent feedback."]
      redirect_to root_path
    else
      flash[:alert] = ["Feedback could not be sent."]
      redirect_to new_feedback_path
    end
  end

  def show
  end

  private

  def feedback_params
    params.require(:feedback).permit(:rating, :comment, :chat_id, :sender_id, :recipient_id)
  end
end