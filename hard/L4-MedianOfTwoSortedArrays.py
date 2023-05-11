import math

class Solution:
    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:
        i1=0; i2=0; j=0
        mid = math.floor(len(nums1+nums2)/2)
        while j <= mid:
            # if last j is odd take (_j + _j-1 / 2)
            print('')
            j=j+1;
        return j







list1 = [1, 3, 5, 7]
list2 = [9, 2, 4, 6, 8]
list3 = [2, 5, 6, 7, 9, 12, 15, 15, 15, 256]
list4 = [8, 11, 12, 13, 25, 256]
list5 = [-83, -83, -79, -58, -19, -1, 14, 23, 87, 93]
list6 = [-49, -32, -21, -17, 13, 16, 19, 56, 75, 90]
list7 = [-89, -87, -74, -66, -60, -57, -56, -45, -36, -22, -4, 1, 9, 19, 20, 27, 29, 39, 42, 47, 76, 78, 100]
list8 = [-46, -42, 4, 10, 53]

runner = Solution()

print(runner.findMedianSortedArrays(list1,list2) == 5)
print(runner.findMedianSortedArrays(list1,list2) == 12)
print(runner.findMedianSortedArrays(list1,list2) == 6)
print(runner.findMedianSortedArrays(list1,list2))






