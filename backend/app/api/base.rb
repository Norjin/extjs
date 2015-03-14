# Base class for all API endpoint
class API::V1::Base < Grape::API
  def self.inherited(subclass)
    super
    subclass.instance_eval do

      helpers do
        def logger
          API::Base.logger
        end

        def permitted_params
          @permitted_params ||= declared(params, include_missing: false)
        end
      end

      helpers API::V1::Base::Auth
      version 'v1', using: :path
      format :json

      rescue_from ActiveRecord::RecordNotFound do |e|
        message = e.message.gsub(/\s*\[.*\Z/, '')
        Rack::Response.new(
          [{ status_code: 404, message: message }.to_json],
          404,
          'Content-Type' => 'application/json'
        )
      end

      rescue_from ActiveRecord::RecordInvalid do |e|
        message = e.message.downcase.capitalize
        Rack::Response.new(
          [{ status_code: 403, message: message }.to_json],
          403,
          'Content-Type' => 'application/json'
        )
      end
    end
  end

  # Authentication module
  module Auth
    def authenticate!
      error!(
        { status_code: 401, message: 'Unauthorized' },
        401,
        'Content-Type' => 'application/json'
      ) unless Authentication.current_user(params[:apikey])
    end
  end
end
