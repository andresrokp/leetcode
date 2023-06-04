class Solution:
    def minOperations(self, s: str) -> int:
        q:int = 0
        r:int = 0
        if s == '' or s == '1' or s == '0':
            return q
        s1 = list(s)
        for i in range(0,len(s)-2):
            if s1[i] == s1[i-1]:
                s1[i] = '0' if s1[i] == '1' else '1'
                q = q + 1
        s2 = list(s)
        for i in range(len(s)-2,-1,-1):
            print(i,s2[i],s2[i+1])
            if s2[i] == s2[i+1]:
                s2[i] = '0' if s2[i] == '1' else '1'
                r = r + 1
        return q,r
    
tests = ['']*9

tests[0]:str = "0100"  #1
tests[1]:str = '10'  #0
tests[2]:str = '1111'  #2
tests[3]:str = '100101010'  #2
tests[4]:str = '110101010'  #1
tests[5]:str = ''  #0
tests[6]:str = '1'  #0
tests[7]:str = '0'  #0
tests[8]:str = '10010100'  #3
tests[8]:str = '10100101010101010101010101010100101'  #8, no20+  pares al cerca a extremo
tests[8]:str = '1010101010101001010010101010101'  #3,    parejas cerca al centro

#parece que una pareja se elemina con otra pareja o con los extremos... como las ondas

runner = Solution()

for test in tests:
    print(runner.minOperations(test))
