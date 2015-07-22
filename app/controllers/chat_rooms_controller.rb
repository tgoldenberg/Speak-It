class ChatRoomsController < ApplicationController
  protect_from_forgery except: ['create', 'update']

  def create
    invitation = Invitation.find_by(id: params[:invitation][:id])
    @chat_room = ChatRoom.build_from_invitation(invitation)
    if @chat_room.save
      @chat_room.chats << Chat.build_chats_pair(invitation, @chat_room)
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
    data_hash = {current_user: @user, other_user: @other_user, chat_room: @chat_room, first_chat: @first_chat, second_chat: @second_chat}
    @data = ChatRoom.jsonify_data_for_reactjs(data_hash)
  end

  private

  def chat_room_params
    params.require(:chat_room).permit(:creator_id, :invitee_id, :completed, :turn)
  end
end
