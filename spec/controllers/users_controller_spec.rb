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
      expect {
        post :create, {user: FactoryGirl.attributes_for(:user, email: nil, level_id: @level.id, native_language_id: @native_language.id, study_language_id: @study_language.id, country_id: @country.id)}
      }.to change(User, :count).by(0)
    end
  end

  describe "GET #edit" do
    it "allows the user to edit their profile" do
      get :edit, id: @registered_user.id
      expect(assigns(:user)).to be_a User
    end
  end

  describe "PUT #update" do
    it "allows the user to update their account" do
      put :update, {id: @registered_user.id, user: FactoryGirl.attributes_for(:user, username: "Thomas", level_id: @level.id, native_language_id: @native_language.id, study_language_id: @study_language.id, country_id: @country.id) }
      expect(User.find(@registered_user.id).username).to eq("Thomas")
    end
  end

  describe "GET #show" do
    it "shows the user profile" do
      get :show, {id: @registered_user.id}
      expect(assigns(:user).username).to eq(@registered_user.username)
    end
  end

  describe "GET #index" do
    it "shows all users" do
      get :index
      expect(assigns(:users)).to eq(User.all)
    end
  end

  describe "DELETE #destroy" do
    it "deletes the user account" do
      expect{
        delete :destroy, id: @registered_user.id
      }.to change(User, :count).by(-1)
    end
  end

end
