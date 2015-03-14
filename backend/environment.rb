$LOAD_PATH.unshift File.dirname(__FILE__)
env = (ENV['RACK_ENV'] || :development)

require 'bundler'
Bundler.require :default, env.to_sym
require 'erb'

# Main application
module Application
  include ActiveSupport::Configurable
end

Application.configure do |config|
  config.root     = File.dirname(__FILE__)
  config.env      = ActiveSupport::StringInquirer.new(env.to_s)
end

db_config = YAML.load(ERB.new(File.read('backend/config/database.yml')).result)
ActiveRecord::Tasks::DatabaseTasks.env = Application.config.env
ActiveRecord::Tasks::DatabaseTasks.database_configuration = db_config
ActiveRecord::Tasks::DatabaseTasks.db_dir = 'backend/db'
ActiveRecord::Tasks::DatabaseTasks.migrations_paths = 'backend/db/migrate'
ActiveRecord::Base.establish_connection db_config[Application.config.env]

specific_environment = "config/environments/#{Application.config.env}.rb"
require specific_environment if File.exist? specific_environment
Dir['config/initializers/**/*.rb'].each { |f| puts f require f }
