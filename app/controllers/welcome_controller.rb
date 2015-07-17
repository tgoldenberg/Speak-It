class WelcomeController < ApplicationController

  def index
  	if logged_in?
  	  @user = current_user
  	  @available_users = User.all
  	else
	  	@user = User.new  		
  	end
  end
  
end
