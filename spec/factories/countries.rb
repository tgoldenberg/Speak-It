require 'faker'

FactoryGirl.define do
  factory :country do
    name Faker::Address.country
    image_url Faker::Avatar.image
  end

end
