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
        helper_text: {
          seconds: I18n.t('chat_room.seconds'),
          stats_title: I18n.t('chat_room.stats_title'),
          feedback_button: I18n.t('chat_room.feedback_button'),
          stats_participants: I18n.t('chat_room.stats_participants'),
          stats_first_chat: I18n.t('chat_room.stats_first_chat'),
          stats_second_chat: I18n.t('chat_room.stats_second_chat'),
          stats_first_topic: I18n.t('chat_room.stats_first_topic'),
          stats_second_topic: I18n.t('chat_room.stats_second_topic'),
          stats_rating: I18n.t('chat_room.stats_rating'),
          stats_comments: I18n.t('chat_room.stats_comments'),
          stats_first_feedback: I18n.t('chat_room.stats_first_feedback'),
          stats_second_feedback: I18n.t('chat_room.stats_second_feedback')
        },
        chats: data_hash[:chat_room].chats,
        current_user: {
          user: data_hash[:current_user],
          country: data_hash[:current_user].try(:country),
          country_image: ActionController::Base.helpers.asset_path(data_hash[:current_user].try(:country).try(:image_url)),
          language: data_hash[:current_user].try(:native_language),
          language_flag: ActionController::Base.helpers.asset_path("languages/#{data_hash[:current_user].try(:native_language).name.downcase}.png")
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
          language_flag: ActionController::Base.helpers.asset_path("languages/#{data_hash[:first_chat].language.name.downcase}.png"),
          level: data_hash[:first_chat].level,
          text: {
            native_speaker: I18n.t('chat_room.native_speaker') + data_hash[:first_chat].native_speaker.username.titleize,
            student: I18n.t('chat_room.student') + data_hash[:first_chat].student.username.titleize,
            topic: I18n.t('chat_room.topic') + data_hash[:first_chat].topic.name,
            language: I18n.t('chat_room.language') + I18n.t('languages.' + data_hash[:first_chat].language.name) + " ",
            level: I18n.t('chat_room.level') + data_hash[:first_chat].level.value.to_s + ") " + I18n.t('level.value_' + data_hash[:first_chat].level.value.to_s)
          }
        },
        second_chat: {
          chat: data_hash[:second_chat],
          student: data_hash[:second_chat].student,
          native_speaker: data_hash[:second_chat].native_speaker,
          topic: data_hash[:second_chat].topic,
          language: data_hash[:second_chat].language,
          language_flag: ActionController::Base.helpers.asset_path("languages/#{data_hash[:second_chat].language.name.downcase}.png"),
          level: data_hash[:second_chat].level,
          text: {
            native_speaker: I18n.t('chat_room.native_speaker') + data_hash[:second_chat].native_speaker.username.titleize,
            student: I18n.t('chat_room.student') + data_hash[:second_chat].student.username.titleize,
            topic: I18n.t('chat_room.topic') + data_hash[:second_chat].topic.name,
            language: I18n.t('chat_room.language') + I18n.t('languages.' + data_hash[:second_chat].language.name) + " ",
            level: I18n.t('chat_room.level') + data_hash[:second_chat].level.value.to_s + ") " + I18n.t('level.value_' + data_hash[:second_chat].level.value.to_s)
          }
        }
      }
  end
end
