FactoryGirl.define do
  creator = User.create(username: Faker::Name.name, email: Faker::Internet.email, password: "password")
  invitee = User.create(username: Faker::Name.name, email: Faker::Internet.email, password: "password")

  factory :chat_room do
    creator_id creator.id
    invitee_id invitee.id
  end

end
