describe 'Asynchronous specs'
  describe 'expecting()'
    describe 'given the number if assertions expected'
      it 'should remain in-queue until the assertions have been met'
        expecting(2)
        setTimeout(-{
          true.should.be_true
        }, 100)
        setTimeout(-{
          true.should.be_true
        }, 200)
      end
      
      describe 'given a timeout'
        it 'should pass when within the timeout'
          expecting(2, { timeout: 400 })
          setTimeout(-{
            true.should.be_true
          }, 100)
          setTimeout(-{
            true.should.be_true
          }, 200)
        end
        
        it 'should fail when passing the timeout'
          expecting(2, { timeout: 200 })
          setTimeout(-{
            true.should.be_true
          }, 100)
          setTimeout(-{
            true.should.be_true
          }, 300)
          setTimeout(-{
            true.should.be_true
          }, 400)
        end
      end
    end
  end
end
