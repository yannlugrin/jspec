
desc 'Build haml / sass'
task :build => [:remove] do
  sh 'haml pages/index.haml index.html'
  sh 'sass pages/style.sass style.css'
end

desc 'Remove old builds'
task :remove do
  rm 'index.html' if File.exists? 'index.html'
  rm 'style.css' if File.exists? 'style.css'
end