import re
class Solution:
    def minOperations(self, s: str) -> int:
        return min((t:=sum(1 for i in range(len(s)) if ord(s[i])!=0x30+i%2)),len(s)-t ) 
'''
class Solution:
    def minOperations(self, s: str) -> int:
        q:int = 0
        r:int = 0
        if s == '' or s == '1' or s == '0':
            return q
        sL = list(s)
        positions00 = [bit.start() for bit in re.finditer('00',s)]
        positions11 = [bit.start() for bit in re.finditer('11',s)]
        print('- - - - -')
        print(len(s))
        print(positions00)
        print(positions11)
        
        # for i in range(len(s)-2,-1,-1):
        #     print(i,s2[i],s2[i+1])
        #     if s2[i] == s2[i+1]:
        #         s2[i] = '0' if s2[i] == '1' else '1'
        #         r = r + 1
        # return q,r
'''
    
tests = ['']*14

tests[0]:str = "0100"  #1
tests[1]:str = '10'  #0
tests[2]:str = '1111'  #2
tests[3]:str = '100101010'  #2
tests[4]:str = '110101010'  #1
tests[5]:str = ''  #0
tests[6]:str = '1'  #0
tests[7]:str = '0'  #0
tests[8]:str = '10010100'  #3
tests[9]:str = '10100101010101010101010101010100101'  #8, no20+  pares al cerca a extremo
tests[10]:str = '1010101010101001010010101010101'  #5,    parejas cerca al centro
tests[11]:str = '1010010101011010010101010101010100101'  #12, pares al cerca a extremo, 11 cerca 00 al centro
tests[12]:str = '10100101010110100101101010101010100101'  #16, pares al cerca a extremo, 11 cerca 00 al centro, 11 que queda solo
tests[13]:str = '10100101010110100101101010101010100101'  #16, pares al cerca a extremo, 11 cerca 00 al centro, 11 que queda solo


'''
parece que una pareja se elemina con otra pareja o con los extremos... como las ondas
un 11 a una distancia par de un 00 se eliminan
 - > una pareja de un tipo se elimina con una pareja del otro tipo con distancia par
a 00 with another 00 at an odd sitance eliminates
  -> two same type pairs eliminates when an even distance

What happen if I breack the array?...

caso 12
1010
01010101
1010
01010101010101010
0101

caso 16
1010
01010101
1010
0101
10101010101010
0101


ALGO

take one of the arrays, run over it




'''

runner = Solution()

for test in tests:
    print(runner.minOperations(test))
