class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = User.find_by(username: user_params[:username])
    if user && user.authenticate(user_params[:password])
      session[:user_id] = user.id
      flash[:notice] = [I18n.t('flash.successful_login')]
      redirect_to root_path
    else
      flash[:alert] = [I18n.t('flash.failed_login')]
      redirect_to root_path
    end
  end

  def omniauth
    @omniauth = env["omniauth.auth"]
    if !env["omniauth.auth"]
      flash[:alert] = ["Invalid token."]
      redirect_to root_path
    end
    @user = User.from_omniauth(env["omniauth.auth"])
    if @user.id
      session[:user_id] = @user.id
      redirect_to root_path
    end
    @new_user = User.new
    @countries_select_array = Country.countries_as_select_list
    @languages_select_array = Language.languages_as_select_list
  end

  def omniauth_select_languages
    @user = params[:user]
    p @user
  end

  def destroy
    session[:user_id] = nil
    flash[:notice] = [I18n.t('flash.successful_logout')]
    redirect_to root_path
  end

  def user_params
    params.require(:user).permit(:username, :email, :password, :country_id, :native_language_id,
      :study_language_id, :avatar_url, :points, :level_id)
  end
end
