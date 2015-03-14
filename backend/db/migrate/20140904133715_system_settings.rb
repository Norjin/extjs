class SystemSettings < ActiveRecord::Migration
  def self.up
    create_table  :system_settings do |t|
      t.string :name
      t.string :label
      t.text :value
      t.string :type
      t.integer :position
    end
  end

  def self.down
  end
end
