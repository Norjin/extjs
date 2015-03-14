# A sample Gemfile
source 'https://rubygems.org'

gem 'rack', '~> 1.5.2'
gem 'grape'                                  # for api
gem 'grape-swagger'                                      # api documentation
gem 'activerecord', '~> 4.0.1', require: 'active_record' # ORM
gem 'pg'                                                 # driver for postgresql
gem 'rake'                                               # task runner
gem 'racksh'                                             # rack console
gem 'active_attr'
gem 'roar'
gem 'active_model_serializers'
gem 'pry'                                   #for debugging

group :development do
  gem 'rerun'
  gem 'jsduck'
  gem 'rubocop', require: false
end
group :production do
  gem 'rack-ssl-enforcer'
end

group :test do
  gem 'rspec'                                  # testing framework
  gem 'rack-test', require: 'rack/test'
  gem 'simplecov'
  gem 'guard'                                  # watcher
  gem 'guard-rspec'                            # rspec watcher
  gem 'rb-fsevent', '~> 0.9.4'                 # for mac fs event
  gem 'rb-inotify', '~> 0.9.4', require: false # for linux fs event
  gem 'database_cleaner'                       # for cleaning database
  gem 'factory_girl'                           # fixture creational
  gem 'shoulda-matchers'
end
