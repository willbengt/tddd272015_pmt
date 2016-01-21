class User < ActiveRecord::Base
  has_many :memberships, dependent: :destroy
  has_many :projects, through: :memberships
  has_one :token, dependent: :destroy

  def authenticated?(inToken)
    if self.token.access_token == inToken then
      return true
    end

    return false
  end
end