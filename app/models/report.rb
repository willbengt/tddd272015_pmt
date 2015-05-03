class Report < ActiveRecord::Base
	validates :date, :presence => {:message => "^Date can't be blank"}, :format => /\d{2}\/\d{2}\/\d{4}/
  validates :name, :presence => true
  validates :starttime, :presence => true
  validates :endtime, :presence => true
end