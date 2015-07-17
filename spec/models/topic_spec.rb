require 'rails_helper'

describe Topic do
  it 'should save a valid topic' do
    expect(FactoryGirl.create(:topic)).to be_valid
  end

  it 'should respond to name' do
    expect(FactoryGirl.create(:topic)).to respond_to :name
  end

  it 'should respond to level' do
    expect(FactoryGirl.create(:topic)).to respond_to :level
  end

  it 'should respond to language' do
    expect(FactoryGirl.create(:topic)).to respond_to :language
  end

  it 'should respond to chats' do
    expect(FactoryGirl.create(:topic)).to respond_to :chats
  end

  it 'should not save without a name' do
    expect(FactoryGirl.create(:topic, name: nil)).to_not be_valid
  end
end
