# Status of API
class API::V1::Status < API::V1::Base
  resource :status do
    desc 'Returns the status of the API and creation', notes: <<-NOTE
           This is testing endpoint that checks if api works or not.
         NOTE

    get '/', http_codes: [[200, 'Success'], [201, 'Created']] do
      {
        status_code: 200,
        message: 'ok'
      }
    end

  end
end
