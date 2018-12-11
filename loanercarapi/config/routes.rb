# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users do
    resources :staffs
    resources :customers
    resources :schedules
    resources :facilities
  end

  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  get '/authenticate', to: 'sessions#authenticate'
  match '*all' => 'options_requests#preflight', via: :options
end
