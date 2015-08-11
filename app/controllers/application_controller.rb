class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  before_action :set_last_seen_at, if: proc { logged_in? }
  before_action :set_locale

  def set_locale
    if cookies[:educator_locale] && I18n.available_locales.include?(cookies[:educator_locale].to_sym)
      l = cookies[:educator_locale].to_sym
    else
      l = I18n.default_locale
      cookies.permanent[:educator_locale] = l
    end
    I18n.locale = l
  end

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
