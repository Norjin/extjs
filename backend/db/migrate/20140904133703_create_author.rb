class CreateAuthor < ActiveRecord::Migration
  def self.up
    create_table :authors do |t|
      t.string :name
      t.string :surname
      t.timestamp :born
      t.timestamp :dead
      t.string :addedBy
      t.timestamps
    end
  end

  def self.down
  end
end
