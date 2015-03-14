# Class to search
class BookService < ActiveRecord::Base
  def self.search(filter, filter1)
    book_search = "%#{filter}%"
    author_search = '%' + filter1 + '%'
    find(:all, conditions: ['bookTitle LIKE ? OR bookISBN LIKE ? ', book_search, author_search])
  end
end
