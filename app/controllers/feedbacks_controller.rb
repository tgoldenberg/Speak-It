class FeedbacksController < ApplicationController
  def new
    @user = current_user
    @feedback = Feedback.new
    @chat_room = ChatRoom.find_by(id: params[:chat_room_id])
    @active_invitations = User.get_active_invitations(@user)
    @missed_calls = User.get_missed_calls(@user)
    @chat = @chat_room.chats.find_by(native_speaker_id: current_user.try(:id) )
    @ratings = Feedback.possible_ratings_for_select_list
  end

  def create
    feedback = Feedback.new(feedback_params)
    feedback.rating = feedback.pronunciation + feedback.vocabulary + feedback.descriptive
    feedback.author = current_user.username || User.find(feedback.sender_id).username
    if feedback.save
      flash[:notice] = [I18n.t('feedback.success')]
      redirect_to root_path
    else
      flash[:alert] = [I18n.t('feedback.fail')]
      redirect_to new_feedback_path
    end
  end

  def show
    @user = current_user
    @feedback = Feedback.find(params[:id])
    @active_invitations = User.get_active_invitations(@user)
    @missed_calls = User.get_missed_calls(@user)
  end

  private

  def feedback_params
    params.require(:feedback).permit(:rating, :comment, :author, :chat_id, :sender_id, :recipient_id, :pronunciation, :vocabulary, :descriptive)
  end
end
