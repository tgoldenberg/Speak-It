class WelcomeController < ApplicationController

  def index
  	if logged_in?
  	  @user = current_user
  	else
	  	@user = User.new  		
  	end
  end
  
end
