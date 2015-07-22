class Chat < ActiveRecord::Base
  has_many :feedbacks
  validates_presence_of :student_id, :native_speaker_id
  belongs_to :student, class_name: "User"
  belongs_to :native_speaker, class_name: "User"
  belongs_to :topic
  belongs_to :chat_room

  def language
    self.topic.language
  end

  def level
    self.topic.level
  end

  def self.build_chats_pair(invitation, room)
    [ self.create(student: invitation.recipient, native_speaker: invitation.sender,
                  topic: Invitation.generate_random_topic(invitation.recipient),
                  chat_room: room),
    self.create(student: invitation.sender, native_speaker: invitation.recipient,
                  topic: Invitation.generate_random_topic(invitation.sender),
                  chat_room: room) ]
  end
end
