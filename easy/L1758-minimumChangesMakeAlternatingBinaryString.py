class Solution:
    def minOperations(self, s: str) -> int:
        return s
    
tests = [0]*8

tests[0]:str = "0100"  #1
tests[1]:str = '10'  #0
tests[2]:str = '1111'  #2
tests[3]:str = '100101010'  #7
tests[4]:str = '110101010'  #8
tests[5]:str = ''  #0
tests[6]:str = '1'  #0
tests[7]:str = '0'  #0

runner = Solution()

for test in tests:
    print(runner.minOperations(test))
