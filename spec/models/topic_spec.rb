require 'rails_helper'

describe Topic do
  let(:language) {FactoryGirl.create(:language)}
  let(:level) {FactoryGirl.create(:level, language_id: language.id)}
  let(:topic) {FactoryGirl.create(:topic, level_id: level.id, language_id: language.id)}
  it 'should save a valid topic' do
    expect(topic).to be_valid
  end

  it 'should respond to name' do
    expect(topic).to respond_to :name
  end

  it 'should respond to level' do
    expect(topic).to respond_to :level
  end

  it 'should respond to language' do
    expect(topic).to respond_to :language
  end

  it 'should respond to chats' do
    expect(topic).to respond_to :chats
  end

  it 'should not save without a name' do
    expect(FactoryGirl.build(:topic, name: nil)).to_not be_valid
  end
end
