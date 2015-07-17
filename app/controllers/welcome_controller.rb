class WelcomeController < ApplicationController

  def index
  	if logged_in?
  	  @user = current_user
      @invitation = Invitation.new
      #@active_invitations =
  	  @available_users = User.all.includes(:level, :country, :native_language, :study_language)
  	else
	  	@user = User.new
  	end
  end

end
