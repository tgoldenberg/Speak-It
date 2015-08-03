module ApplicationHelper
  def logged_in?
    !!session[:user_id]
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def notification_helper_text
    data = {
      time_out: I18n.t('calls.timed_out_message'),
      declined: I18n.t('calls.declined_message'),
      incoming: I18n.t('calls.incoming_call'),
      missed: I18n.t('calls.missed_message'),
      no_active: I18n.t('calls.no_active'),
      no_missed: I18n.t('calls.no_missed')
    }
    return data
  end
end
