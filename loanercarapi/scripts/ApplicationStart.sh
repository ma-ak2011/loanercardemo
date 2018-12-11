#!/bin/sh
sudo rm /etc/nginx/conf.d/loanercar.conf
sudo rm /etc/nginx/nginx.conf
sudo mv /var/www/projects/release/loanercar.conf /etc/nginx/conf.d/loanercar.conf
sudo mv /var/www/projects/release/nginx.conf /etc/nginx/nginx.conf

cd /var/www/projects/loanercarapi
RAILS_ENV=production /usr/local/rbenv/shims/bundle exec unicorn_rails -c /var/www/projects/loanercarapi/config/unicorn.conf.rb -D -E production

sudo service nginx restart
