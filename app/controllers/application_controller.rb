class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_last_seen_at, if: proc { logged_in? }

  protected

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def set_last_seen_at
    current_user.assign_attributes(last_seen_at: Time.now)
    current_user.save
    session[:last_seen_at] = Time.now
  end

  def require_login
    unless logged_in?
      flash[:error] = "You must be logged in to access this section."
      redirect_to login_path
    end
  end

  def logged_in?
    !!session[:user_id]
  end

end
