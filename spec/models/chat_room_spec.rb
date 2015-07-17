require 'rails_helper'

describe ChatRoom do
  let(:native_language) {FactoryGirl.create(:language, name: "English")}
  let(:study_language) {FactoryGirl.create(:language, name: "Spanish")}
  let(:level) {FactoryGirl.create(:level, language_id: native_language.id)}
  let(:country) {FactoryGirl.create(:country)}

  let(:invitee) {FactoryGirl.create(:user, native_language_id: native_language.id, study_language_id: study_language.id, level_id: level.id, country_id: country.id )}
  let(:creator) {FactoryGirl.create(:user, native_language_id: native_language.id, study_language_id: study_language.id, level_id: level.id, country_id: country.id )}
  it 'should save a valid chat room' do
    expect(FactoryGirl.create(:chat_room, invitee_id: invitee.id, creator_id: creator.id)).to be_valid
  end

  it 'should not save without a invitee or invitor' do
    expect(FactoryGirl.build(:chat_room, creator_id: creator.id, invitee_id: nil)).to_not be_valid
    expect(FactoryGirl.build(:chat_room, invitee_id: invitee.id, creator_id: nil)).to_not be_valid
  end

  it 'should respond to invitee' do
    expect(FactoryGirl.create(:chat_room, invitee_id: invitee.id, creator_id: creator.id)).to respond_to :invitee
  end

  it 'should respond to invitor' do
    expect(FactoryGirl.create(:chat_room, invitee_id: invitee.id, creator_id: creator.id)).to respond_to :creator
  end

  it 'should respond to chats' do
    expect(FactoryGirl.create(:chat_room, invitee_id: invitee.id, creator_id: creator.id)).to respond_to :chats
  end
end
