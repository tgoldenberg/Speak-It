class Chat < ActiveRecord::Base
  has_many :feedbacks
  # validates_presence_of :student_id, :native_speaker_id
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
end
