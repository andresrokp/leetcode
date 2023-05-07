class Solution:
    def secondHighest(self, s: str) -> int:
        nums:set = set()
        for c in s:
            if c.isnumeric():
                nums.add(int(c))
        try:
            return sorted(list(nums))[-2]
        except:
            return -1
        
runner = Solution()

ans = runner.secondHighest('sexdcfgvbhjn')

print(ans)
