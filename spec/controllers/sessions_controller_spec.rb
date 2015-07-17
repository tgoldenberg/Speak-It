require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  before(:each) do
    @native_language =  FactoryGirl.create(:language, name: "English")
    @study_language =  FactoryGirl.create(:language, name: "Spanish")
    @country =  FactoryGirl.create(:country)
    @level =  FactoryGirl.create(:level, language_id: @native_language.id)
    @registered_user =  FactoryGirl.create(:user, native_language_id: @native_language.id, study_language_id: @study_language.id, country_id: @country.id, level_id: @level.id)
  end
    describe "GET #new" do
    it "allows a user to log in" do
      get :new
      expect(assigns(:user)).to be_a User
    end
  end

  describe "GET #create" do
    it "logs in a registered user" do
      post :create, {user: {username: @registered_user.username, password: @registered_user.password}}
      expect(flash[:notice]).to eq(["Successfully logged in."])
    end

    it 'does not log in an unregistered user' do
      post :create, {user: {username: "some user", password: "IDK"}}
      expect(flash[:alert]).to eq(["Invalid Username or Password"])
    end
  end

  describe "DELETE #destroy" do
    it "logs out the user" do
      delete :destroy
      expect(flash[:notice]).to eq(["Successfully logged out."])
    end
  end

end
