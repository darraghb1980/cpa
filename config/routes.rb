Cpa::Application.routes.draw do
  root :to => "home#index"
match '/charts', :controller => 'home', :action=>'charts'
end
