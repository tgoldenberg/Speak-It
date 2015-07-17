class Feedback < ActiveRecord::Base
  belongs_to :chat
  validates_presence_of :rating
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"
end
