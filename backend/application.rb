require File.expand_path('../environment', __FILE__)

module API
  # Version 1 API Endpoint
  module V1
  end
end

require 'app/api/base'

Dir["#{File.dirname(__FILE__)}/app/models/extensions/**/*.rb"].each { |f| require f }
Dir["#{File.dirname(__FILE__)}/app/models/**/*.rb"].each { |f| require f }
Dir["#{File.dirname(__FILE__)}/app/**/*.rb"].each { |f| require f }

ActiveRecord::Base.instance_eval do
  include ActiveModel::ForbiddenAttributesProtection
end

# Root endpoint
class API::Root < Grape::API
  rescue_from :all
  format :json

  mount API::V1::Status
  mount API::V1::User
  mount API::V1::Book
  mount API::V1::Author
  # mount API::V1::Author

  add_swagger_documentation mount_path: '/v1/doc',
                            api_version: 'v1',
                            markdown: true,
                            hide_documentation_path: true,
                            base_path: Application.config.base_path

  route :any, '*path' do
    error!({ status_code: 404, message: 'Not found' }, 404,  'Content-Type' => 'application/json')
  end
end

ApplicationServer = Rack::Builder.new do
  if %w(production staging).include? Application.config.env
    use Rack::SslEnforcer
  end

  map '/' do
    run API::Root
  end
end
