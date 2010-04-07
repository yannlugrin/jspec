describe 'Asynchronous specs'
  describe 'with a sleep'
    before_nested
      start = Number(new Date)
      sleep(50)
    end
  
    it 'should wait 50ms before executing this spec'
      (Number(new Date) - start).should.be_at_least 50
    end
    
    describe 'and another sleep'
      before_nested
        sleep(50)
      end

      it 'should wait 100ms before executing this spec'
        (Number(new Date) - start).should.be_at_least 100
      end
    end
    
    describe 'and two sleeps in one hook'
      before_nested
        sleep(50)
        sleep(50)
      end

      it 'should wait 100ms before executing this spec'
        (Number(new Date) - start).should.be_at_least 150
      end
    end
  end

  describe 'wait()'
    describe 'when given n milliseconds'
      it 'should delay assertions'
        var val = false
        JSpec.setTimeout(-{ val = true }, 100)
        wait(100, -{
          val.should.be_true
        })
      end
      
      it 'should work with multiple wait() calls'
        var val = false
        JSpec.setTimeout(-{ val = true }, 100)
        JSpec.setTimeout(-{ val = false }, 200)
        wait(100, function(){
          val.should.be_true
        })
        wait(200, function(){
          val.should.be_false
        })
      end
      
      it 'should work with multiple timers and long wait()'
        var a, b
        JSpec.setTimeout(-{ a = true }, 100)
        JSpec.setTimeout(-{ b = false }, 200)
        wait(300, function(){
          a.should.be_true
          b.should.be_false
        })
      end
      
      it 'should work with custom grammar syntax'
        var val = false
        JSpec.setTimeout(-{ val = true }, 100)
        wait 100
          val.should.be_true
        end
      end

    end
  end
end
