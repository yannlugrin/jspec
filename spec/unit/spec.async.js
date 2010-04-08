describe 'Asynchronous specs'
  describe 'wait()'
    describe 'when given n milliseconds'
      it 'should delay assertions'
        var val = false
        JSpec.setTimeout(-{ val = true }, 20)
        wait(20, -{
          val.should.be_true
        })
      end
      
      it 'should work with multiple wait() calls'
        var val = false
        JSpec.setTimeout(-{ val = true }, 30)
        JSpec.setTimeout(-{ val = false }, 45)
        wait(30, function(){
          val.should.be_true
        })
        wait(30, function(){
          val.should.be_false
        })
      end
      
      it 'should work with multiple timers and long wait()'
        var a, b
        JSpec.setTimeout(-{ a = true }, 50)
        JSpec.setTimeout(-{ b = false }, 50)
        wait(100, function(){
          a.should.be_true
          b.should.be_false
        })
      end
      
      it 'should work with custom grammar syntax'
        var val = false
        JSpec.setTimeout(-{ val = true }, 50)
        wait 50
          val.should.be_true
        end
      end

    end
  end
end
