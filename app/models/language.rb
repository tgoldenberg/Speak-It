class Language < ActiveRecord::Base
  validates_presence_of :name
  has_many :levels
  has_many :topics

  has_many :students, class_name: "User", foreign_key: :study_language_id
  has_many :native_speakers, class_name: "User", foreign_key: :native_language_id

  def self.languages_as_select_list
    # Language.all.map{ |language| [language.name,language.id] }.sort
    Language.order(:name).pluck(:name, :id)
  end
end
