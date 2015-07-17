FactoryGirl.define do
  sender = User.create(username: Faker::Name.name, email: Faker::Internet.email, password: "password")
  recipient = User.create(username: Faker::Name.name, email: Faker::Internet.email, password: "password")

  factory :chat_room do
    sender_id sender.id
    recipient_id recipient.id
  end

end
