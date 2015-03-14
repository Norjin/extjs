# Class Author serializer
class AuthorSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :surname,
             :born,
             :dead,
             :addedBy,
             :created_at,
             :updated_at
  self.root = false
end
