class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = User.find_by(username: user_params[:username])
    if user && user.authenticate(user_params[:password])
      session[:user_id] = user.id
      flash[:notice] = ["Successfully logged in."]
      redirect_to root_path
    else
      flash[:alert] = ["Invalid Username or Password"]
      redirect_to root_path
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:notice] = ["Successfully logged out."]
    redirect_to root_path
  end

  def user_params
    params.require(:user).permit(:username, :email, :password, :country_id, :native_language_id,
      :study_language_id, :avatar_url, :points, :level_id)
  end
end
