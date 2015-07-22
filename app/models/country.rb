class Country < ActiveRecord::Base

  def self.countries_as_select_list
    Country.order(:name).pluck(:name, :id)
  end
end
