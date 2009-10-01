
// JSpec - Stories - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

;(function(){
  
  JSpec.steps = []
  
  function parse(string) {
    var lines = string.split(/\n+/)
    var story = { scenarios: [] }, scenario = { steps: [] }
    for (var i = 0, len = lines.length; i < len; ++i)
      if (/^\s*feature\s*:\s*(.*)/i.exec(lines[i]))
        story.name = RegExp.$1
      else if (/^\s*scenario\s*:\s*(.*)/i.exec(lines[i])) {
        if (scenario.name)
          story.scenarios.push(scenario),
          scenario = { steps: [] }
        scenario.name = RegExp.$1
      }
      else if (/^\s*(?:given|when|then|and|but)\s*(.*)/i.test(lines[i]))
        scenario.steps.push(RegExp.$1)
      else if(!(/^\s*$/.test(lines[i])))
        throw "syntax error near `" + lines[i] + "'"
    story.scenarios.push(scenario)
    return story
  }
  
  JSpec.story = function(path) {
    // TODO: this is an issue ... no longer closures ? ... spec
    this.currentStory = parse(JSpec.load(path))
    this.describe(this.currentStory.name, function(){
      print(JSpec.currentStory.name)
      JSpec.each(JSpec.currentStory.scenarios, function(scenario){
        print(scenario.name)
        JSpec.each(scenario.steps, function(step){
          print(step.description)
        })
      })
    })
    return this
  }
  
  function step(description, body) {
    if (typeof description == 'string') 
      description = new RegExp('^' + description.replace(/:\w+/g, '(.*?)'), 'i')
    JSpec.steps.push({
      description: description,
      body: body
    })
  }
  
  JSpec.include({
    name: 'Story',
    utilities : {
      given: step,
      when: step,
      then: step
    }
  })

})()