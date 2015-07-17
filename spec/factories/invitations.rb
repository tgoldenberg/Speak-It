FactoryGirl.define do
  sender = User.create(username: "Tom", email: "tom@example.com", password: "password")
  recipient = User.create(username: "Bob", email: "bob@example.com", password: "password")
  factory :invitation do
    sender_id sender.id
    recipient_id recipient.id
    seen false
  end
end
