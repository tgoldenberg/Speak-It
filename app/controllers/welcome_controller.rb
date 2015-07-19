class WelcomeController < ApplicationController

  def index
  	if logged_in?
      @user = current_user
      @invitation = Invitation.new
      @active_invitations = @user.received_invitations.where(seen: false).pluck('DISTINCT sender_id').map{|sender_id| Invitation.find_by(recipient_id: @user.id, sender_id: sender_id) }.reverse

      users = User.all.includes(:level, :country, :native_language,
      :study_language)
      @available_users =  users.where("last_seen_at > ? and id != ?", 10.minutes.ago, current_user.id)
      unavailable_users = users.where("last_seen_at <= ? and id != ?", 10.minutes.ago, current_user.id)
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
