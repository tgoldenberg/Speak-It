require 'rails_helper'

describe Level do
  let(:language) {FactoryGirl.create(:language)}
  it 'should save a valid level' do
    expect(FactoryGirl.create(:level, language_id: language.id)).to be_valid
  end

  it 'should respond to name and valud' do
    expect(FactoryGirl.create(:level, language_id: language.id)).to respond_to :name
    expect(FactoryGirl.create(:level, language_id: language.id)).to respond_to :value
  end

  it 'should respond to language' do
    expect(FactoryGirl.create(:level, language_id: language.id)).to respond_to :language
  end

  it 'should respond to topics' do
    expect(FactoryGirl.create(:level, language_id: language.id)).to respond_to :topics
  end

  it 'should respond to users' do
    expect(FactoryGirl.create(:level, language_id: language.id)).to respond_to :users
  end
end
