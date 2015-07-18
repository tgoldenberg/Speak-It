class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def new
    @user = User.new
    @countries_select_array = Country.all.map {|country|[country.name,country.id]}.sort
    @languages_select_array = Language.all.map {|language| [language.name,language.id]}
  end

  def create
    user = User.find_by(username: user_params[:username])
    if !user
      @user = User.new(user_params)
      if @user.save
        session[:user_id] = @user.id
        flash[:notice] = ["Successfully registered."]
        redirect_to root_path
      else
        flash[:alert] = ["A user with that name or email already exists"]
        redirect_to new_user_path
      end
    else
      flash[:alert] = ["A user with that username already exists."]
      redirect_to new_user_path
    end
  end

  def edit
    find_user
  end

  def update
    find_user
    @user.assign_attributes(user_params)
    if @user.save
      redirect_to @user
    else
      render :edit
    end
  end

  def show
    find_user
  end

  def destroy
    find_user
    @user.destroy if @user
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :country_id, :native_language_id,
      :study_language_id, :avatar_url, :points, :level_id)
  end

  def find_user
    @user = User.find_by(id: params[:id])
  end
end
