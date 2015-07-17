FactoryGirl.define do
  topic = Topic.create(name: "Introduce yourself", level_id: 1, language_id: 1)
  student = User.create(username: Faker::Name.name, email: Faker::Internet.email, password: "password")
  native_speaker = User.create(username: Faker::Name.name, email: Faker::Internet.email, password: "password")

  factory :chat do
    student_id student.id
    native_speaker_id native_speaker.id
    topic_id topic.id
  end
end
