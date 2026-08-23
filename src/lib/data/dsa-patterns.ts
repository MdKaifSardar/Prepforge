import { Pattern } from '../models/dsa.types';

export const PATTERNS_DATA: Pattern[] = [
  {
    id: 1,
    name: "Hashing / Frequency Counting",
    cues: [
      "Duplicates detection",
      "Frequency counting",
      "O(1) Existence checking",
      "Pair lookup (X + Y = Target)",
      "Subarray frequency tracking",
      "Unordered matching / Anagrams"
    ],
    thinkAbout: "When the problem asks to match elements, count occurrences, find pairs adding up to a target, or check if elements have been seen previously without spending O(N) search time per element.",
    coreIdea: "Trade extra O(N) space for instant O(1) lookup time. Store elements or their frequencies in an std::unordered_map or std::unordered_set as you iterate through the vector once.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (seen.count(complement)) return {seen[complement], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};",
    timeComplexity: "O(N) average time for single pass lookup.",
    spaceComplexity: "O(N) auxiliary space for unordered_map.",
    pitfalls: [
      "Modifying map keys while iterating over the map.",
      "Forgetting hash lookup can degrade to O(N) worst-case under severe hash collisions.",
      "Not handling duplicate values properly when storing indices as keys."
    ],
    subPatterns: [
      {
        id: "hash-frequency",
        name: "Frequency Counting & Anagrams",
        cues: ["Count occurrences", "String anagrams in O(N)", "Majority element frequency"],
        thinkAbout: "When checking structural equivalence between sequences, such as string anagrams, or tracking frequency distribution.",
        coreIdea: "Populate a frequency hash map or fixed array of size 26. Decrement counts for the second string or check for exact match.",
        templateCode: "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.length() != t.length()) return false;\n        int freq[26] = {0};\n        for (int i = 0; i < s.length(); i++) {\n            freq[s[i] - 'a']++;\n            freq[t[i] - 'a']--;\n        }\n        for (int count : freq) if (count != 0) return false;\n        return true;\n    }\n};",
        timeComplexity: "O(N) single pass over strings.",
        spaceComplexity: "O(1) auxiliary space using fixed 26-element array.",
        pitfalls: ["Not checking length equality at start.", "Assuming ASCII lowercase only."]
      },
      {
        id: "hash-lookup",
        name: "O(1) Pair & Complement Lookup",
        cues: ["Find two numbers adding up to target", "Check complement X = Target - Y", "Single pass traversal"],
        thinkAbout: "When looking for element pairs satisfying an algebraic relation without quadratic nested loops.",
        coreIdea: "Iterate through elements. Calculate required complement. Check if present in hash map; if found return indices, else insert current element.",
        templateCode: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (mp.count(complement)) return {mp[complement], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};",
        timeComplexity: "O(N) time complexity.",
        spaceComplexity: "O(N) for hash map.",
        pitfalls: ["Using the same element index twice."]
      }
    ],
    questions: [
      {
        lcNum: "LC 1",
        title: "Two Sum",
        subPatternId: "hash-lookup",
        url: "https://leetcode.com/problems/two-sum/",
        diff: "easy",
        statement: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
        bruteForce: {
          explanation: "Use nested loops to test all pairs (i, j) in O(N^2).",
          timeComp: "O(N^2)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        for (int i = 0; i < nums.size(); i++) {\n            for (int j = i + 1; j < nums.size(); j++) {\n                if (nums[i] + nums[j] == target) return {i, j};\n            }\n        }\n        return {};\n    }\n};"
        },
        optimal: {
          explanation: "Maintain an unordered_map mapping array values to their indices. For each element x at index i, check if (target - x) exists in O(1).",
          timeComp: "O(N)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (mp.count(complement)) return {mp[complement], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};"
        }
      },
      {
        lcNum: "LC 217",
        title: "Contains Duplicate",
        subPatternId: "hash-frequency",
        url: "https://leetcode.com/problems/contains-duplicate/",
        diff: "easy",
        statement: "Given an integer array `nums`, return `true` if any value appears at least twice in the array.",
        bruteForce: {
          explanation: "Sort array first in O(N log N) time, then check adjacent elements.",
          timeComp: "O(N log N)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        for (int i = 1; i < nums.size(); i++) if (nums[i] == nums[i-1]) return true;\n        return false;\n    }\n};"
        },
        optimal: {
          explanation: "Insert each element into an unordered_set. If already present, duplicate is found in O(1).",
          timeComp: "O(N)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> seen;\n        for (int num : nums) {\n            if (seen.count(num)) return true;\n            seen.insert(num);\n        }\n        return false;\n    }\n};"
        }
      }
    ]
  },
  {
    id: 2,
    name: "Prefix Sum & Difference Arrays",
    cues: [
      "Range sum queries [L, R]",
      "Subarray sum equals K",
      "Cumulative sums",
      "Range updates / Add val to [L, R]"
    ],
    thinkAbout: "When performing multiple range sum queries or finding continuous subarrays with a specific target sum.",
    coreIdea: "Precalculate prefix sums P[i] = P[i-1] + nums[i]. Sum of subarray [L, R] is simply P[R] - P[L-1] in O(1) time.",
    templateLabel: "Modern C++ Template",
    templateCode: "class PrefixSum {\n    vector<int> pref;\npublic:\n    PrefixSum(vector<int>& nums) {\n        pref.resize(nums.size() + 1, 0);\n        for (int i = 0; i < nums.size(); i++) pref[i+1] = pref[i] + nums[i];\n    }\n    int query(int L, int R) {\n        return pref[R+1] - pref[L];\n    }\n};",
    timeComplexity: "O(N) build, O(1) per query.",
    spaceComplexity: "O(N) for prefix array.",
    pitfalls: ["Off-by-one errors when computing 1-indexed prefix bounds."],
    subPatterns: [
      {
        id: "prefix-basic",
        name: "Standard Prefix Sum & Subarray Sum K",
        cues: ["Subarray sum equals K", "Range sum queries", "Prefix sum with hash map"],
        thinkAbout: "When calculating subarray sums equal to K, note that Sum(L..R) = Pref[R] - Pref[L-1] = K implies Pref[L-1] = Pref[R] - K.",
        coreIdea: "Maintain current running sum and count occurrences of (current_sum - K) in a hash map.",
        templateCode: "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        unordered_map<int, int> prefCount;\n        prefCount[0] = 1;\n        int sum = 0, count = 0;\n        for (int x : nums) {\n            sum += x;\n            if (prefCount.count(sum - k)) count += prefCount[sum - k];\n            prefCount[sum]++;\n        }\n        return count;\n    }\n};",
        timeComplexity: "O(N) single pass.",
        spaceComplexity: "O(N) for prefix map.",
        pitfalls: ["Forgetting to initialize prefCount[0] = 1."]
      }
    ],
    questions: [
      {
        lcNum: "LC 560",
        title: "Subarray Sum Equals K",
        subPatternId: "prefix-basic",
        url: "https://leetcode.com/problems/subarray-sum-equals-k/",
        diff: "medium",
        statement: "Given an array of integers `nums` and an integer `k`, return total number of subarrays whose sum equals `k`.",
        bruteForce: {
          explanation: "Compute sum for all possible subarrays (i, j) in O(N^2).",
          timeComp: "O(N^2)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        int count = 0;\n        for (int i = 0; i < nums.size(); i++) {\n            int sum = 0;\n            for (int j = i; j < nums.size(); j++) {\n                sum += nums[j];\n                if (sum == k) count++;\n            }\n        }\n        return count;\n    }\n};"
        },
        optimal: {
          explanation: "Use Prefix Sum + Hash Map. Track running sum. Count previous occurrences of (running_sum - k).",
          timeComp: "O(N)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        unordered_map<int, int> mp;\n        mp[0] = 1;\n        int sum = 0, count = 0;\n        for (int x : nums) {\n            sum += x;\n            if (mp.count(sum - k)) count += mp[sum - k];\n            mp[sum]++;\n        }\n        return count;\n    }\n};"
        }
      }
    ]
  },
  {
    id: 3,
    name: "Two Pointers",
    cues: [
      "Sorted array",
      "Pair elements matching target",
      "In-place array manipulation",
      "Palindromes",
      "Trapping Rain Water / Container With Most Water"
    ],
    thinkAbout: "When the array is sorted, or when searching for pairs/triplets satisfied by opposite bounds converging inward.",
    coreIdea: "Initialize left = 0, right = N - 1. Move left pointer rightward or right pointer leftward based on comparison with target.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    vector<int> twoSumSorted(vector<int>& numbers, int target) {\n        int left = 0, right = numbers.size() - 1;\n        while (left < right) {\n            int sum = numbers[left] + numbers[right];\n            if (sum == target) return {left + 1, right + 1};\n            else if (sum < target) left++;\n            else right--;\n        }\n        return {};\n    }\n};",
    timeComplexity: "O(N) linear scan.",
    spaceComplexity: "O(1) auxiliary space.",
    pitfalls: ["Not skipping duplicates when generating unique triplets in 3Sum."],
    subPatterns: [
      {
        id: "tp-opposite",
        name: "Opposite Direction Pointers",
        cues: ["Sorted array pair search", "Two sum on sorted array", "Palindromes"],
        thinkAbout: "When operating on a sorted array where moving left increases sum and moving right decreases sum.",
        coreIdea: "Place left at start and right at end. Move inward based on sum comparison.",
        templateCode: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        int l = 0, r = numbers.size() - 1;\n        while (l < r) {\n            int sum = numbers[l] + numbers[r];\n            if (sum == target) return {l + 1, r + 1};\n            if (sum < target) l++; else r--;\n        }\n        return {};\n    }\n};",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        pitfalls: ["Loop bounds (left < right vs left <= right)."]
      }
    ],
    questions: [
      {
        lcNum: "LC 167",
        title: "Two Sum II - Input Array Is Sorted",
        subPatternId: "tp-opposite",
        url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        diff: "medium",
        statement: "Given a 1-indexed sorted array of integers `numbers`, find two numbers that add up to `target`.",
        bruteForce: {
          explanation: "For each element i, use binary search for (target - numbers[i]) in remaining array.",
          timeComp: "O(N log N)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        for (int i = 0; i < numbers.size(); i++) {\n            int low = i + 1, high = numbers.size() - 1;\n            while (low <= high) {\n                int mid = low + (high - low) / 2;\n                if (numbers[mid] == target - numbers[i]) return {i + 1, mid + 1};\n                if (numbers[mid] < target - numbers[i]) low = mid + 1; else high = mid - 1;\n            }\n        }\n        return {};\n    }\n};"
        },
        optimal: {
          explanation: "Use two pointers at ends of sorted array. Increment left if sum < target, decrement right if sum > target.",
          timeComp: "O(N)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        int l = 0, r = numbers.size() - 1;\n        while (l < r) {\n            int sum = numbers[l] + numbers[r];\n            if (sum == target) return {l + 1, r + 1};\n            if (sum < target) l++; else r--;\n        }\n        return {};\n    }\n};"
        }
      }
    ]
  },
  {
    id: 4,
    name: "Sliding Window",
    cues: [
      "Contiguous subarray or substring",
      "Maximum / Minimum sum of size K",
      "Longest substring with K distinct characters",
      "Window expansion and shrinking"
    ],
    thinkAbout: "When looking for optimal contiguous subarrays or substrings satisfying a condition.",
    coreIdea: "Expand right pointer to include elements. When condition is violated, shrink left pointer until valid.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    int minSubArrayLen(int target, vector<int>& nums) {\n        int left = 0, sum = 0, minLen = INT_MAX;\n        for (int right = 0; right < nums.size(); right++) {\n            sum += nums[right];\n            while (sum >= target) {\n                minLen = min(minLen, right - left + 1);\n                sum -= nums[left++];\n            }\n        }\n        return minLen == INT_MAX ? 0 : minLen;\n    }\n};",
    timeComplexity: "O(N) because left and right pointers move at most N steps.",
    spaceComplexity: "O(1) auxiliary space.",
    pitfalls: ["Shrinking window with if instead of while."],
    subPatterns: [
      {
        id: "sw-variable",
        name: "Variable Length Sliding Window",
        cues: ["Longest substring without repeating characters", "Minimum size subarray sum"],
        thinkAbout: "When finding maximum or minimum length of a valid continuous subarray.",
        coreIdea: "Expand right pointer. Use a hash map or frequency array. Shrink left pointer while condition invalid.",
        templateCode: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> charSet;\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.length(); right++) {\n            while (charSet.count(s[right])) {\n                charSet.erase(s[left++]);\n            }\n            charSet.insert(s[right]);\n            maxLen = max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};",
        timeComplexity: "O(N)",
        spaceComplexity: "O(min(N, AlphabetSize))",
        pitfalls: ["Not updating maxLen after shrinking window."]
      }
    ],
    questions: [
      {
        lcNum: "LC 3",
        title: "Longest Substring Without Repeating Characters",
        subPatternId: "sw-variable",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        diff: "medium",
        statement: "Given a string `s`, find the length of the longest substring without repeating characters.",
        bruteForce: {
          explanation: "Check all substrings (i, j) and verify if characters are unique using set in O(N^3).",
          timeComp: "O(N^3)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        int maxLen = 0;\n        for (int i = 0; i < s.length(); i++) {\n            for (int j = i; j < s.length(); j++) {\n                unordered_set<char> set;\n                bool ok = true;\n                for (int k = i; k <= j; k++) {\n                    if (set.count(s[k])) { ok = false; break; }\n                    set.insert(s[k]);\n                }\n                if (ok) maxLen = max(maxLen, j - i + 1);\n            }\n        }\n        return maxLen;\n    }\n};"
        },
        optimal: {
          explanation: "Maintain sliding window [left, right] with hash set of active characters. Shrink left when duplicate is encountered.",
          timeComp: "O(N)",
          spaceComp: "O(min(N, AlphabetSize))",
          cppCode: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> st;\n        int l = 0, maxLen = 0;\n        for (int r = 0; r < s.length(); r++) {\n            while (st.count(s[r])) st.erase(s[l++]);\n            st.insert(s[r]);\n            maxLen = max(maxLen, r - l + 1);\n        }\n        return maxLen;\n    }\n};"
        }
      }
    ]
  },
  {
    id: 5,
    name: "Binary Search",
    cues: [
      "Sorted array or monotonic function",
      "Search in O(log N) time",
      "Binary Search on Answer (Minimize Maximum / Maximize Minimum)",
      "Rotated sorted array",
      "Search space boundaries [Low, High]"
    ],
    thinkAbout: "When the input is sorted, or when asking for an optimal minimum/maximum value over a range where a feasibility condition check(val) transitions monotonically from False to True.",
    coreIdea: "Halve search space in each step by checking mid = low + (high - low) / 2. Discard half based on sorting invariant.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n};",
    timeComplexity: "O(log N) standard, O(N log(Range)) for BS on answer.",
    spaceComplexity: "O(1) auxiliary space.",
    pitfalls: [
      "Integer overflow in C++ when computing (low + high) / 2.",
      "Infinite loops caused by incorrect pointer updating."
    ],
    subPatterns: [
      {
        id: "bs-standard",
        name: "Standard & Boundary Search",
        cues: ["Sorted array", "O(log N) search"],
        thinkAbout: "When vector is sorted and target search is required in O(log N) time.",
        coreIdea: "Maintain low and high pointers. Halve search space by comparing mid with target.",
        templateCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n};",
        timeComplexity: "O(log N)",
        spaceComplexity: "O(1)",
        pitfalls: ["Using (low + high) / 2 causing overflow."]
      },
      {
        id: "bs-rotated",
        name: "Rotated & Modified Array",
        cues: ["Rotated sorted array", "Identify sorted half"],
        thinkAbout: "At any mid index in a rotated array, one half is guaranteed to be sorted.",
        coreIdea: "Find which half is sorted. Check if target lies within its bounds.",
        templateCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[low] <= nums[mid]) {\n                if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n                else low = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n                else high = mid - 1;\n            }\n        }\n        return -1;\n    }\n};",
        timeComplexity: "O(log N)",
        spaceComplexity: "O(1)",
        pitfalls: ["Duplicates where nums[low] == nums[mid] == nums[high]."]
      },
      {
        id: "bs-on-answer",
        name: "Binary Search on Answer",
        cues: ["Minimize Maximum / Maximize Minimum", "Monotonic check(mid) function"],
        thinkAbout: "When searching for optimal value over bounded range with monotonic feasibility predicate.",
        coreIdea: "Binary search range [Low, High]. Test feasibility with check(mid). Store valid ans and shrink range.",
        templateCode: "class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        int low = 1, high = *max_element(piles.begin(), piles.end());\n        int ans = high;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            long long hours = 0;\n            for (int p : piles) hours += (p + mid - 1) / mid;\n            if (hours <= h) { ans = mid; high = mid - 1; }\n            else low = mid + 1;\n        }\n        return ans;\n    }\n};",
        timeComplexity: "O(N log(Range))",
        spaceComplexity: "O(1)",
        pitfalls: ["Setting low = 0 when speed must be positive."]
      }
    ],
    questions: [
      {
        lcNum: "LC 704",
        title: "Binary Search",
        subPatternId: "bs-standard",
        url: "https://leetcode.com/problems/binary-search/",
        diff: "easy",
        statement: "Given an array of integers `nums` sorted in ascending order and an integer `target`, search `target` in `nums`.",
        bruteForce: {
          explanation: "Linear scan in O(N).",
          timeComp: "O(N)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        for (int i = 0; i < nums.size(); i++) if (nums[i] == target) return i;\n        return -1;\n    }\n};"
        },
        optimal: {
          explanation: "Binary search on sorted array in O(log N).",
          timeComp: "O(log N)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n};"
        }
      },
      {
        lcNum: "LC 33",
        title: "Search In Rotated Sorted Array",
        subPatternId: "bs-rotated",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        diff: "medium",
        statement: "Given rotated array `nums` and integer `target`, return index of `target` or `-1`.",
        bruteForce: {
          explanation: "Linear scan in O(N).",
          timeComp: "O(N)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        for (int i = 0; i < nums.size(); i++) if (nums[i] == target) return i;\n        return -1;\n    }\n};"
        },
        optimal: {
          explanation: "Identify sorted half at mid. Check if target lies within bounds.",
          timeComp: "O(log N)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[low] <= nums[mid]) {\n                if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n                else low = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n                else high = mid - 1;\n            }\n        }\n        return -1;\n    }\n};"
        }
      },
      {
        lcNum: "LC 875",
        title: "Koko Eating Bananas",
        subPatternId: "bs-on-answer",
        url: "https://leetcode.com/problems/koko-eating-bananas/",
        diff: "medium",
        statement: "Return minimum eating speed `k` to finish all piles within `h` hours.",
        bruteForce: {
          explanation: "Linear scan speed k from 1 upwards.",
          timeComp: "O(N * MaxPile)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        int k = 1;\n        while (true) {\n            long long hours = 0;\n            for (int p : piles) hours += (p + k - 1) / k;\n            if (hours <= h) return k;\n            k++;\n        }\n    }\n};"
        },
        optimal: {
          explanation: "Binary Search on Answer range [1, max(piles)].",
          timeComp: "O(N log(MaxPile))",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        int low = 1, high = *max_element(piles.begin(), piles.end());\n        int ans = high;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            long long hours = 0;\n            for (int p : piles) hours += (p + mid - 1) / mid;\n            if (hours <= h) { ans = mid; high = mid - 1; }\n            else low = mid + 1;\n        }\n        return ans;\n    }\n};"
        }
      }
    ]
  },
  {
    id: 6,
    name: "Overlapping Intervals",
    cues: ["Interval start & end times", "Merge overlapping intervals", "Insert interval", "Meeting rooms / Non-overlapping intervals"],
    thinkAbout: "When dealing with continuous ranges [start, end] where events or intervals overlap.",
    coreIdea: "Sort intervals by start time. Iterate through intervals and merge if current start <= previous end.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        if (intervals.empty()) return {};\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> merged = {intervals[0]};\n        for (int i = 1; i < intervals.size(); i++) {\n            if (intervals[i][0] <= merged.back()[1]) {\n                merged.back()[1] = max(merged.back()[1], intervals[i][1]);\n            } else {\n                merged.push_back(intervals[i]);\n            }\n        }\n        return merged;\n    }\n};",
    timeComplexity: "O(N log N) sorting.",
    spaceComplexity: "O(N) for merged results.",
    pitfalls: ["Forgetting to sort intervals before iteration."],
    subPatterns: [
      {
        id: "int-merge",
        name: "Interval Merging & Insertion",
        cues: ["Merge intervals", "Insert interval into sorted list"],
        thinkAbout: "When combining overlapping time ranges into contiguous intervals.",
        coreIdea: "Sort by start time. Compare current start with last merged end.",
        templateCode: "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> res;\n        for (auto& interval : intervals) {\n            if (res.empty() || res.back()[1] < interval[0]) res.push_back(interval);\n            else res.back()[1] = max(res.back()[1], interval[1]);\n        }\n        return res;\n    }\n};",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        pitfalls: ["Not using max for end time updating."]
      }
    ],
    questions: [
      {
        lcNum: "LC 56",
        title: "Merge Intervals",
        subPatternId: "int-merge",
        url: "https://leetcode.com/problems/merge-intervals/",
        diff: "medium",
        statement: "Given an array of `intervals`, merge all overlapping intervals.",
        bruteForce: {
          explanation: "Compare every pair of intervals and merge iteratively in O(N^2).",
          timeComp: "O(N^2)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        // Brute force check\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> res;\n        for (auto& iv : intervals) {\n            if (res.empty() || res.back()[1] < iv[0]) res.push_back(iv);\n            else res.back()[1] = max(res.back()[1], iv[1]);\n        }\n        return res;\n    }\n};"
        },
        optimal: {
          explanation: "Sort by start time in O(N log N). Single pass merge.",
          timeComp: "O(N log N)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> res;\n        for (auto& iv : intervals) {\n            if (res.empty() || res.back()[1] < iv[0]) res.push_back(iv);\n            else res.back()[1] = max(res.back()[1], iv[1]);\n        }\n        return res;\n    }\n};"
        }
      }
    ]
  },
  {
    id: 7,
    name: "Fast & Slow Pointers (Linked List)",
    cues: ["Linked List cycle detection", "Find middle of Linked List", "Floyd's Tortoise and Hare"],
    thinkAbout: "When detecting cycles or finding midpoints in singly linked lists without extra space.",
    coreIdea: "Advance slow pointer by 1 step and fast pointer by 2 steps. If fast meets slow, cycle exists.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n};",
    timeComplexity: "O(N) linear pass.",
    spaceComplexity: "O(1) auxiliary space.",
    pitfalls: ["Dereferencing null pointer when accessing fast->next->next."],
    subPatterns: [
      {
        id: "ll-cycle",
        name: "Cycle Detection & Midpoint",
        cues: ["Floyd's cycle detection", "Find midpoint"],
        thinkAbout: "When finding cycle entry point or linked list midpoint.",
        coreIdea: "Slow moves 1 step, fast moves 2 steps. Midpoint is slow when fast reaches end.",
        templateCode: "class Solution {\npublic:\n    ListNode* middleNode(ListNode* head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n        }\n        return slow;\n    }\n};",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        pitfalls: ["Odd vs even length list checks."]
      }
    ],
    questions: [
      {
        lcNum: "LC 141",
        title: "Linked List Cycle",
        subPatternId: "ll-cycle",
        url: "https://leetcode.com/problems/linked-list-cycle/",
        diff: "easy",
        statement: "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.",
        bruteForce: {
          explanation: "Store visited nodes in hash set in O(N) space.",
          timeComp: "O(N)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        unordered_set<ListNode*> visited;\n        while (head) {\n            if (visited.count(head)) return true;\n            visited.insert(head);\n            head = head->next;\n        }\n        return false;\n    }\n};"
        },
        optimal: {
          explanation: "Floyd's Tortoise and Hare algorithm with fast and slow pointers.",
          timeComp: "O(N)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n};"
        }
      }
    ]
  },
  {
    id: 8,
    name: "Monotonic Stack",
    cues: [
      "Next Greater Element",
      "Next Smaller Element",
      "Daily temperatures / Days to wait",
      "Histogram largest rectangle / Max area",
      "Monotonically increasing/decreasing order"
    ],
    thinkAbout: "When needing to find nearest larger or smaller element for every index in linear time.",
    coreIdea: "Maintain stack of indices kept strictly monotonic. When new element breaks monotonicity, pop top — current element is Next Greater/Smaller!",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temp) {\n        int n = temp.size();\n        vector<int> res(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temp[st.top()] < temp[i]) {\n                int idx = st.top(); st.pop();\n                res[idx] = i - idx;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};",
    timeComplexity: "O(N) each element pushed and popped at most once.",
    spaceComplexity: "O(N) for stack.",
    pitfalls: ["Storing values on stack instead of indices."],
    subPatterns: [
      {
        id: "ms-basic",
        name: "Basic Stack Matching",
        cues: ["LIFO matching", "Valid Parentheses"],
        thinkAbout: "When matching symbol pairs in reverse order of arrival.",
        coreIdea: "Push opening symbols. Pop and check on closing symbols.",
        templateCode: "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;\n            }\n        }\n        return st.empty();\n    }\n};",
        timeComplexity: "O(N)",
        spaceComplexity: "O(N)",
        pitfalls: ["Not checking st.empty() before st.top()."]
      },
      {
        id: "ms-next-greater",
        name: "Next Greater / Smaller Element",
        cues: ["Next Greater Element", "Daily temperatures"],
        thinkAbout: "When finding distance to nearest greater/smaller element for every index.",
        coreIdea: "Stack indices in monotonic order. Pop when current element breaks order.",
        templateCode: "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temp) {\n        int n = temp.size();\n        vector<int> res(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temp[st.top()] < temp[i]) {\n                int idx = st.top(); st.pop();\n                res[idx] = i - idx;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};",
        timeComplexity: "O(N)",
        spaceComplexity: "O(N)",
        pitfalls: ["Pushing values instead of indices."]
      }
    ],
    questions: [
      {
        lcNum: "LC 20",
        title: "Valid Parentheses",
        subPatternId: "ms-basic",
        url: "https://leetcode.com/problems/valid-parentheses/",
        diff: "easy",
        statement: "Given string `s` containing brackets, determine if input string is valid.",
        bruteForce: {
          explanation: "Repeatedly replace matching pairs in string in O(N^2).",
          timeComp: "O(N^2)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    bool isValid(string s) {\n        int len;\n        do {\n            len = s.length();\n            int pos;\n            if ((pos = s.find(\"()\")) != string::npos) s.erase(pos, 2);\n            else if ((pos = s.find(\"[]\")) != string::npos) s.erase(pos, 2);\n            else if ((pos = s.find(\"{}\")) != string::npos) s.erase(pos, 2);\n        } while (s.length() < len);\n        return s.empty();\n    }\n};"
        },
        optimal: {
          explanation: "Push opening brackets. Pop matching bracket on closing in O(N).",
          timeComp: "O(N)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;\n            }\n        }\n        return st.empty();\n    }\n};"
        }
      },
      {
        lcNum: "LC 739",
        title: "Daily Temperatures",
        subPatternId: "ms-next-greater",
        url: "https://leetcode.com/problems/daily-temperatures/",
        diff: "medium",
        statement: "Return array `answer` such that `answer[i]` is number of days to wait for warmer temp.",
        bruteForce: {
          explanation: "Nested loops for each day in O(N^2).",
          timeComp: "O(N^2)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temp) {\n        int n = temp.size();\n        vector<int> res(n, 0);\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                if (temp[j] > temp[i]) { res[i] = j - i; break; }\n            }\n        }\n        return res;\n    }\n};"
        },
        optimal: {
          explanation: "Monotonic stack storing indices. Pop elements when current temp is higher in O(N).",
          timeComp: "O(N)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temp) {\n        int n = temp.size();\n        vector<int> res(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temp[st.top()] < temp[i]) {\n                int idx = st.top(); st.pop();\n                res[idx] = i - idx;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};"
        }
      }
    ]
  },
  {
    id: 9,
    name: "Heap / Priority Queue",
    cues: ["Top K elements", "Kth largest / smallest", "Merge K sorted lists", "Stream median / Two heaps"],
    thinkAbout: "When needing dynamic minimum or maximum elements from a stream or array without full sorting.",
    coreIdea: "Use max-heap or min-heap (`std::priority_queue`). Maintain heap size K for Top K problems.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> minHeap;\n        for (int x : nums) {\n            minHeap.push(x);\n            if (minHeap.size() > k) minHeap.pop();\n        }\n        return minHeap.top();\n    }\n};",
    timeComplexity: "O(N log K) for Top K elements.",
    spaceComplexity: "O(K) for priority queue size.",
    pitfalls: ["Using Max-Heap for Top K Largest (uses O(N log N) space instead of O(K) min-heap)."],
    subPatterns: [
      {
        id: "heap-topk",
        name: "Top K Elements / Min-Heap Pattern",
        cues: ["Kth largest element", "Top K frequent elements"],
        thinkAbout: "When finding Top K largest, keep a Min-Heap of size K. Discard smallest elements.",
        coreIdea: "Push into Min-Heap. If size > K, pop. Top of heap is Kth largest.",
        templateCode: "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> pq;\n        for (int x : nums) {\n            pq.push(x);\n            if (pq.size() > k) pq.pop();\n        }\n        return pq.top();\n    }\n};",
        timeComplexity: "O(N log K)",
        spaceComplexity: "O(K)",
        pitfalls: ["Using max-heap instead of min-heap."]
      }
    ],
    questions: [
      {
        lcNum: "LC 215",
        title: "Kth Largest Element in an Array",
        subPatternId: "heap-topk",
        url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        diff: "medium",
        statement: "Given an integer array `nums` and an integer `k`, return the `k-th` largest element in the array.",
        bruteForce: {
          explanation: "Sort array descending and return nums[k-1] in O(N log N).",
          timeComp: "O(N log N)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        sort(nums.rbegin(), nums.rend());\n        return nums[k-1];\n    }\n};"
        },
        optimal: {
          explanation: "Maintain Min-Heap of size K. Push elements and pop when size > K. Top is result.",
          timeComp: "O(N log K)",
          spaceComp: "O(K)",
          cppCode: "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> pq;\n        for (int x : nums) {\n            pq.push(x);\n            if (pq.size() > k) pq.pop();\n        }\n        return pq.top();\n    }\n};"
        }
      }
    ]
  },
  {
    id: 10,
    name: "Tree DFS / Depth First Search",
    cues: ["Tree traversal", "Maximum depth / Height of Binary Tree", "Path sum", "Lowest Common Ancestor"],
    thinkAbout: "When problem explores tree paths from root to leaves or computes property recursively.",
    coreIdea: "Recursively process left and right subtrees. Base case: root == nullptr return 0/default.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};",
    timeComplexity: "O(N) visits each node once.",
    spaceComplexity: "O(H) recursion stack height.",
    pitfalls: ["Forgetting base case root == nullptr."],
    subPatterns: [
      {
        id: "tree-dfs-height",
        name: "Tree Height & Depth Recursion",
        cues: ["Max depth", "Balanced tree check"],
        thinkAbout: "When calculating tree height or bottom-up property.",
        coreIdea: "Base case 0. Recursively calculate left and right heights.",
        templateCode: "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};",
        timeComplexity: "O(N)",
        spaceComplexity: "O(H)",
        pitfalls: ["Stack overflow on skewed tree."]
      }
    ],
    questions: [
      {
        lcNum: "LC 104",
        title: "Maximum Depth of Binary Tree",
        subPatternId: "tree-dfs-height",
        url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        diff: "easy",
        statement: "Given `root` of binary tree, return its maximum depth.",
        bruteForce: {
          explanation: "Recursive traversal calculating path lengths.",
          timeComp: "O(N)",
          spaceComp: "O(H)",
          cppCode: "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};"
        },
        optimal: {
          explanation: "Standard DFS post-order traversal.",
          timeComp: "O(N)",
          spaceComp: "O(H)",
          cppCode: "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};"
        }
      }
    ]
  },
  {
    id: 11,
    name: "Tree BFS / Level Order Traversal",
    cues: ["Level order traversal", "Level by level processing", "Zigzag traversal", "Populate next right pointers"],
    thinkAbout: "When problem processes tree nodes level by level or asks for shortest distance from root.",
    coreIdea: "Use FIFO queue (`std::queue<TreeNode*>`). Process all nodes in queue at current level count.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        if (!root) return {};\n        vector<vector<int>> res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> level;\n            for (int i = 0; i < sz; i++) {\n                TreeNode* curr = q.front(); q.pop();\n                level.push_back(curr->val);\n                if (curr->left) q.push(curr->left);\n                if (curr->right) q.push(curr->right);\n            }\n            res.push_back(level);\n        }\n        return res;\n    }\n};",
    timeComplexity: "O(N) visits each node once.",
    spaceComplexity: "O(W) max tree width in queue.",
    pitfalls: ["Not capturing q.size() in fixed variable before inner loop."],
    subPatterns: [
      {
        id: "tree-bfs-level",
        name: "Standard Level Order Traversal",
        cues: ["Level order", "Queue BFS"],
        thinkAbout: "When grouping nodes level by level.",
        coreIdea: "Push root. Loop while queue non-empty. Capture level size and pop nodes.",
        templateCode: "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        if (!root) return {};\n        vector<vector<int>> res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> lvl;\n            for (int i = 0; i < sz; i++) {\n                TreeNode* curr = q.front(); q.pop();\n                lvl.push_back(curr->val);\n                if (curr->left) q.push(curr->left);\n                if (curr->right) q.push(curr->right);\n            }\n            res.push_back(lvl);\n        }\n        return res;\n    }\n};",
        timeComplexity: "O(N)",
        spaceComplexity: "O(W)",
        pitfalls: ["Using dynamically growing q.size() in loop condition."]
      }
    ],
    questions: [
      {
        lcNum: "LC 102",
        title: "Binary Tree Level Order Traversal",
        subPatternId: "tree-bfs-level",
        url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        diff: "medium",
        statement: "Given `root` of binary tree, return level order traversal of its nodes' values.",
        bruteForce: {
          explanation: "Recursive DFS carrying level depth parameter in O(N).",
          timeComp: "O(N)",
          spaceComp: "O(H)",
          cppCode: "class Solution {\npublic:\n    void dfs(TreeNode* root, int lvl, vector<vector<int>>& res) {\n        if (!root) return;\n        if (lvl == res.size()) res.push_back({});\n        res[lvl].push_back(root->val);\n        dfs(root->left, lvl + 1, res);\n        dfs(root->right, lvl + 1, res);\n    }\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        vector<vector<int>> res;\n        dfs(root, 0, res);\n        return res;\n    }\n};"
        },
        optimal: {
          explanation: "Queue-based iterative BFS traversal level by level in O(N).",
          timeComp: "O(N)",
          spaceComp: "O(W)",
          cppCode: "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        if (!root) return {};\n        vector<vector<int>> res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> lvl;\n            for (int i = 0; i < sz; i++) {\n                TreeNode* curr = q.front(); q.pop();\n                lvl.push_back(curr->val);\n                if (curr->left) q.push(curr->left);\n                if (curr->right) q.push(curr->right);\n            }\n            res.push_back(lvl);\n        }\n        return res;\n    }\n};"
        }
      }
    ]
  },
  {
    id: 12,
    name: "Binary Search Tree (BST)",
    cues: ["Left < Root < Right invariant", "Validate BST", "Inorder traversal gives sorted order", "Search/Insert in BST"],
    thinkAbout: "When operating on Binary Search Tree where Left subtree < Root < Right subtree.",
    coreIdea: "Leverage BST ordering property. Inorder traversal yields strictly ascending sorted array.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    bool validate(TreeNode* root, long long minVal, long long maxVal) {\n        if (!root) return true;\n        if (root->val <= minVal || root->val >= maxVal) return false;\n        return validate(root->left, minVal, root->val) && validate(root->right, root->val, maxVal);\n    }\n    bool isValidBST(TreeNode* root) {\n        return validate(root, LONG_MIN, LONG_MAX);\n    }\n};",
    timeComplexity: "O(N) validation, O(H) search.",
    spaceComplexity: "O(H) recursion stack.",
    pitfalls: ["Only checking root->left->val < root->val instead of entire left subtree."],
    subPatterns: [
      {
        id: "bst-validate",
        name: "BST Validation & Inorder Property",
        cues: ["Validate BST", "Inorder traversal"],
        thinkAbout: "When verifying if tree satisfies BST properties.",
        coreIdea: "Pass min and max bounds recursively, or check if inorder traversal is strictly increasing.",
        templateCode: "class Solution {\npublic:\n    bool validate(TreeNode* root, long long minVal, long long maxVal) {\n        if (!root) return true;\n        if (root->val <= minVal || root->val >= maxVal) return false;\n        return validate(root->left, minVal, root->val) && validate(root->right, root->val, maxVal);\n    }\n    bool isValidBST(TreeNode* root) {\n        return validate(root, LONG_MIN, LONG_MAX);\n    }\n};",
        timeComplexity: "O(N)",
        spaceComplexity: "O(H)",
        pitfalls: ["Using INT_MIN/INT_MAX bounds causing equality failure on boundary nodes."]
      }
    ],
    questions: [
      {
        lcNum: "LC 98",
        title: "Validate Binary Search Tree",
        subPatternId: "bst-validate",
        url: "https://leetcode.com/problems/validate-binary-search-tree/",
        diff: "medium",
        statement: "Given `root` of binary tree, determine if it is a valid binary search tree.",
        bruteForce: {
          explanation: "Store inorder traversal in array and check if strictly sorted in O(N).",
          timeComp: "O(N)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    void inorder(TreeNode* root, vector<int>& vals) {\n        if (!root) return;\n        inorder(root->left, vals);\n        vals.push_back(root->val);\n        inorder(root->right, vals);\n    }\n    bool isValidBST(TreeNode* root) {\n        vector<int> vals;\n        inorder(root, vals);\n        for (int i = 1; i < vals.size(); i++) if (vals[i] <= vals[i-1]) return false;\n        return true;\n    }\n};"
        },
        optimal: {
          explanation: "Recursive range checking passing min/max bounds in O(N) time and O(H) space.",
          timeComp: "O(N)",
          spaceComp: "O(H)",
          cppCode: "class Solution {\npublic:\n    bool validate(TreeNode* root, long long minV, long long maxV) {\n        if (!root) return true;\n        if (root->val <= minV || root->val >= maxV) return false;\n        return validate(root->left, minV, root->val) && validate(root->right, root->val, maxV);\n    }\n    bool isValidBST(TreeNode* root) {\n        return validate(root, LONG_MIN, LONG_MAX);\n    }\n};"
        }
      }
    ]
  },
  {
    id: 13,
    name: "Backtracking / Subsets & Permutations",
    cues: ["Generate all subsets", "Permutations / Combinations", "N-Queens / Sudoku Solver", "Decision tree traversal with undo"],
    thinkAbout: "When generating all combinatorial arrangements or exploring decision paths with undo step.",
    coreIdea: "Choose, Recurse, Un-choose (Backtrack). Push element, recurse to next state, pop element.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    void backtrack(int start, vector<int>& nums, vector<int>& curr, vector<vector<int>>& res) {\n        res.push_back(curr);\n        for (int i = start; i < nums.size(); i++) {\n            curr.push_back(nums[i]);\n            backtrack(i + 1, nums, curr, res);\n            curr.pop_back(); // Backtrack undo\n        }\n    }\n    vector<vector<int>> subsets(vector<int>& nums) {\n        vector<vector<int>> res;\n        vector<int> curr;\n        backtrack(0, nums, curr, res);\n        return res;\n    }\n};",
    timeComplexity: "O(2^N) for subsets, O(N!) for permutations.",
    spaceComplexity: "O(N) recursion depth.",
    pitfalls: ["Forgetting pop_back() undo step."],
    subPatterns: [
      {
        id: "bt-subsets",
        name: "Subsets & Combination Choice",
        cues: ["Generate subsets", "Combinations"],
        thinkAbout: "When choosing include/exclude for every element.",
        coreIdea: "Recurse from start index. Push element, backtrack, pop element.",
        templateCode: "class Solution {\npublic:\n    void backtrack(int start, vector<int>& nums, vector<int>& curr, vector<vector<int>>& res) {\n        res.push_back(curr);\n        for (int i = start; i < nums.size(); i++) {\n            curr.push_back(nums[i]);\n            backtrack(i + 1, nums, curr, res);\n            curr.pop_back();\n        }\n    }\n    vector<vector<int>> subsets(vector<int>& nums) {\n        vector<vector<int>> res;\n        vector<int> curr;\n        backtrack(0, nums, curr, res);\n        return res;\n    }\n};",
        timeComplexity: "O(2^N)",
        spaceComplexity: "O(N)",
        pitfalls: ["Not handling duplicate elements in array."]
      }
    ],
    questions: [
      {
        lcNum: "LC 78",
        title: "Subsets",
        subPatternId: "bt-subsets",
        url: "https://leetcode.com/problems/subsets/",
        diff: "medium",
        statement: "Given integer array `nums` of unique elements, return all possible subsets.",
        bruteForce: {
          explanation: "Bit manipulation generating all 2^N binary masks.",
          timeComp: "O(N * 2^N)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        int n = nums.size();\n        vector<vector<int>> res;\n        for (int mask = 0; mask < (1 << n); mask++) {\n            vector<int> sub;\n            for (int i = 0; i < n; i++) {\n                if (mask & (1 << i)) sub.push_back(nums[i]);\n            }\n            res.push_back(sub);\n        }\n        return res;\n    }\n};"
        },
        optimal: {
          explanation: "Backtracking recursion tree. Push element, recurse, pop element.",
          timeComp: "O(2^N)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    void backtrack(int start, vector<int>& nums, vector<int>& curr, vector<vector<int>>& res) {\n        res.push_back(curr);\n        for (int i = start; i < nums.size(); i++) {\n            curr.push_back(nums[i]);\n            backtrack(i + 1, nums, curr, res);\n            curr.pop_back();\n        }\n    }\n    vector<vector<int>> subsets(vector<int>& nums) {\n        vector<vector<int>> res;\n        vector<int> curr;\n        backtrack(0, nums, curr, res);\n        return res;\n    }\n};"
        }
      }
    ]
  },
  {
    id: 14,
    name: "Graph DFS / BFS",
    cues: ["Connected components", "Number of islands", "Shortest path in unweighted graph", "Flood fill / Matrix traversal"],
    thinkAbout: "When exploring node connections in graph or 2D grid matrix.",
    coreIdea: "Maintain visited array/matrix. Use DFS recursion or BFS queue to visit connected neighbors.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    void dfs(vector<vector<char>>& grid, int r, int c) {\n        int m = grid.size(), n = grid[0].size();\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;\n        grid[r][c] = '0'; // Mark visited\n        dfs(grid, r + 1, c); dfs(grid, r - 1, c);\n        dfs(grid, r, c + 1); dfs(grid, r, c - 1);\n    }\n    int numIslands(vector<vector<char>>& grid) {\n        int count = 0;\n        for (int i = 0; i < grid.size(); i++) {\n            for (int j = 0; j < grid[0].size(); j++) {\n                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }\n            }\n        }\n        return count;\n    }\n};",
    timeComplexity: "O(V + E) or O(M * N) grid traversal.",
    spaceComplexity: "O(V) visited array / recursion depth.",
    pitfalls: ["Infinite loops caused by not marking visited nodes."],
    subPatterns: [
      {
        id: "graph-grid-dfs",
        name: "Grid Matrix Flood Fill DFS",
        cues: ["Number of Islands", "Flood Fill"],
        thinkAbout: "When counting connected components in 2D matrix.",
        coreIdea: "Check boundary bounds. Sink visited cells ('1' -> '0'). Recurse in 4 directions.",
        templateCode: "class Solution {\npublic:\n    void dfs(vector<vector<char>>& grid, int r, int c) {\n        int m = grid.size(), n = grid[0].size();\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;\n        grid[r][c] = '0';\n        dfs(grid, r+1, c); dfs(grid, r-1, c);\n        dfs(grid, r, c+1); dfs(grid, r, c-1);\n    }\n    int numIslands(vector<vector<char>>& grid) {\n        int count = 0;\n        for (int i = 0; i < grid.size(); i++) {\n            for (int j = 0; j < grid[0].size(); j++) {\n                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }\n            }\n        }\n        return count;\n    }\n};",
        timeComplexity: "O(M * N)",
        spaceComplexity: "O(M * N) worst case recursion.",
        pitfalls: ["Out of bounds access before base check."]
      }
    ],
    questions: [
      {
        lcNum: "LC 200",
        title: "Number of Islands",
        subPatternId: "graph-grid-dfs",
        url: "https://leetcode.com/problems/number-of-islands/",
        diff: "medium",
        statement: "Given `m x n` 2D binary grid `grid`, return total number of islands.",
        bruteForce: {
          explanation: "BFS/DFS using separate visited 2D boolean array.",
          timeComp: "O(M * N)",
          spaceComp: "O(M * N)",
          cppCode: "class Solution {\npublic:\n    void dfs(vector<vector<char>>& grid, int r, int c, vector<vector<bool>>& vis) {\n        int m = grid.size(), n = grid[0].size();\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] == '0' || vis[r][c]) return;\n        vis[r][c] = true;\n        dfs(grid, r+1, c, vis); dfs(grid, r-1, c, vis);\n        dfs(grid, r, c+1, vis); dfs(grid, r, c-1, vis);\n    }\n    int numIslands(vector<vector<char>>& grid) {\n        int m = grid.size(), n = grid[0].size(), count = 0;\n        vector<vector<bool>> vis(m, vector<bool>(n, false));\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (grid[i][j] == '1' && !vis[i][j]) { count++; dfs(grid, i, j, vis); }\n            }\n        }\n        return count;\n    }\n};"
        },
        optimal: {
          explanation: "In-place grid sinking ('1' -> '0') via DFS traversal.",
          timeComp: "O(M * N)",
          spaceComp: "O(M * N)",
          cppCode: "class Solution {\npublic:\n    void dfs(vector<vector<char>>& grid, int r, int c) {\n        int m = grid.size(), n = grid[0].size();\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;\n        grid[r][c] = '0';\n        dfs(grid, r+1, c); dfs(grid, r-1, c);\n        dfs(grid, r, c+1); dfs(grid, r, c-1);\n    }\n    int numIslands(vector<vector<char>>& grid) {\n        int count = 0;\n        for (int i = 0; i < grid.size(); i++) {\n            for (int j = 0; j < grid[0].size(); j++) {\n                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }\n            }\n        }\n        return count;\n    }\n};"
        }
      }
    ]
  },
  {
    id: 15,
    name: "Topological Sort (Kahn's Algorithm)",
    cues: ["Prerequisites / Course Schedule", "Directed Acyclic Graph (DAG)", "In-degree array", "Order of execution"],
    thinkAbout: "When ordering tasks with prerequisite dependency constraints.",
    coreIdea: "Build adjacency list and in-degree array. Push nodes with in-degree == 0 into queue. Decrement in-degree of neighbors.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> inDegree(numCourses, 0);\n        for (auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            inDegree[p[0]]++;\n        }\n        queue<int> q;\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);\n        int visited = 0;\n        while (!q.empty()) {\n            int u = q.front(); q.pop();\n            visited++;\n            for (int v : adj[u]) {\n                if (--inDegree[v] == 0) q.push(v);\n            }\n        }\n        return visited == numCourses;\n    }\n};",
    timeComplexity: "O(V + E) time.",
    spaceComplexity: "O(V + E) space.",
    pitfalls: ["Reversing direction of directed edge in adjacency list."],
    subPatterns: [
      {
        id: "topo-kahns",
        name: "Kahn's BFS In-degree Algorithm",
        cues: ["Course schedule", "Prerequisite order"],
        thinkAbout: "When checking cycle or ordering nodes with dependencies.",
        coreIdea: "Queue in-degree 0 nodes. Decrement neighbor degrees upon processing.",
        templateCode: "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> inDegree(numCourses, 0);\n        for (auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            inDegree[p[0]]++;\n        }\n        queue<int> q;\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);\n        int visited = 0;\n        while (!q.empty()) {\n            int u = q.front(); q.pop(); visited++;\n            for (int v : adj[u]) if (--inDegree[v] == 0) q.push(v);\n        }\n        return visited == numCourses;\n    }\n};",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)",
        pitfalls: ["Not checking visited == numCourses for cycle detection."]
      }
    ],
    questions: [
      {
        lcNum: "LC 207",
        title: "Course Schedule",
        subPatternId: "topo-kahns",
        url: "https://leetcode.com/problems/course-schedule/",
        diff: "medium",
        statement: "Given total `numCourses` and prerequisites, return `true` if you can finish all courses.",
        bruteForce: {
          explanation: "DFS cycle detection with 3-state visited array (0=unvisited, 1=visiting, 2=visited).",
          timeComp: "O(V + E)",
          spaceComp: "O(V + E)",
          cppCode: "class Solution {\npublic:\n    bool dfs(int u, vector<vector<int>>& adj, vector<int>& vis) {\n        vis[u] = 1;\n        for (int v : adj[u]) {\n            if (vis[v] == 1) return true; // Cycle\n            if (vis[v] == 0 && dfs(v, adj, vis)) return true;\n        }\n        vis[u] = 2;\n        return false;\n    }\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        for (auto& p : prerequisites) adj[p[1]].push_back(p[0]);\n        vector<int> vis(numCourses, 0);\n        for (int i = 0; i < numCourses; i++) {\n            if (vis[i] == 0 && dfs(i, adj, vis)) return false;\n        }\n        return true;\n    }\n};"
        },
        optimal: {
          explanation: "Kahn's BFS In-degree algorithm. Process in-degree 0 nodes.",
          timeComp: "O(V + E)",
          spaceComp: "O(V + E)",
          cppCode: "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> inDegree(numCourses, 0);\n        for (auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            inDegree[p[0]]++;\n        }\n        queue<int> q;\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);\n        int visited = 0;\n        while (!q.empty()) {\n            int u = q.front(); q.pop(); visited++;\n            for (int v : adj[u]) if (--inDegree[v] == 0) q.push(v);\n        }\n        return visited == numCourses;\n    }\n};"
        }
      }
    ]
  },
  {
    id: 16,
    name: "Disjoint Set Union (DSU / Union-Find)",
    cues: ["Dynamic connectivity", "Redundant connection", "Kruskal's MST", "Connected components merging"],
    thinkAbout: "When checking if elements belong to same connected component or dynamically merging components.",
    coreIdea: "Maintain parent vector. Implement find() with path compression and union() by rank.",
    templateLabel: "Modern C++ Template",
    templateCode: "class DSU {\n    vector<int> parent, rank;\npublic:\n    DSU(int n) {\n        parent.resize(n); iota(parent.begin(), parent.end(), 0);\n        rank.assign(n, 0);\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]); // Path compression\n    }\n    bool unite(int i, int j) {\n        int rootI = find(i), rootJ = find(j);\n        if (rootI != rootJ) {\n            if (rank[rootI] < rank[rootJ]) swap(rootI, rootJ);\n            parent[rootJ] = rootI;\n            if (rank[rootI] == rank[rootJ]) rank[rootI]++;\n            return true;\n        }\n        return false; // Cycle detected\n    }\n};",
    timeComplexity: "O(alpha(N)) nearly O(1) amortized.",
    spaceComplexity: "O(N) parent array.",
    pitfalls: ["Forgetting path compression `parent[i] = find(parent[i])`."],
    subPatterns: [
      {
        id: "dsu-basic",
        name: "DSU Path Compression & Union by Rank",
        cues: ["Redundant Connection", "Union Find"],
        thinkAbout: "When detecting cycles in undirected graph or merging components.",
        coreIdea: "Implement find with path compression and unite returning false on cycle.",
        templateCode: "class DSU {\n    vector<int> parent;\npublic:\n    DSU(int n) {\n        parent.resize(n);\n        iota(parent.begin(), parent.end(), 0);\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]);\n    }\n    bool unite(int i, int j) {\n        int rI = find(i), rJ = find(j);\n        if (rI == rJ) return false;\n        parent[rI] = rJ;\n        return true;\n    }\n};",
        timeComplexity: "O(alpha(N))",
        spaceComplexity: "O(N)",
        pitfalls: ["Not initializing iota parent array."]
      }
    ],
    questions: [
      {
        lcNum: "LC 684",
        title: "Redundant Connection",
        subPatternId: "dsu-basic",
        url: "https://leetcode.com/problems/redundant-connection/",
        diff: "medium",
        statement: "Given undirected graph starting as a tree with 1 extra edge, return that edge causing cycle.",
        bruteForce: {
          explanation: "DFS cycle search after adding each edge in O(N^2).",
          timeComp: "O(N^2)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    bool dfs(int u, int target, vector<vector<int>>& adj, vector<bool>& vis) {\n        if (u == target) return true;\n        vis[u] = true;\n        for (int v : adj[u]) {\n            if (!vis[v] && dfs(v, target, adj, vis)) return true;\n        }\n        return false;\n    }\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\n        int n = edges.size();\n        vector<vector<int>> adj(n + 1);\n        for (auto& e : edges) {\n            vector<bool> vis(n + 1, false);\n            if (!adj[e[0]].empty() && !adj[e[1]].empty() && dfs(e[0], e[1], adj, vis)) return e;\n            adj[e[0]].push_back(e[1]);\n            adj[e[1]].push_back(e[0]);\n        }\n        return {};\n    }\n};"
        },
        optimal: {
          explanation: "Union-Find with path compression. Return first edge where unite(u, v) returns false.",
          timeComp: "O(N alpha(N))",
          spaceComp: "O(N)",
          cppCode: "class DSU {\npublic:\n    vector<int> parent;\n    DSU(int n) { parent.resize(n+1); iota(parent.begin(), parent.end(), 0); }\n    int find(int i) { return parent[i] == i ? i : parent[i] = find(parent[i]); }\n    bool unite(int i, int j) {\n        int rI = find(i), rJ = find(j);\n        if (rI == rJ) return false;\n        parent[rI] = rJ;\n        return true;\n    }\n};\nclass Solution {\npublic:\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\n        DSU dsu(edges.size());\n        for (auto& e : edges) {\n            if (!dsu.unite(e[0], e[1])) return e;\n        }\n        return {};\n    }\n};"
        }
      }
    ]
  },
  {
    id: 17,
    name: "1D Dynamic Programming",
    cues: ["Climbing stairs", "House robber", "Longest Increasing Subsequence", "Optimal choices with overlapping subproblems"],
    thinkAbout: "When decision at state i depends on previous states dp[i-1], dp[i-2], etc.",
    coreIdea: "Define state dp[i]. Establish transition relation (e.g., dp[i] = max(dp[i-1], dp[i-2] + val[i])).",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        if (nums.empty()) return 0;\n        int prev2 = 0, prev1 = 0;\n        for (int x : nums) {\n            int curr = max(prev1, prev2 + x);\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        return prev1;\n    }\n};",
    timeComplexity: "O(N) linear iteration.",
    spaceComplexity: "O(1) space optimization.",
    pitfalls: ["Out of bounds when accessing base cases dp[0] or dp[1]."],
    subPatterns: [
      {
        id: "dp-1d-basic",
        name: "State Transition & Space Optimization",
        cues: ["House Robber", "Climbing Stairs"],
        thinkAbout: "When state depends on 2 preceding states.",
        coreIdea: "Maintain prev1 and prev2 variables instead of full dp array.",
        templateCode: "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        int prev2 = 0, prev1 = 0;\n        for (int x : nums) {\n            int curr = max(prev1, prev2 + x);\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        return prev1;\n    }\n};",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        pitfalls: ["Incorrect base case initialization."]
      }
    ],
    questions: [
      {
        lcNum: "LC 198",
        title: "House Robber",
        subPatternId: "dp-1d-basic",
        url: "https://leetcode.com/problems/house-robber/",
        diff: "medium",
        statement: "Determine maximum amount of money you can rob tonight without robbing adjacent houses.",
        bruteForce: {
          explanation: "Recursive decision tree explore rob / don't rob choices in O(2^N).",
          timeComp: "O(2^N)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    int solve(int idx, vector<int>& nums) {\n        if (idx >= nums.size()) return 0;\n        return max(solve(idx + 1, nums), nums[idx] + solve(idx + 2, nums));\n    }\n    int rob(vector<int>& nums) {\n        return solve(0, nums);\n    }\n};"
        },
        optimal: {
          explanation: "Dynamic programming with space optimization in O(N) time and O(1) space.",
          timeComp: "O(N)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        int prev2 = 0, prev1 = 0;\n        for (int x : nums) {\n            int curr = max(prev1, prev2 + x);\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        return prev1;\n    }\n};"
        }
      }
    ]
  },
  {
    id: 18,
    name: "Knapsack / 2D Dynamic Programming",
    cues: ["0/1 Knapsack", "Coin Change / Unbounded Knapsack", "Target Sum", "Grid Minimum Path Sum"],
    thinkAbout: "When selecting items under capacity constraint or calculating optimal path on 2D grid.",
    coreIdea: "State dp[i][w] = max value using first i items with capacity w. Transition: take or skip item.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) {\n                if (i - c >= 0) dp[i] = min(dp[i], 1 + dp[i - c]);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};",
    timeComplexity: "O(N * Amount) or O(M * N).",
    spaceComplexity: "O(Amount) space.",
    pitfalls: ["Initializing DP array with 0 instead of infinity when finding minimum."],
    subPatterns: [
      {
        id: "dp-knapsack",
        name: "Unbounded Knapsack / Coin Change",
        cues: ["Coin Change", "Combination Sum IV"],
        thinkAbout: "When items can be reused infinitely to reach target sum.",
        coreIdea: "Loop amount 1..Target. Iterate coins and transition dp[i] = min(dp[i], 1 + dp[i-coin]).",
        templateCode: "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) {\n                if (i - c >= 0) dp[i] = min(dp[i], 1 + dp[i - c]);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};",
        timeComplexity: "O(N * Amount)",
        spaceComplexity: "O(Amount)",
        pitfalls: ["Integer overflow when adding 1 to infinity."]
      }
    ],
    questions: [
      {
        lcNum: "LC 322",
        title: "Coin Change",
        subPatternId: "dp-knapsack",
        url: "https://leetcode.com/problems/coin-change/",
        diff: "medium",
        statement: "Return fewest number of coins needed to make up amount, or `-1` if impossible.",
        bruteForce: {
          explanation: "Recursive recursion tree testing all coin combinations in O(S^N).",
          timeComp: "O(S^N)",
          spaceComp: "O(Amount)",
          cppCode: "class Solution {\npublic:\n    int solve(vector<int>& coins, int rem) {\n        if (rem == 0) return 0;\n        if (rem < 0) return 1e9;\n        int res = 1e9;\n        for (int c : coins) res = min(res, 1 + solve(coins, rem - c));\n        return res;\n    }\n    int coinChange(vector<int>& coins, int amount) {\n        int ans = solve(coins, amount);\n        return ans >= 1e9 ? -1 : ans;\n    }\n};"
        },
        optimal: {
          explanation: "1D DP array of size amount + 1 in O(N * Amount).",
          timeComp: "O(N * Amount)",
          spaceComp: "O(Amount)",
          cppCode: "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) if (i - c >= 0) dp[i] = min(dp[i], 1 + dp[i - c]);\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};"
        }
      }
    ]
  },
  {
    id: 19,
    name: "Bit Manipulation & Bitmasking",
    cues: ["Bitwise XOR / AND / OR", "Single Number (XOR cancelation)", "Count set bits (Hamming Weight)", "Bitmask state representation"],
    thinkAbout: "When operating directly on binary bit representation or storing set subsets as integer bitmasks.",
    coreIdea: "XOR properties: X ^ X = 0 and X ^ 0 = X. Clear lowest set bit: `n & (n - 1)`.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int res = 0;\n        for (int x : nums) res ^= x;\n        return res;\n    }\n};",
    timeComplexity: "O(N) single pass or O(1) bit operations.",
    spaceComplexity: "O(1) constant space.",
    pitfalls: ["Bitwise operator precedence (e.g. `a & b == 0` evaluates `b == 0` first!). Always wrap bit operations in parentheses `(a & b) == 0`."],
    subPatterns: [
      {
        id: "bit-xor",
        name: "XOR Cancelation & Single Number",
        cues: ["Single Number", "XOR identity"],
        thinkAbout: "When every element appears twice except one single element.",
        coreIdea: "XOR all array elements. Duplicate pairs cancel out to 0, leaving single element.",
        templateCode: "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int res = 0;\n        for (int x : nums) res ^= x;\n        return res;\n    }\n};",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        pitfalls: ["Operator precedence errors without parentheses."]
      }
    ],
    questions: [
      {
        lcNum: "LC 136",
        title: "Single Number",
        subPatternId: "bit-xor",
        url: "https://leetcode.com/problems/single-number/",
        diff: "easy",
        statement: "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.",
        bruteForce: {
          explanation: "Frequency map counting occurrences in O(N) space.",
          timeComp: "O(N)",
          spaceComp: "O(N)",
          cppCode: "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        unordered_map<int, int> count;\n        for (int x : nums) count[x]++;\n        for (auto& pair : count) if (pair.second == 1) return pair.first;\n        return 0;\n    }\n};"
        },
        optimal: {
          explanation: "Bitwise XOR across all elements. Cancel pairs in O(N) time and O(1) space.",
          timeComp: "O(N)",
          spaceComp: "O(1)",
          cppCode: "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int res = 0;\n        for (int x : nums) res ^= x;\n        return res;\n    }\n};"
        }
      }
    ]
  }
];
