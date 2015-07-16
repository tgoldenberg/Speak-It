require 'rails_helper'

describe Feedback do
  it 'should save a valid feedback' do
    expect(FactoryGirl.create(:feedback)).to be_valid
  end

  it 'should not save a feedback without a rating' do
    expect(FactoryGirl.create(:feedback, rating: nil)).to_not be_valid
  end

  it 'should respond to sender' do
    expect(FactoryGirl.create(:feedback)).to respond_to :sender
  end

  it 'should respond to recipient' do
    expect(FactoryGirl.create(:feedback)).to respond_to :recipient
  end

  it 'should respond to chat' do
    expect(FactoryGirl.create(:feedback)).to respond_to :chat
  end  
end
