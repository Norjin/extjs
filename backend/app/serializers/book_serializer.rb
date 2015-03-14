# Class Book Serialization
class BookSerializer < ActiveModel::Serializer
  attributes :id,
             :author,
             :bookTitle,
             :bookISBN,
             :bookDescription,
             :published,
             :price,
             :number,
             :created_at,
             :updated_at

  self.root = false
end
