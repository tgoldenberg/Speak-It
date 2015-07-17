require 'rails_helper'

RSpec.describe InvitationsController, type: :controller do
  before(:each) do
    @native_language = FactoryGirl.create(:language, name: "English")
    @study_language = FactoryGirl.create(:language, name: "Spanish")
    @level = FactoryGirl.create(:level, language_id: @native_language.id)
    @country = FactoryGirl.create(:country)
    @sender =  FactoryGirl.create(:user, native_language_id: @native_language.id, study_language_id: @study_language.id, country_id: @country.id, level_id: @level.id)
    @recipient =  FactoryGirl.create(:user, native_language_id: @native_language.id, study_language_id: @study_language.id, country_id: @country.id, level_id: @level.id)
    @saved_invitation = FactoryGirl.build(:invitation, sender_id: @sender.id, recipient_id: @recipient_id)
    @invitation_id = @saved_invitation.id
  end
  describe "POST #create" do

    it "creates a valid invitation" do
      expect {
        post :create, {invitation: FactoryGirl.attributes_for(:invitation, sender_id: @sender.id, recipient_id: @recipient.id)}
      }.to change(Invitation, :count).by(1)
    end

    it 'does not create an invalid invitation' do
      expect {
        post :create, {invitation: FactoryGirl.attributes_for(:invitation, sender_id: @sender.id, recipient_id: nil) }
      }.to change(Invitation, :count).by(0)
    end

    it 'should provide the proper error messages' do
      post :create, {invitation: FactoryGirl.attributes_for(:invitation, sender_id: @sender.id, recipient_id: nil)}
      expect(flash[:alert]).to eq(["Sorry, your invitation could not be processed."])
    end
  end

  describe "DELETE #destroy" do
    it "returns http success" do
      @saved_invitation.recipient_id = @recipient.id
      @saved_invitation.save
      delete :destroy, id: @saved_invitation.id
      expect(Invitation.find_by(id: @saved_invitation.id)).to eq(nil)
    end
  end

end
