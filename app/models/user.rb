class User < ActiveRecord::Base
  has_many :memberships
  has_many :projects, through: :memberships
  has_one :token

  def authenticated?(inToken)
    if self.token.access_token == inToken then
      return true
    end

    return false
  end
end