class ChatRoomsController < ApplicationController
  protect_from_forgery except: ['create', 'update']

  def create
    invitation = Invitation.find_by(id: params[:invitation][:id])
    invitation.update_attributes(seen: true)
    @chat_room = ChatRoom.new(creator_id: invitation.sender.id , invitee_id: invitation.recipient.id)
    if @chat_room.save
      @first_chat = Chat.create(student_id: invitation.recipient.id,
        native_speaker_id: invitation.sender.id,
        topic_id: invitation.recipient.topics.sample.id, chat_room_id: @chat_room.id)
      @second_chat = Chat.create(student_id: invitation.sender.id,
        native_speaker_id: invitation.recipient.id,
        topic_id: invitation.sender.topics.sample.id, chat_room_id: @chat_room.id)
      @chat_room.chats << @first_chat << @second_chat
      # Invitation.where(sender_id: invitation.sender.id).delete_all

      channel = 'private-conversation.' + @chat_room.creator_id.to_s
      data = @chat_room.id
      Pusher.trigger(channel, 'create_chat_room', data.to_json)

      redirect_to chat_room_path(@chat_room)
    else
      flash[:alert] = ["Unable to create chat room"]
      redirect_to root_path
    end
  end

  def update
    @chat_room = ChatRoom.find_by(id: params[:id])
    @chat_room.assign_attributes(chat_room_params)
    if @chat_room.turn >= 5
      @chat_room.completed = true
    end
    if @chat_room.save
      render json: @chat_room.to_json
    else
      render "Unable to update".to_json
    end
  end

  def show
    @user = current_user
    @active_invitations = User.get_active_invitations(@user)
    @missed_calls = User.get_missed_calls(@user)
    @chat_room = ChatRoom.find_by(id: params[:id])
    @first_chat = @chat_room.chats.first
    @second_chat = @chat_room.chats.last
    @other_user = @chat_room.creator == current_user ? @chat_room.invitee : @chat_room.creator
    # assign data for handing over to ReactJS component
    @data = {chat_room: @chat_room,
            chats: @chat_room.chats,
            current_user: {
              user: current_user,
              country: current_user.try(:country),
              country_image: view_context.asset_path(current_user.try(:country).try(:image_url)),
              language: current_user.try(:native_language)
            },
            other_user: {
              user: @other_user,
              country: @other_user.country,
              country_image: view_context.asset_path(@other_user.country.image_url),
              language: @other_user.native_language
            },
            first_chat: {
              chat: @first_chat,
              student: @first_chat.student,
              native_speaker: @first_chat.native_speaker,
              topic: @first_chat.topic,
              language: @first_chat.language,
              level: @first_chat.level
            },
            second_chat: {
              chat: @second_chat,
              student: @second_chat.student,
              native_speaker: @second_chat.native_speaker,
              topic: @second_chat.topic,
              language: @second_chat.language,
              level: @second_chat.level
            }
          }
  end

  private

  def chat_room_params
    params.require(:chat_room).permit(:creator_id, :invitee_id, :completed, :turn)
  end
end
