require 'rails_helper'

describe User do
  context 'not registered' do
    it 'should save a valid user' do
      expect(FactoryGirl.create(:user)).to be_valid
    end

    it 'should not save a user without a username' do
      expect(FactoryGirl.build(:user, username: nil)).to_not be_valid
    end

    it 'should not save a user without an email' do
      expect(FactoryGirl.build(:user, email: nil)).to_not be_valid
    end

    it 'should not save a user without a password' do
      expect(FactoryGirl.build(:user, password: nil)).to_not be_valid
    end

    it 'should not save a user without a native language' do
      expect(FactoryGirl.build(:user, native_language_id: nil)).to_not be_valid
    end

    it 'should not save a user without a study language' do
      expect(FactoryGirl.build(:user, study_language_id: nil)).to_not be_valid
    end

    it 'should not save with an invalid email' do
      expect(FactoryGirl.build(:user, email: "nothing")).to_not be_valid
    end

    it 'should limit usernames to 20 characters' do
      expect(FactoryGirl.build(:user, username: "lllllllllllllllllllllllll")).to_not be_valid
    end
  end

  context "Registered User" do

    it 'should respond to level' do
      expect(FactoryGirl.create(:user)).to respond_to :level
    end

    it 'should respond to native language' do
      expect(FactoryGirl.create(:user)).to respond_to :native_language
    end

    it 'should respond to study language' do
      expect(FactoryGirl.create(:user)).to respond_to :study_language
    end

    it 'should respond to topics' do
      expect(FactoryGirl.create(:user)).to respond_to :topics
    end

    it 'should respond to chats' do
      expect(FactoryGirl.create(:user)).to respond_to :chats
    end

    it 'should respond to sent invitations' do
      expect(FactoryGirl.create(:user)).to respond_to :sent_invitations
    end

    it 'should respond to recieved invitations' do
      expect(FactoryGirl.create(:user)).to respond_to :recieved_invitations
    end

    it 'should respond to sent chat rooms' do
      expect(FactoryGirl.create(:user)).to respond_to :created_chat_rooms
    end

    it 'should respond to recieved chat rooms' do
      expect(FactoryGirl.create(:user)).to respond_to :invited_chat_rooms
    end

    it 'should respond to sent feedback' do
      expect(FactoryGirl.create(:user)).to respond_to :sent_feedbacks
    end

    it 'should respond to recieved feedback' do
      expect(FactoryGirl.create(:user)).to respond_to :recieved_feedbacks
    end
  end
end
