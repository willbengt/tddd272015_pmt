class User < ActiveRecord::Base
  has_many :memberships
  has_many :projects, through: :memberships
  has_one :token

  def authenticated?(inToken)
    puts inToken
    puts self.token.access_token
    puts self.token.access_token == inToken

    if self.token.access_token == inToken then
      puts self.token.fresh_token
    else
      return false
    end

    return true
  end
end