require 'rails_helper'

describe FeedbacksController, type: :controller do
  before(:each) do
    session[:user_id] = User.first.id
    @chat_room = ChatRoom.create(creator_id: User.first.id, invitee_id: User.last.id)
    @first_chat = Chat.create(student_id: @chat_room.creator_id,
      native_speaker_id: @chat_room.invitee_id,
      topic_id: @chat_room.invitee.topics.sample.id, chat_room_id: @chat_room.id)
    @second_chat = Chat.create(student_id: @chat_room.invitee_id,
      native_speaker_id: @chat_room.creator_id,
      topic_id: @chat_room.creator.topics.sample.id, chat_room_id: @chat_room.id)
    @chat_room.chats << @first_chat << @second_chat

  end
  describe 'GET new' do
    it 'should present a form for a new feedback' do
      get :new, {chat_room_id: @chat_room.id}
      expect(assigns(:feedback)).to be_a Feedback
    end
  end

  describe 'POST create' do
    it 'should create a new feedback' do
      expect {
        post :create, {feedback: {rating: 3, comment: "Hello world", chat_id: @chat_room.chats.first.id, sender_id: @chat_room.creator_id, recipient_id: @chat_room.invitee_id }}
      }.to change(Feedback, :count).by(1)
    end

    it 'should not create a new feedback with invalid params' do
      expect {
        post :create, {feedback: {rating: nil, comment: nil, chat_id: @chat_room.chats.first.id, sender_id: @chat_room.creator_id, recipient_id: @chat_room.invitee_id}}
      }.to change(Feedback, :count).by(0)
    end
  end

  describe 'GET show' do
    it 'should show the correct feedback to the user' do
      feedback = FactoryGirl.create(:feedback)
      get :show, {id: feedback.id}
      expect(assigns(:feedback)).to be_a Feedback
    end
  end
end
