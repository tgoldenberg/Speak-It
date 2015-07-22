class ChatRoom < ActiveRecord::Base
  validates_presence_of :invitee_id, :creator_id
  belongs_to :invitee, class_name: "User"
  belongs_to :creator, class_name: "User"
  has_many :chats

  def self.build_from_invitation(invitation)
    invitation.update_attributes(seen: true)
    ChatRoom.new(creator: invitation.sender, invitee: invitation.recipient)
  end
end
