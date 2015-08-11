Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET'], {scope: 'public_profile,email', info_fields: 'email,name', image_size: 'large'}
end
