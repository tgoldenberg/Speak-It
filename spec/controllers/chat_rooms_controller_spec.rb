require 'rails_helper'

RSpec.describe ChatRoomsController, type: :controller do
  before(:each) do
    @invitation = Invitation.create(sender_id: User.first.id, recipient_id: User.last.id)
    session[:user_id] = User.first.id
  end
  describe "POST #create" do
    it 'should create a new chat room with valid params' do
      expect {
        post :create, {invitation: {id: @invitation.id}}
      }.to change(ChatRoom, :count).by(1)
    end
  end

  describe "GET #show" do
    it 'should assign a data instance with relevant information' do
      chat_room = FactoryGirl.create(:chat_room, creator_id: User.first.id, invitee_id: User.last.id )
      @first_chat = Chat.create(student_id: chat_room.creator_id,
        native_speaker_id: chat_room.invitee_id,
        topic_id: chat_room.invitee.topics.sample.id, chat_room_id: chat_room.id)
      @second_chat = Chat.create(student_id: chat_room.invitee_id,
        native_speaker_id: chat_room.creator_id,
        topic_id: chat_room.creator.topics.sample.id, chat_room_id: chat_room.id)
        chat_room.chats << @first_chat << @second_chat
      get :show, {id: chat_room.id }
      expect(assigns(:data)).to be_a Object
    end
  end
end
