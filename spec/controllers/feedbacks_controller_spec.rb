require 'rails_helper'

describe FeedbacksController, type: :controller do
  describe 'GET new' do
    it 'should present a form for a new feedback' do
      get :new
      expect(assigns(:feedback)).to be_a Feedback
    end
  end

  describe 'POST create' do
    it 'should create a new feedback' do
      expect {
        post :create, {feedback: FactoryGirl.attributes_for(:feedback)}
      }.to change(Feedback, :count).by(1)
    end

    it 'should not create a new feedback with invalid params' do
      expect {
        post :create, {feedback: FactoryGirl.attributes_for(:feedback, sender_id: nil)}
      }.to change(Feedback, :count).by(0)
    end
  end

  describe 'GET show' do
    it 'should show the correct feedback to the user' do
      feedback = FactoryGirl.create(:feedback)
      get :show, {id: feedback.id}
      expect(assigns(:feedback)).to be_a Feedback
    end
  end
end
