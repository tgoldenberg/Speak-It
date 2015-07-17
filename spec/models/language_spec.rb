require 'rails_helper'

describe Language do
  it 'should save a valid language' do
    expect(FactoryGirl.create(:language)).to be_valid
  end

  it 'should not save without a name' do
    expect(FactoryGirl.build(:language, name: nil)).to_not be_valid
  end

  it 'should respond to levels' do
    expect(FactoryGirl.create(:language)).to respond_to :levels
  end

  it 'should respond to users' do
    expect(FactoryGirl.create(:language)).to respond_to :users
  end

  it 'should respond to topics' do
    expect(FactoryGirl.create(:language)).to respond_to :topics
  end
end
