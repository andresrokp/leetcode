class Solution:
    def getConcatenation(self, nums: list[int]) -> list[int]:
        return nums*2

runner = Solution()
ans = runner.getConcatenation([1,2,3,4,5,6])
print(ans)