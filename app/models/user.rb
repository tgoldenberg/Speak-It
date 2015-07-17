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
  has_many :recieved_invitations, class_name: "Invitation", foreign_key: :recipient_id
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true

  def topics
    self.level.topics
  end
end
