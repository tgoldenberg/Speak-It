require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  before(:each) do
    @native_language = FactoryGirl.create(:language, name: "English")
    @study_language = FactoryGirl.create(:language, name: "Spanish")
    @level = FactoryGirl.create(:level, language_id: @study_language.id)
    @country = FactoryGirl.create(:country)
    @registered_user =  FactoryGirl.create(:user, native_language_id: @native_language.id, study_language_id: @study_language.id, country_id: @country.id, level_id: @level.id)
  end
  describe "GET #new" do
    it "allows the user to register" do
      get :new
      expect(assigns(:user)).to be_a User
    end
  end

  describe "POST #create" do
    it "registers a new user with the correct params" do
      expect {
        post :create, {user: FactoryGirl.attributes_for(:user, level_id: @level.id, native_language_id: @native_language.id, study_language_id: @study_language.id, country_id: @country.id)}
      }.to change(User, :count).by(1)
    end

    it 'should not register a user with invalid params' do
      post :create, {user: FactoryGirl.attributes_for(:user, email: nil, level_id: @level.id, native_language_id: @native_language.id, study_language_id: @study_language.id, country_id: @country.id)}
      expect(flash[:alert]).to eq(["A user with that username or email already exists"])
    end
  end

end
