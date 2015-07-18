class ChatRoomsController < ApplicationController
  protect_from_forgery except: 'create'

  def create
    invitation = Invitation.find_by(id: params[:invitation][:id])
    @chat_room = ChatRoom.create(creator_id: invitation.sender.id , invitee_id: invitation.recipient.id)
    @first_chat = Chat.create(student_id: invitation.recipient.id,
      native_speaker_id: invitation.sender.id,
      topic_id: invitation.recipient.topics.sample.id, chat_room_id: @chat_room.id)
    @second_chat = Chat.create(student_id: invitation.sender.id,
      native_speaker_id: invitation.recipient.id,
      topic_id: invitation.sender.topics.sample.id, chat_room_id: @chat_room.id)
    @chat_room.chats << @first_chat << @second_chat
    Invitation.where(sender_id: invitation.sender.id).delete_all

    channel = 'private-conversation.' + @chat_room.creator_id.to_s
    data = @chat_room.id
    Pusher.trigger(channel, 'create_chat_room', data.to_json)
    
    redirect_to chat_room_path(@chat_room)
    # @chat_room = ChatRoom.create()
  end

  def show
    @chat_room = ChatRoom.find_by(id: params[:id])
  end

  private

  def chat_room_params
    params.require(:chat_room).permit(:creator_id, :invitee_id)
  end
end
