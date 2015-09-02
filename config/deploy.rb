# config valid only for current version of Capistrano
lock '3.4'
set :application, 'SpeakIt'
set :repo_url, 'git@github.com:tgoldenberg/Speak-It.git'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Default deploy_to directory is /var/www/my_app
set :deploy_to, '/u/apps/SpeakIt'

# Use agent forwarding for SSH so you can deploy with the SSH key on your workstation.
set :ssh_options, {
  forward_agent: true
}

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
set :linked_files, %w{config/database.yml .rbenv-vars .ruby-version}

# Default value for linked_dirs is []
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

 # prevent capistrano-bundler from setting the --binstubs option when running bundle install.
set :bundle_binstubs, nil

# Default value for default_env is {}
set :default_env, { path: "/opt/rbenv/shims:$PATH" }

# set :bundle_bins, fetch(:bundle_bins, []).push("unicorn")

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, :restart

end
