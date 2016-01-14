class Project < ActiveRecord::Base
  # belongs_to :owner, :class_name => 'User'
  has_many :memberships
  # has_many :members, :class_name => 'User', :through => 'memberships', :foreign_key => 'user_id'
  has_many :users, through: :memberships
  # has_and_belongs_to_many :users
  has_many :reports
end
