require 'faker'

FactoryGirl.define do
  language = Language.create(name: "English", code: "en", img_url: Faker::Avatar.image)
  level = Level.create(name: "beginner", value: 1, language_id: language.id)

  topic = Topic.create(name: "Introduce yourself", level_id: level.id, language_id: language.id)

  student = User.create(username: Faker::Name.name, email: Faker::Internet.email, password: "password", native_language_id: language.id, study_language_id: language.id)

  native_speaker = User.create(username: Faker::Name.name, email: Faker::Internet.email, password: "password", native_language_id: language.id, study_language_id: language.id)
  factory :chat do
    student_id student.id
    native_speaker_id native_speaker.id
    topic_id topic.id
  end
end
