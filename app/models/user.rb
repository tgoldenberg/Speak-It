class User < ActiveRecord::Base
  has_secure_password
  belongs_to :country
  belongs_to :native_language, class_name: "Language"
  belongs_to :study_language, class_name: "Language"
  belongs_to :level

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true
end
