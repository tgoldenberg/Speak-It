class WelcomeController < ApplicationController

  def index
  	if logged_in?
      @user = current_user
      @invitation = Invitation.new
      @active_invitations = @user.received_invitations.where(seen: false).pluck('DISTINCT sender_id').map{|sender_id| Invitation.find_by(recipient_id: @user.id, sender_id: sender_id) }.reverse
      @available_users = User.get_available_users(current_user)
      unavailable_users = User.get_unavailable_users(current_user)
      @available_recent_users = []
      @unavailable_recent_users = []
      @available_users.each do |user|
        chat = Chat.find_by(native_speaker_id: current_user.id, student_id: user.id)
        if (chat && chat.created_at > 1.weeks.ago)
          @available_recent_users << user
        end
      end
      unavailable_users.each do |user|
        chat = Chat.find_by(native_speaker_id: current_user.id, student_id: user.id)
        if (chat && chat.created_at > 1.weeks.ago)
          @unavailable_recent_users << user
        end
      end
  	else
	  	@user = User.new
  	end
  end

end
