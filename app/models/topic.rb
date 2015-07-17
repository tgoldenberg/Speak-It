class Topic < ActiveRecord::Base
  belongs_to :level
  belongs_to :language
  has_many :chats
  validates_presence_of :name
end
