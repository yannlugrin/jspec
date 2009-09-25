
JSpec.describe('Authentication', function(){
  given('the user :user', function(name){
    user = { name: name }
  })
  
  given('the password :password', function(password){
    user.password = password
  })
  
  when('I press login', function(){
    user.authenticated = user.name == 'tj' && user.password == 'foobar'
  })
  
  then('I should be authenticated', function(){
    user.authenticated.should.be_true
  })
})