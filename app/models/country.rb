class Country < ActiveRecord::Base

  def self.countries_as_select_list
    # Country.all.map{ |country| [country.name,country.id] }.sort
    Country.order(:name).pluck(:name, :id)
  end
end
