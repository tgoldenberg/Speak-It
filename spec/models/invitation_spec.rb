require 'rails_helper'

describe Invitation do
  it 'should save a valid invitation' do
    expect(FactoryGirl.create(:invitation)).to be_valid
  end

  it 'should not save an invitation without a sender or recipient' do
    expect(FactoryGirl.create(:invitation, sender_id: nil)).to_not be_valid
    expect(FactoryGirl.create(:invitation, recipient_id: nil)).to_not be_valid
  end

  it 'should respond to sender' do
    expect(FactoryGirl.create(:invitation)).to respond_to :sender
  end

  it 'should respond to recipient' do
    expect(FactoryGirl.create(:invitation)).to respond_to :recipient
  end

  it 'should default to seen:false' do
    expect(FactoryGirl.create(:invitation).seen).to eq(false)
  end
end
