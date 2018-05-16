require 'rbconfig'
# ruby 1.8.7 doesn't define RUBY_ENGINE
ruby_engine = defined?(RUBY_ENGINE) ? RUBY_ENGINE : 'ruby'
# ruby_version = RbConfig::CONFIG["ruby_version"]
ruby_version = "2.3.0"
path = File.expand_path('..', __FILE__)
$:.unshift "#{path}/../#{ruby_engine}/#{ruby_version}/gems/multi_xml-0.6.0/lib"
$:.unshift "#{path}/"
