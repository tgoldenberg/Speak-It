class WelcomeController < ApplicationController

  def index
  	if logged_in?
      @user = current_user
      @invitation = Invitation.new
      @active_invitations = User.get_active_invitations(@user)
      @missed_calls = User.get_missed_calls(@user)
      @available_users = User.get_available_users(@user)
      @available_recent_users = User.find_recent_users(@available_users, @user)
      @unavailable_recent_users = User.find_recent_users(User.get_unavailable_users(@user), @user)
  	else
	  	@user = User.new
  	end
  end

end
