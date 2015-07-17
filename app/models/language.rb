class Language < ActiveRecord::Base
  validates_presence_of :name
  has_many :levels
  has_many :topics
  has_many :users
end
