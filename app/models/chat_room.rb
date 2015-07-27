class ChatRoom < ActiveRecord::Base
  validates_presence_of :invitee_id, :creator_id
  belongs_to :invitee, class_name: "User"
  belongs_to :creator, class_name: "User"
  has_many :chats

  def self.build_from_invitation(invitation)
    invitation.update_attributes(seen: true)
    ChatRoom.new(creator: invitation.sender, invitee: invitation.recipient)
  end

  def self.jsonify_data_for_reactjs(data_hash)
    {chat_room: data_hash[:chat_room],
        chats: data_hash[:chat_room].chats,
        current_user: {
          user: data_hash[:current_user],
          country: data_hash[:current_user].try(:country),
          country_image: ActionController::Base.helpers.asset_path(data_hash[:current_user].try(:country).try(:image_url)),
          language: data_hash[:current_user].try(:native_language)
        },
        initial_guidelines: {
          title: I18n.t('chat_room.initial_guidelines_title'),
          description: I18n.t('chat_room.initial_guidelines_description')
        },
        second_chat_guidelines: {
          title: I18n.t('chat_room.second_chat_title'),
          description: I18n.t('chat_room.second_chat_description')
        },
        final_instructions: {
          title: I18n.t('chat_room.final_instructions_title'),
          description: I18n.t('chat_room.final_instructions_description')
        },
        other_user: {
          user: data_hash[:other_user],
          country: data_hash[:other_user].country,
          country_image: ActionController::Base.helpers.asset_path(data_hash[:other_user].country.image_url),
          language: data_hash[:other_user].native_language
        },
        first_chat: {
          chat: data_hash[:first_chat],
          student: data_hash[:first_chat].student,
          native_speaker: data_hash[:first_chat].native_speaker,
          topic: data_hash[:first_chat].topic,
          language: data_hash[:first_chat].language,
          level: data_hash[:first_chat].level
        },
        second_chat: {
          chat: data_hash[:second_chat],
          student: data_hash[:second_chat].student,
          native_speaker: data_hash[:second_chat].native_speaker,
          topic: data_hash[:second_chat].topic,
          language: data_hash[:second_chat].language,
          level: data_hash[:second_chat].level
        }
      }
  end
end
