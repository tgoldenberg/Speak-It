class Level < ActiveRecord::Base
  belongs_to :language
  has_many :topics
  has_many :users
end
