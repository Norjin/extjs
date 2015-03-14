# Test runner
module RackTestGroup
  require 'rack/test'

  include Rack::Test::Methods

  def app
    subject
  end

  def response
    last_response
  end

  def response_json
    JSON.parse(response.body, max_nesting: 19)
  end
end

RSpec.configure do |config|
  config.include RackTestGroup, type: :rack, file_path: %r{(spec/app/api)}
end
