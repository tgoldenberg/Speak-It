class WelcomeController < ApplicationController

  def index
  	if logged_in?
  	  @user = current_user
      @invitation = Invitation.new
      @active_invitations = @user.received_invitations.where(seen: false).pluck('DISTINCT sender_id').map{|sender_id| Invitation.find_by(recipient_id: @user.id, sender_id: sender_id) }.reverse
  	  @available_users = User.all.includes(:level, :country, :native_language, :study_language)
  	else
	  	@user = User.new
  	end
  end

end
