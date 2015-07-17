class ChatRoom < ActiveRecord::Base
  validates_presence_of :invitee_id, :creator_id
  belongs_to :invitee, class_name: "User"
  belongs_to :creator, class_name: "User"
  has_many :chats
end
