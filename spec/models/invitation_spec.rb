require 'rails_helper'

describe Invitation do
  let(:native_language) {FactoryGirl.create(:language, name: "English")}
  let(:study_language) {FactoryGirl.create(:language, name: "Spanish")}
  let(:country) {FactoryGirl.create(:country)}
  let(:level){FactoryGirl.create(:level, language_id: study_language.id)}
  let(:sender) {FactoryGirl.create(:user, country_id: country.id, level_id: level.id, native_language_id: native_language.id, study_language_id: study_language.id)}
  let(:recipient) {FactoryGirl.create(:user, country_id: country.id, level_id: level.id, native_language_id: study_language.id, study_language_id: study_language.id)}
  it 'should save a valid invitation' do
    expect(FactoryGirl.create(:invitation, sender_id: sender.id, recipient_id: recipient.id)).to be_valid
  end

  it 'should not save an invitation without a sender or recipient' do
    expect(FactoryGirl.build(:invitation, recipient_id: recipient.id, sender_id: nil)).to_not be_valid
    expect(FactoryGirl.build(:invitation, sender_id: sender.id, recipient_id: nil)).to_not be_valid
  end

  it 'should respond to sender' do
    expect(FactoryGirl.create(:invitation, sender_id: sender.id, recipient_id: recipient.id)).to respond_to :sender
  end

  it 'should respond to recipient' do
    expect(FactoryGirl.create(:invitation, sender_id: sender.id, recipient_id: recipient.id)).to respond_to :recipient
  end

  it 'should default to seen:false' do
    expect(FactoryGirl.create(:invitation, sender_id: sender.id, recipient_id: recipient.id).seen).to eq(false)
  end
end
