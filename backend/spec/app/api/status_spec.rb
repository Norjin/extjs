describe API::V1::Status do
  describe 'GET /v1/status' do
    it 'returns OK' do
      get '/v1/status'
      expect(response.content_type).to eq('application/json')
      expect(response.status).to eq(200)
      expect(response_json).to eq('status_code' => 200, 'message' => 'ok')
    end
  end
end
