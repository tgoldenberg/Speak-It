require 'faker'

## choose either English or Spanish randomly
LANGUAGES = [{name: "English", code: "en"}, {name: "Spanish", code: "es"}]
language = LANGUAGES.sample

FactoryGirl.define do
  factory :language do
    name language.name
    code language.code
    img_url Faker::Avatar.image
  end
end
