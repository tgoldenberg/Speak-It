class Country < ActiveRecord::Base

  def self.countries_as_select_list
    Country.order(:name).pluck(:name, :id).map do |country|
      [I18n.t('countries.' + country[0].split(" ").join(""), country[1])]
    end
  end
end
