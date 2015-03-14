# Author API
class API::V1::Author < API::V1::Base
  resource :authors do
    get '/' do
      @authors = Author.all
      author_serializer = ActiveModel::ArraySerializer.new(@authors)
      { success: true, authors: author_serializer }
    end
    put '/' do

    end
    delete '/' do

    end

    post '/' do
      a = Author.new
      a.name = params[:name]
      a.surname = params[:surname]
      a.born = params[:born]
      a.dead = params[:dead]
      a.addedBy = params[:addedBy]
      a.save!
      s = AuthorSerializer.new(a)
      { success: true, authors: s }
    end
  end
end
