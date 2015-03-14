class CreateBook < ActiveRecord::Migration
  def self.up
    create_table :books do |t|
      t.belongs_to :author
      t.string :bookTitle
      t.string :bookISBN
      t.text :bookDescription
      t.timestamp :published
      t.integer :price
      t.integer :number
      t.timestamps
    end
  end

  def self.down
  end
end
