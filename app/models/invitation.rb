class Invitation < ActiveRecord::Base
  validates_presence_of :sender_id, :recipient_id
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"

  def self.generate_random_topic(student)
    student.topics.sample
  end
end
