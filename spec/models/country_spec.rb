require 'rails_helper'

describe Country do
  it 'should save a valid country' do
    expect(FactoryGirl.create(:country)).to be_valid
  end
end
