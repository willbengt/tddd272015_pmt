class Project < ActiveRecord::Base
  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships
  has_many :timereports, dependent: :destroy

  def authProjectMember?(inUser, inToken)
    if self.users.where(name: inUser).exists? && (User.where(name: inUser).first).authenticated?(inToken) then
      return true
    end

    return false
  end
end
