FactoryGirl.define do
  level = FactoryGirl.create(:level)
  language = FactoryGirl.create(:language)
  factory :topic do
    name "Introduce yourself"
    level_id level.id
    language_id language.id
  end
end
