class User < ActiveRecord::Base

  has_secure_password
  belongs_to :country
  belongs_to :native_language, class_name: "Language"
  belongs_to :study_language, class_name: "Language"
  belongs_to :level
  has_many :created_chat_rooms, class_name: "ChatRoom", foreign_key: :creator_id
  has_many :invited_chat_rooms, class_name: "ChatRoom", foreign_key: :invitee_id
  has_many :sent_feedback, class_name: "Feedback", foreign_key: :sender_id
  has_many :received_feedback, class_name: "Feedback", foreign_key: :recipient_id
  has_many :educational_chats, class_name: "Chat", foreign_key: :student_id
  has_many :native_speaker_chats, class_name: "Chat", foreign_key: :native_speaker_id
  has_many :sent_invitations, class_name: "Invitation", foreign_key: :sender_id
  has_many :received_invitations, class_name: "Invitation", foreign_key: :recipient_id
  validates :username, presence: true, uniqueness: true, length: {maximum: 20}
  validates :email, presence: true, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  # validates :password, presence: true, length: { minimum: 6}
  validates :native_language_id, presence: true
  validates :study_language_id, presence: true

  def self.users_levels_countries_languages
    User.all.includes(:level, :country, :native_language, :study_language, :native_speaker_chats)
  end

  def self.get_available_users(current_user)
    User.users_levels_countries_languages.where("last_seen_at > ? and id != ? and native_language_id = ? and study_language_id = ?", 5.minutes.ago, current_user.id, current_user.study_language_id, current_user.native_language_id)
  end

  def self.get_unavailable_users(current_user)
    User.users_levels_countries_languages.where("last_seen_at <= ? and id != ? and native_language_id = ? and study_language_id = ?", 5.minutes.ago, current_user.id, current_user.study_language_id, current_user.native_language_id)
  end

  def self.get_missed_calls(current_user)
    Invitation.where(recipient: current_user, seen: false, missed: true, declined: false).order(created_at: :desc)
  end

  def self.get_active_invitations(current_user)
    current_user.received_invitations.where(seen: false, missed: false, declined: false).pluck('DISTINCT sender_id').map{ |sender_id| Invitation.find_by(recipient_id: current_user.id, sender_id: sender_id, seen: false, declined: false, missed: false) }.reverse
  end

  def self.find_recent_users(users, current_user)
    recent_users = []
    users.each do |user|
      current_user.native_speaker_chats.where("created_at > ?", 1.weeks.ago).select(:student_id).distinct.each do |chat|
        if (chat.student_id == user.id)
          recent_users << user
        end
      end
    end
    recent_users
  end

  def topics
    self.level.topics
  end

  def levelpercent
    (self.level.value * 20).to_s + "%"
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.username = auth.info.name
      user.email = auth.info.name.split(" ").map {|name| name.downcase }.join("") + "@facebook.com"
      user.password = auth[:extra][:raw_info][:email] || (0...8).map { (65 + rand(26)).chr }.join
      user.level_id = 1
      user.avatar_url = auth.info.image
      user.oauth_token = auth.credentials.token
      user.oauth_token_expires_at = Time.at(auth.credentials.expires_at)
    end
  end

end
