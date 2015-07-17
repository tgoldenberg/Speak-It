class WelcomeController < ApplicationController

  def index
  	if logged_in?
  	  @user = current_user
  	  @available_users = User.all.includes(:level, :country, :native_language, :study_language)
  	else
	  	@user = User.new
  	end
  end

end
