#!/usr/bin/env rake
require File.expand_path('../backend/environment', __FILE__)
require 'active_support/core_ext/string/strip'

desc 'Start API backend server'
task :server do
  sh "rerun -b --pattern 'backend/**/*.{rb,yml}' rackup"
end

task :environment do
end

# Rails module for rake tasks
module Rails
  def self.application
    Struct.new(:config, :paths) do
      def load_seed
        require File.expand_path('../backend/application', __FILE__)
        require File.expand_path('../backend/db/seeds', __FILE__)
      end
    end.new(config, paths)
  end

  def self.config
    require 'erb'
    db_config = YAML.load(ERB.new(File.read('backend/config/database.yml')).result)
    Struct.new(:database_configuration).new(db_config)
  end

  def self.paths
    { 'backend/db/migrate' => ["#{root}/db/migrate"] }
  end

  def self.env
    env = ENV['RACK_ENV'] || 'development'
    ActiveSupport::StringInquirer.new(env)
  end

  def self.root
    File.expand_path('../backend/')
  end
end

namespace :g do
  desc 'Generate migration. Specify name in the NAME variable'
  task migration: :environment do
    name = ENV['NAME'] || fail('Specify name: rake g:migration NAME=create_users')
    timestamp = Time.now.strftime('%Y%m%d%H%M%S')

    path = File.expand_path("../backend/db/migrate/#{timestamp}_#{name}.rb", __FILE__)
    migration_class = name.split('_').map(&:capitalize).join

    File.open(path, 'w') do |file|
      file.write <<-EOF.strip_heredoc
        class #{migration_class} < ActiveRecord::Migration
          def self.up
          end

          def self.down
          end
        end
      EOF
    end

    puts 'DONE'
    puts path
  end
end

Rake.load_rakefile 'active_record/railties/databases.rake'
