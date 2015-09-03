class UsersController < ApplicationController

  def new
    @user = User.new
    @countries_select_array = Country.countries_as_select_list
    @languages_select_array = Language.languages_as_select_list
  end

  def create
    user = User.find_by(username: user_params[:username])
    if !user
      @user = User.new(user_params)
      @user.level = Level.find_beginner_language(user_params[:study_language_id])
      if @user.save
        session[:user_id] = @user.id
        flash[:notice] = [I18n.t('flash.successful_signup')]
        redirect_to root_path
      else
        flash[:alert] = [I18n.t('flash.failed_signup_first')]
        redirect_to new_user_path
      end
    else
      flash[:alert] = [I18n.t('flash.failed_signup_second')]
      redirect_to new_user_path
    end
  end

  def available_users
    @user = User.find(params[:user_id].to_i)
    @available_users_count = params[:available_users_count].to_i
    @new_available_users_count = User.get_available_users(@user).count 
    users_bool = false
    if @new_available_users_count > @available_users_count
      users_bool = "more users";
    elsif 
      @new_available_users_count < @available_users_count 
      users_bool = "less users";
    end
    render json: users_bool.to_json
  end

  def edit
    @user = User.find(params[:id])
    @countries_select_array = Country.countries_as_select_list
    @languages_select_array = Language.languages_as_select_list
    @active_invitations = User.get_active_invitations(@user)
    @missed_calls = User.get_missed_calls(@user)
  end

  def update
    @user = User.find(params[:id])
    @user.assign_attributes(user_params)
    if @user.save
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    session[:user_id] = nil 
    flash[:notice] = ["Account deleted successfully"]
    redirect_to root_path
  end

  def show
    @user = User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :country_id, :native_language_id,
      :study_language_id, :avatar_url, :points, :level_id, :last_seen_at, :provider, :uid, :oauth_token, :oauth_token_expires_at)
  end

end
