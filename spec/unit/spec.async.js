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

  describe 'with a deferred function'
    before_nested
      a = false
      defer(-{ a = true })
    end

    it 'should not be executed'
      a.should.be_false
    end

    describe 'and sleep'
      before_nested
        sleep(1)
      end

      it 'should be executed'
        a.should.be_true
      end
    end
  end
end
