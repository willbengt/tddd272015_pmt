class User < ActiveRecord::Base
  # has_many :projects, :foreign_key => 'owner_id'
  # has_many :memberships, :foreign_key => 'user_id'
  # has_many :projects, :class_name => 'Project', :through => :memberships, :foreign_key => 'project_id'
  # has_many :memberships
  # has_many :projects, through: :memberships
  has_and_belongs_to_many :projects
end