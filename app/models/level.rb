class Level < ActiveRecord::Base
  belongs_to :language
  has_many :topics
  has_many :users

  def self.find_beginner_language(study_language_id)
    Level.find_by(language_id: study_language_id, name: "beginner")
  end
end
