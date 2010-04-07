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

  describe 'with delayed assertions'
    before_each
      a = false
      JSpec.setTimeout(-{ a = true }, 15)
    end

    it 'should execute when the interpreter is idle by default'
      wait(-{
        a.should.be_false
      })
    end

    it 'should execute after a provided delay'
      wait(20, -{
        a.should.be_true
      })
    end

    it 'should work with custom syntax'
      wait 20ms
        a.should.be_true
      end
    end
  end
end
