# Book API
class API::V1::Book < API::V1::Base
  resource :books do
    get '/' do
      @books = Book.all
      book_serializer = ActiveModel::ArraySerializer.new(@books)
      { success: true, books: book_serializer }
    end
    put '/' do
      book = Book.find_by(id: params[:REC_ID])
      book.number = book.number - params[:REC_SELNUM].to_i
      book.save
      books = Book.all
      serializer = ActiveModel::ArraySerializer.new(books)

      { success: true, books: serializer }

    end
    put '/:id' do
      @id = params[:id]
      @price = params[:price]
      @number1 = params[:number]
      book = Book.find_by(id: @id)
      book.price = @price
      book.number = @number1
      book.save!
      ser = BookSerializer.new(book)
      { success: true, books: ser }
    end
    desc 'delete endpoint'
    delete '/:id' do
      @id = params[:id]
      book = Book.find_by(id: @id)
      book.destroy!
    end

    post '/' do
      b = Book.new
      exist = false
      Author.find_each do | author |
        if author.name == params[:author]
          exist = true
          b.author = author
          break
        end
      end

      # if !exist
      b.build_author(name: params[:author]) unless exist
      # end

      b.bookTitle = params[:bookTitle]
      b.bookISBN = params[:bookISBN]
      b.bookDescription = params[:bookDescription]
      b.published = params[:published]
      b.price = params[:price]
      b.number = params[:number]
      b.save!
      serializer = BookSerializer.new(b)
      { success: true, books: serializer }
    end
  end
end
