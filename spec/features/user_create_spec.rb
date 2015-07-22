# require 'rails_helper'

# feature 'User management' do

#   def in_browser(name)
#     old_session = Capybara.session_name

#     Capybara.session_name = name
#     yield

#     Capybara.session_name = old_session
#   end

#   scenario "multi-user experience up to invitation" do
#     in_browser(:one) do
#       user = User.create(username: "alex",email: "alex@example.com",password: "password",country_id: 1,native_language_id: 1,study_language_id: 1,level_id: 1,)
#       visit root_path
#       fill_in 'Username', with: user.username
#       fill_in 'Password', with: user.password
#       click_button 'Login'
#     end

#     in_browser(:two) do
#       user_2 = User.create(username: "james",email: "james@example.com",password: "password",country_id: 1,native_language_id: 1,study_language_id: 1,level_id: 1,)
#       visit root_path
#       fill_in 'Username', with: user_2.username
#       fill_in 'Password', with: user_2.password
#       click_button 'Login'
#     end

#     in_browser(:one) do
#       expect(page).to have_content('Your Level')
#       visit root_path
#     end

#     in_browser(:two) do
#       expect(page).to have_content('Your Level')
#       click_button 'Speak!'
#       visit root_path
#     end

#     in_browser(:one) do
#       visit root_path
#       page.find(".notifications").click
#       save_and_open_page
#     end

#     in_browser(:two) do
#     end

#   end

#   scenario "adds a new user" do
#     visit root_path
#     expect{
#     click_link 'Sign Up'
#     fill_in 'Username', with: 'Tom'
#     fill_in 'Password', with: 'password'
#     fill_in 'Email', with: 'Tom@example.com'
#     click_button 'Submit'
#     }.to change(User, :count).by(1)
#   end

#   scenario "login" do
#     user = User.create(username: "alex",email: "alex@example.com",password: "password",country_id: 1,native_language_id: 1,study_language_id: 1,level_id: 1,)
#     visit root_path
#     fill_in 'Username', with: user.username
#     fill_in 'Password', with: user.password
#     click_button 'Login'
#     expect(page).to have_content('Your Level')
#   end

#   scenario "logout" do
#     user = User.create(username: "alex",email: "alex@example.com",password: "password",country_id: 1,native_language_id: 1,study_language_id: 1,level_id: 1,)
#     visit root_path
#     visit root_path
#     fill_in 'Username', with: user.username
#     fill_in 'Password', with: user.password
#     click_button 'Login'
#     click_link 'Logout'
#   end

#   scenario "login and create invitation" do
#     user = User.create(username: "alex",email: "alex@example.com",password: "password",country_id: 1,native_language_id: 1,study_language_id: 1,level_id: 1,)
#     visit root_path
#     fill_in 'Username', with: user.username
#     fill_in 'Password', with: user.password
#     click_button 'Login'
#     click_link 'Available'
#   end
# end
