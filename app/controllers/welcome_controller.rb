class WelcomeController < ApplicationController

  def index
  	if logged_in?
      @user = current_user
      @invitation = Invitation.new
      @active_invitations = User.get_active_invitations(@user)
      @missed_calls = User.get_missed_calls(@user)
      @available_users = User.get_available_users(@user)
      @available_recent_users = User.find_recent_users(@user, @available_users, false)
      @unavailable_recent_users = User.find_recent_users(@user, @available_users, true)
      @helper_text = {
        calling: I18n.t('calls.calling'),
        declined_message: I18n.t('calls.declined_message'),
        timed_out_message: I18n.t('calls.timed_out_message'),
        missed_message: I18n.t('calls.missed_message'),
        new_call: I18n.t('calls.new_call'),
        cancelled_call: I18n.t('calls.cancelled_call')
      }
  	else
	  	@user = User.new
  	end
  end

end
