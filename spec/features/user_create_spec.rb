require 'rails_helper'

feature 'User management' do

  scenario "adds a new user" do
    visit root_path
    expect{
    click_link 'Sign Up'
    fill_in 'Username', with: 'Tom'
    fill_in 'Password', with: 'password'
    fill_in 'Email', with: 'Tom@example.com'
    click_button 'Submit'
    }.to change(User, :count).by(1)
  end

  scenario "login" do
    user = User.create(username: "alex",email: "alex@example.com",password: "password",country_id: 1,native_language_id: 1,study_language_id: 1,level_id: 1,)
    visit root_path
    fill_in 'Username', with: user.username
    fill_in 'Password', with: user.password
    click_button 'Login'
    expect(page).to have_content('Your Level')
  end


  scenario "login and create invitation" do
    user = User.create(username: "alex",email: "alex@example.com",password: "password",country_id: 1,native_language_id: 1,study_language_id: 1,level_id: 1,)
    visit root_path
    fill_in 'Username', with: user.username
    fill_in 'Password', with: user.password
    click_button 'Login'
    click_link 'Available'
  end
end
