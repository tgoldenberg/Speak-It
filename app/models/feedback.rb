class Feedback < ActiveRecord::Base
  after_create :adjust_points
  belongs_to :chat
  validates_presence_of :rating
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"

  RESET_POINTS = 0
  POINTS_ADJUSTMENT_FACTOR = 10
  MAX_POINTS_FOR_LEVEL = 100

  def adjust_points
    user = self.recipient
    binding.pry
    Feedback.adjust_level_points_for_user(self, user)
  end

  def self.possible_ratings_for_select_list
    [[I18n.t('feedback.one_star'), 1], [I18n.t('feedback.two_stars'), 2], [I18n.t('feedback.three_stars'), 3]]
  end

  def self.adjust_level_points_for_user(feedback, user)
    user.points += feedback.rating * POINTS_ADJUSTMENT_FACTOR if feedback.rating
    if user.points >= MAX_POINTS_FOR_LEVEL
      curr_level = user.level
      user.level = Level.find_by(language_id: curr_level.language_id,
        value: curr_level.value + 1) if user.level.value < MAX_POINTS_FOR_LEVEL
      user.points = RESET_POINTS
    end
    user.save
  end
end
