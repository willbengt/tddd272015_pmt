class Project < ActiveRecord::Base
  # belongs_to :owner, :class_name => 'User'
  has_many :memberships
  # has_many :members, :class_name => 'User', :through => 'memberships', :foreign_key => 'user_id'
  has_many :users, through: :memberships
  # has_and_belongs_to_many :users
  has_many :timereports

  def authProjectMember?(inUser, inToken)
    puts '----- authProjectMember? -----'
    if self.users.where(name: inUser).exists? && (User.where(name: inUser).first).authenticated?(inToken) then
      return true
    end

    return false
    end
end
