describe API::Root do
  it 'should return not found response' do
    get '/v1/notfound'
    expect(response.content_type).to eq('application/json')
    expect(response.status).to eq(404)
    expect(response_json).to eq('status_code' => 404, 'message' => 'Not found')
  end
end
