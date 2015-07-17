require 'rails_helper'

describe Chat do
  let(:native_language) {FactoryGirl.create(:language, name: "English") }
  let(:study_language) {FactoryGirl.create(:language, name: "Spanish") }
  let(:level) {FactoryGirl.create(:level, language_id: native_language) }
  let(:country) {FactoryGirl.create(:country) }
  let(:student) {FactoryGirl.create(:user, country_id: country.id, native_language_id: native_language.id, study_language_id: study_language.id, level_id: level.id) }
  let(:native_speaker) {FactoryGirl.create(:user, country_id: country.id, native_language_id: study_language.id, study_language_id: native_language.id, level_id: level.id) }
  it 'should save a valid chat' do
    expect(FactoryGirl.create(:chat, student_id: student.id, native_speaker_id: native_speaker.id)).to be_valid
  end

  it 'should not save without a student or a native speaker' do
    expect(FactoryGirl.build(:chat, native_speaker_id: native_speaker.id, student_id: nil)).to_not be_valid
    expect(FactoryGirl.build(:chat, student_id: student.id, native_speaker_id: nil)).to_not be_valid
  end

  it 'should respond to student' do
    expect(FactoryGirl.create(:chat, student_id: student.id, native_speaker_id: native_speaker.id)).to respond_to :student
  end

  it 'should respond to native speaker' do
    expect(FactoryGirl.create(:chat, student_id: student.id, native_speaker_id: native_speaker.id)).to respond_to :native_speaker
  end

  it 'should respond to feedbacks' do
    expect(FactoryGirl.create(:chat, student_id: student.id, native_speaker_id: native_speaker.id)).to respond_to :feedbacks
  end

  it 'should respond to language' do
    expect(FactoryGirl.create(:chat, student_id: student.id, native_speaker_id: native_speaker.id)).to respond_to :language
  end

  it 'should respond to level' do
    expect(FactoryGirl.create(:chat, student_id: student.id, native_speaker_id: native_speaker.id)).to respond_to :level
  end

  it 'should respond to topic' do
    expect(FactoryGirl.create(:chat, student_id: student.id, native_speaker_id: native_speaker.id)).to respond_to :topic
  end
end
