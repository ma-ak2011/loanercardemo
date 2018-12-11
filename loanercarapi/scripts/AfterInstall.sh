#!/bin/bash
cd /var/www/projects
sudo chown adminuser /var/www/projects

cd /var/www/projects/loanercarapi

RAILS_ENV=production /usr/local/rbenv/shims/bundle install --path vendor/bundle
RAILS_ENV=production /usr/local/rbenv/shims/bundle exec rake db:migrate
RAILS_ENV=production /usr/local/rbenv/shims/bundle exec rake assets:clobber
RAILS_ENV=production /usr/local/rbenv/shims/bundle exec rake assets:precompile


cd /var/www/projects/loanercar

npm install
npm run build
