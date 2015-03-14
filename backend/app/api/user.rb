# User of API
class API::V1::User < API::V1::Base
  resource :users do
    get '/' do
      u = User.new
      u.name = ''
      u.save
      {}
    end
  end
end
