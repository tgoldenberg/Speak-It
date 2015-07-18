require 'rails_helper'

describe User do
  context 'not registered:' do
    let(:country) {FactoryGirl.create(:country)}
    let(:native_language) {FactoryGirl.create(:language, name: "English")}
    let(:study_language) {FactoryGirl.create(:language, name: "Spanish")}
    let(:level) {FactoryGirl.create(:level, language_id: study_language.id)}

    it 'should save a valid user' do
      expect(FactoryGirl.create(:user, country_id: country.id, native_language_id: native_language.id, study_language_id: study_language.id, level_id: level.id)).to be_valid
    end

    it 'should not save a user without a username' do
      expect(FactoryGirl.build(:user, username: nil, country_id: country.id, native_language_id: native_language.id, study_language_id: study_language.id, level_id: level.id)).to_not be_valid
    end

    it 'should not save a user without an email' do
      expect(FactoryGirl.build(:user, email: nil, country_id: country.id, native_language_id: native_language.id, study_language_id: study_language.id, level_id: level.id)).to_not be_valid
    end

    it 'should not save a user without a password' do
      expect(FactoryGirl.build(:user, password: nil, country_id: country.id, native_language_id: native_language.id, study_language_id: study_language.id, level_id: level.id)).to_not be_valid
    end

    it 'should not save a user without a native language' do
      expect(FactoryGirl.build(:user, country_id: country.id, native_language_id: nil, study_language_id: study_language.id, level_id: level.id)).to_not be_valid
    end

    it 'should not save a user without a study language' do
      expect(FactoryGirl.build(:user, study_language_id: nil, country_id: country.id, native_language_id: native_language.id, level_id: level.id)).to_not be_valid
    end

    it 'should not save with an invalid email' do
      expect(FactoryGirl.build(:user, email: "nothing", country_id: country.id, native_language_id: native_language.id, study_language_id: study_language.id, level_id: level.id)).to_not be_valid
    end

    it 'should limit usernames to 20 characters' do
      expect(FactoryGirl.build(:user, username: "lllllllllllllllllllllllllllllllll", country_id: country.id, native_language_id: native_language.id, study_language_id: study_language.id, level_id: level.id)).to_not be_valid
    end
  end

  context "Registered User" do
    let(:country) {FactoryGirl.create(:country)}
    let(:native_language) {FactoryGirl.create(:language, name: "English")}
    let(:study_language) {FactoryGirl.create(:language, name: "Spanish")}
    let(:level) {FactoryGirl.create(:level, language_id: study_language.id)}
    let(:user) {FactoryGirl.create(:user, country_id: country.id, native_language: native_language, study_language: study_language, level_id: level.id)}

    it 'should respond to level' do
      expect(user).to respond_to :level
    end

    it 'should respond to native language' do
      expect(user).to respond_to :native_language
    end

    it 'should respond to study language' do
      expect(user).to respond_to :study_language
    end

    it 'should respond to topics' do
      expect(user).to respond_to :topics
    end

    it 'should respond to chats' do
      expect(user).to respond_to :native_speaker_chats
      expect(user).to respond_to :educational_chats
    end

    it 'should respond to sent invitations' do
      expect(user).to respond_to :sent_invitations
    end

    it 'should respond to recieved invitations' do
      expect(user).to respond_to :received_invitations
    end

    it 'should respond to sent chat rooms' do
      expect(user).to respond_to :created_chat_rooms
    end

    it 'should respond to recieved chat rooms' do
      expect(user).to respond_to :invited_chat_rooms
    end

    it 'should respond to sent feedback' do
      expect(user).to respond_to :sent_feedback
    end

    it 'should respond to recieved feedback' do
      expect(user).to respond_to :received_feedback
    end
  end
end
