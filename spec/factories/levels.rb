require 'faker'

@levels = [
  {name: "beginner", value: 1},
  {name: "intermediate beginner", value: 2},
  {name: "advanced beginner", value: 3},
  {name: "low intermediate", value: 4},
  {name: "medium intermediate", value: 5},
  {name: "advanced intermediate", value: 6},
  {name: "low advanced", value: 7},
  {name: "mid advanced", value: 8},
  {name: "high advanced", value: 9},
  {name: "expert", value: 10}
]
level = @levels.sample
language = FactoryGirl.create(:language)

FactoryGirl.define do
  factory :level do
    name level[:name]
    value level[:value]
    language_id language.id
  end
end
