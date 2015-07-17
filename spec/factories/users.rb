require 'faker'

FactoryGirl.define do
  country = FactoryGirl.create(:country)
  native_language = FactoryGirl.create(:language, name: "Spanish")
  study_language = FactoryGirl.create(:language, name: "English")
  level = FactoryGirl.create(:level)
  ## create unique model instances for testing
  sequence :email do |n|
    "#{n}" + Faker::Internet.email
  end
  sequence :username do |n|
    Faker::Name.first_name + "#{n}"
  end

  factory :user do
    username
    email
    password "password"
    country_id country.id
    native_language_id native_language.id
    study_language_id study_language.id
    avatar_url Faker::Avatar.image
    level_id level.id
  end
end
