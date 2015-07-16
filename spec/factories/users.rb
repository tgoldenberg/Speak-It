require 'faker'

FactoryGirl.define do
  ## create unique model instances for testing
  sequence :email do |n|
    "email#{n}@factory.com"
  end
  sequence :username do |n|
    Faker::Name.first_name + "#{n}"
  end

  # english = FactoryGirl.create(:language, name: "English")
  # spanish = FactoryGirl.create(:language, name: "Spanish")
  # level = FactoryGirl.create(:level, value: 1, name: "beginner")

  factory :user do
    username
    email
    password "password"
    country_id 1
    native_language_id 1
    study_language_id 2
    avatar_url Faker::Avatar.image
    level_id 1
  end
end
