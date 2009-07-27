
require 'rubygems'
require 'rext/all'
require 'lightr'

def highlight string
  Lightr::JavaScript.parse(string).to_s
end

def example file, escape = false
  contents = File.read File.dirname(__FILE__) + '/examples/' + file
  contents = contents.escape_html if escape
  contents
end

def title title, subheading
  %(<h1>#{title} <em>#{subheading}</em></h1>)
end

def project_url username, project
  "http://github.com/#{username}/#{project}"
end

PROJECT_URL = project_url('visionmedia', 'jspec')
