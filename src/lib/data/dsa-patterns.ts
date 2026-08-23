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
        cues: [
          "Count occurrences of characters or numbers",
          "Compare string anagrams in O(N)",
          "Track top K or majority element frequencies"
        ],
        thinkAbout: "When checking structural equivalence between sequences, such as string anagrams, or tracking frequency distribution.",
        coreIdea: "Populate a frequency hash map or fixed array of size 26. Decrement counts for the second string or check for exact match.",
        templateCode: "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.length() != t.length()) return false;\n        int freq[26] = {0};\n        for (int i = 0; i < s.length(); i++) {\n            freq[s[i] - 'a']++;\n            freq[t[i] - 'a']--;\n        }\n        for (int count : freq) if (count != 0) return false;\n        return true;\n    }\n};",
        timeComplexity: "O(N) single pass over strings.",
        spaceComplexity: "O(1) auxiliary space using fixed 26-element array.",
        pitfalls: [
          "Not checking length equality at the very beginning.",
          "Assuming input string contains only lowercase ASCII when unicode can be present."
        ]
      },
      {
        id: "hash-lookup",
        name: "O(1) Pair & Complement Lookup",
        cues: [
          "Find two numbers adding up to target",
          "Check existence of complement X = Target - Y",
          "Single pass traversal with hash map"
        ],
        thinkAbout: "When looking for element pairs satisfying an algebraic relation without quadratic nested loops.",
        coreIdea: "Iterate through elements. Calculate required complement. Check if present in hash map; if found return indices, else insert current element.",
        templateCode: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (mp.count(complement)) return {mp[complement], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};",
        timeComplexity: "O(N) time complexity.",
        spaceComplexity: "O(N) for hash map.",
        pitfalls: [
          "Using the same element twice (e.g. checking map before inserting current element solves this)."
        ]
      }
    ],
    questions: [
      {
        lcNum: "LC 1",
        title: "Two Sum",
        subPatternId: "hash-lookup",
        url: "https://leetcode.com/problems/two-sum/",
        diff: "easy",
        statement: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.",
        bruteForce: {
          explanation: "Use nested loops to test all pairs (i, j). For each element at index i, search every index j > i to see if nums[i] + nums[j] == target.",
          timeComp: "O(N^2) - Checking all N*(N-1)/2 pairs in nested loops.",
          spaceComp: "O(1) - No extra data structures used.",
          cppCode: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        int n = nums.size();\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                if (nums[i] + nums[j] == target) return {i, j};\n            }\n        }\n        return {};\n    }\n};"
        },
        optimal: {
          explanation: "Maintain an unordered_map mapping array values to their indices. For each element x at index i, check if (target - x) exists in the map in O(1) time.",
          timeComp: "O(N) - Single pass over the array.",
          spaceComp: "O(N) - Storage for up to N elements in the map.",
          cppCode: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (mp.count(complement)) return {mp[complement], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};"
        }
      },
      {
        lcNum: "LC 217",
        title: "Contains Duplicate",
        subPatternId: "hash-frequency",
        url: "https://leetcode.com/problems/contains-duplicate/",
        diff: "easy",
        statement: "Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.",
        bruteForce: {
          explanation: "Sort the array first in O(N log N) time, then check adjacent elements for equality.",
          timeComp: "O(N log N) - Dominated by sorting.",
          spaceComp: "O(1) - In-place sort.",
          cppCode: "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        for (int i = 1; i < nums.size(); i++) {\n            if (nums[i] == nums[i-1]) return true;\n        }\n        return false;\n    }\n};"
        },
        optimal: {
          explanation: "Insert each element into an unordered_set. If an element already exists in the set, a duplicate is found in O(1) time.",
          timeComp: "O(N) - Single pass through the array.",
          spaceComp: "O(N) - Hash set stores unique elements.",
          cppCode: "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> seen;\n        for (int num : nums) {\n            if (seen.count(num)) return true;\n            seen.insert(num);\n        }\n        return false;\n    }\n};"
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
    coreIdea: "Halve the search space in each step by checking the middle element mid = low + (high - low) / 2. Discard half of the search space based on sorting invariant or feasibility test.",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n};",
    timeComplexity: "O(log N) standard search, or O(N log(Range)) for BS on answer.",
    spaceComplexity: "O(1) auxiliary space.",
    pitfalls: [
      "Integer overflow in C++/Java when computing (low + high) / 2 (use low + (high - low) / 2).",
      "Infinite loops caused by incorrect pointer updating (low = mid instead of low = mid + 1).",
      "Incorrect loop termination condition (low < high vs low <= high)."
    ],
    subPatterns: [
      {
        id: "bs-standard",
        name: "Standard & Boundary Search",
        cues: [
          "Sorted array or list",
          "Find target element or insertion boundary index",
          "O(log N) runtime requirement"
        ],
        thinkAbout: "When the input vector is strictly or non-strictly sorted, and you need to search for a target value or find lower/upper bounds in O(log N) time.",
        coreIdea: "Maintain two pointers low = 0 and high = N - 1. Calculate mid = low + (high - low) / 2. Compare nums[mid] with target to halve the search space at each iteration.",
        templateCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n};",
        timeComplexity: "O(log N) — Search space halves every step.",
        spaceComplexity: "O(1) auxiliary space.",
        pitfalls: [
          "Using (low + high) / 2 which causes 32-bit integer overflow.",
          "Incorrect termination condition (low < high vs low <= high)."
        ]
      },
      {
        id: "bs-rotated",
        name: "Rotated & Modified Array",
        cues: [
          "Array originally sorted, then rotated at unknown pivot",
          "Find minimum element or target in rotated array",
          "Identify sorted half at mid"
        ],
        thinkAbout: "When dealing with a rotated sorted array, notice that at any mid index, at least one half (left or right) is guaranteed to be strictly sorted.",
        coreIdea: "Compute mid. Compare nums[low] with nums[mid]. If nums[low] <= nums[mid], the left half is sorted; check if target falls in [low, mid). Otherwise the right half is sorted.",
        templateCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[low] <= nums[mid]) {\n                if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n                else low = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n                else high = mid - 1;\n            }\n        }\n        return -1;\n    }\n};",
        timeComplexity: "O(log N) for distinct elements.",
        spaceComplexity: "O(1) auxiliary space.",
        pitfalls: [
          "Failing to handle duplicate elements where nums[low] == nums[mid] == nums[high].",
          "Incorrect boundary condition when deciding if target lies within the sorted half."
        ]
      },
      {
        id: "bs-on-answer",
        name: "Binary Search on Answer",
        cues: [
          "Minimize the Maximum OR Maximize the Minimum",
          "Search space is a continuous/discrete range [Low, High]",
          "Monotonic predicate function check(mid) transitions False -> True"
        ],
        thinkAbout: "When the problem asks for an optimal minimum/maximum value over a bounded search space, and checking whether a candidate answer mid is valid can be done efficiently.",
        coreIdea: "Binary search over the candidate answer range [Low, High]. Test feasibility using a custom check(mid) predicate function. If check(mid) is true, store mid as answer and narrow range to find an even better value.",
        templateCode: "class Solution {\npublic:\n    bool check(int mid, vector<int>& piles, int h) {\n        long long hours = 0;\n        for (int p : piles) hours += (p + mid - 1) / mid;\n        return hours <= h;\n    }\n    int minEatingSpeed(vector<int>& piles, int h) {\n        int low = 1, high = *max_element(piles.begin(), piles.end());\n        int ans = high;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (check(mid, piles, h)) {\n                ans = mid;\n                high = mid - 1; // Try smaller valid speed\n            } else {\n                low = mid + 1;\n            }\n        }\n        return ans;\n    }\n};",
        timeComplexity: "O(N log(Range)) where N is check(mid) runtime and Range = max_val - min_val.",
        spaceComplexity: "O(1) auxiliary space.",
        pitfalls: [
          "Setting low = 0 instead of 1 when speed/capacity must be strictly positive.",
          "Integer overflow inside check(mid) when summing counts or hours (use long long)."
        ]
      }
    ],
    questions: [
      {
        lcNum: "LC 704",
        title: "Binary Search",
        subPatternId: "bs-standard",
        url: "https://leetcode.com/problems/binary-search/",
        diff: "easy",
        statement: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`.",
        bruteForce: {
          explanation: "Linear search: Scan array from index 0 to N-1 linearly until target is found.",
          timeComp: "O(N) - Linear pass.",
          spaceComp: "O(1) - Constant space.",
          cppCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        for (int i = 0; i < nums.size(); i++) {\n            if (nums[i] == target) return i;\n        }\n        return -1;\n    }\n};"
        },
        optimal: {
          explanation: "Standard Binary Search algorithm on sorted array. Compare target with nums[mid]. Halve search space each step.",
          timeComp: "O(log N) - Logarithmic time.",
          spaceComp: "O(1) - Constant space.",
          cppCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n};"
        }
      },
      {
        lcNum: "LC 33",
        title: "Search In Rotated Sorted Array",
        subPatternId: "bs-rotated",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        diff: "medium",
        statement: "Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.",
        bruteForce: {
          explanation: "Linear search through array to find target index ignoring the rotation property.",
          timeComp: "O(N) - Linear scan.",
          spaceComp: "O(1) - Constant space.",
          cppCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        for (int i = 0; i < nums.size(); i++) {\n            if (nums[i] == target) return i;\n        }\n        return -1;\n    }\n};"
        },
        optimal: {
          explanation: "In a rotated sorted array, one half (left or right of mid) is always strictly sorted. Determine which half is sorted and check if target lies within its bounds.",
          timeComp: "O(log N) - Rotated binary search.",
          spaceComp: "O(1) - Constant space.",
          cppCode: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[low] <= nums[mid]) {\n                if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n                else low = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n                else high = mid - 1;\n            }\n        }\n        return -1;\n    }\n};"
        }
      },
      {
        lcNum: "LC 875",
        title: "Koko Eating Bananas",
        subPatternId: "bs-on-answer",
        url: "https://leetcode.com/problems/koko-eating-bananas/",
        diff: "medium",
        statement: "Koko loves to eat bananas. Return the minimum integer `k` such that she can eat all the bananas within `h` hours.",
        bruteForce: {
          explanation: "Try all eating speeds k starting from 1 upwards until total hours required to finish all piles is <= h.",
          timeComp: "O(N * MaxPile) - Linear search on speed k.",
          spaceComp: "O(1) - Constant space.",
          cppCode: "class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        int k = 1;\n        while (true) {\n            long long hours = 0;\n            for (int p : piles) hours += (p + k - 1) / k;\n            if (hours <= h) return k;\n            k++;\n        }\n    }\n};"
        },
        optimal: {
          explanation: "Binary Search on Answer over speed range [1, max(piles)]. Feasibility check: calculate total hours needed at eating speed mid.",
          timeComp: "O(N log(MaxPile)) - BS on Answer range.",
          spaceComp: "O(1) - Constant space.",
          cppCode: "class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        int low = 1, high = *max_element(piles.begin(), piles.end());\n        int ans = high;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            long long hours = 0;\n            for (int p : piles) hours += (p + mid - 1) / mid;\n            if (hours <= h) { ans = mid; high = mid - 1; }\n            else low = mid + 1;\n        }\n        return ans;\n    }\n};"
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
    thinkAbout: "When needing to find the nearest element that is larger or smaller than the current element for every index in an array in linear time.",
    coreIdea: "Maintain a stack of array indices whose values are kept strictly increasing or decreasing. When a new element breaks monotonicity, pop elements from stack — this new element is their Next Greater / Next Smaller element!",
    templateLabel: "Modern C++ Template",
    templateCode: "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temp) {\n        int n = temp.size();\n        vector<int> res(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temp[st.top()] < temp[i]) {\n                int idx = st.top(); st.pop();\n                res[idx] = i - idx;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};",
    timeComplexity: "O(N) because each element is pushed and popped at most once.",
    spaceComplexity: "O(N) for stack storage.",
    pitfalls: [
      "Storing element values on stack instead of indices (indices allow calculating distance/widths).",
      "Forgetting to flush remaining items on stack after loop ends.",
      "Confusing strictly increasing (<) with non-decreasing (<=) condition."
    ],
    subPatterns: [
      {
        id: "ms-basic",
        name: "Basic Stack Matching",
        cues: [
          "LIFO (Last-In First-Out) matching property",
          "Nested symbol pairs check (parentheses, HTML tags)",
          "Expression evaluation and backtracking"
        ],
        thinkAbout: "When elements must be matched with their most recent unmatched counterparts in reverse order of arrival.",
        coreIdea: "Push opening elements onto stack. When encountering a closing element, verify it matches top of stack and pop. If stack is empty or top doesn't match, return invalid.",
        templateCode: "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if ((c == ')' && top != '(') ||\n                    (c == '}' && top != '{') ||\n                    (c == ']' && top != '[')) return false;\n            }\n        }\n        return st.empty();\n    }\n};",
        timeComplexity: "O(N) — Single pass processing each character once.",
        spaceComplexity: "O(N) for stack storage.",
        pitfalls: [
          "Forgetting to check if stack is empty before calling st.top() or st.pop()."
        ]
      },
      {
        id: "ms-next-greater",
        name: "Next Greater / Smaller Element",
        cues: [
          "Find nearest element strictly greater or smaller to the right or left",
          "O(N) linear time requirement over array",
          "Monotonically ordered stack of indices"
        ],
        thinkAbout: "When for every element at index i, you need the distance or index of the first element to its right (or left) that is larger or smaller.",
        coreIdea: "Maintain a stack storing array indices in strictly decreasing (or increasing) order of their values. When a new element breaks monotonicity, pop elements from stack — the current element is their Next Greater (or Smaller) element!",
        templateCode: "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temp) {\n        int n = temp.size();\n        vector<int> res(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temp[st.top()] < temp[i]) {\n                int idx = st.top(); st.pop();\n                res[idx] = i - idx;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};",
        timeComplexity: "O(N) — Each element index is pushed and popped at most once.",
        spaceComplexity: "O(N) for monotonic stack.",
        pitfalls: [
          "Pushing element values onto stack instead of element indices."
        ]
      }
    ],
    questions: [
      {
        lcNum: "LC 20",
        title: "Valid Parentheses",
        subPatternId: "ms-basic",
        url: "https://leetcode.com/problems/valid-parentheses/",
        diff: "easy",
        statement: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.",
        bruteForce: {
          explanation: "Repeatedly replace occurrences of matching pairs () [] {} in string until no replacements can be made.",
          timeComp: "O(N^2) - String search & replace.",
          spaceComp: "O(N) - String copy.",
          cppCode: "class Solution {\npublic:\n    bool isValid(string s) {\n        int len;\n        do {\n            len = s.length();\n            int pos;\n            if ((pos = s.find(\"()\")) != string::npos) s.erase(pos, 2);\n            else if ((pos = s.find(\"[]\")) != string::npos) s.erase(pos, 2);\n            else if ((pos = s.find(\"{}\")) != string::npos) s.erase(pos, 2);\n        } while (s.length() < len);\n        return s.empty();\n    }\n};"
        },
        optimal: {
          explanation: "Push opening brackets onto stack. When encountering closing bracket, verify it matches top of stack.",
          timeComp: "O(N) - Linear pass.",
          spaceComp: "O(N) - Stack size.",
          cppCode: "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if ((c == ')' && top != '(') ||\n                    (c == '}' && top != '{') ||\n                    (c == ']' && top != '[')) return false;\n            }\n        }\n        return st.empty();\n    }\n};"
        }
      },
      {
        lcNum: "LC 739",
        title: "Daily Temperatures",
        subPatternId: "ms-next-greater",
        url: "https://leetcode.com/problems/daily-temperatures/",
        diff: "medium",
        statement: "Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i-th` day to get a warmer temperature.",
        bruteForce: {
          explanation: "For each day i, iterate through days j > i to find the first day with temperatures[j] > temperatures[i].",
          timeComp: "O(N^2) - Double nested loop.",
          spaceComp: "O(1) - Constant auxiliary space.",
          cppCode: "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temp) {\n        int n = temp.size();\n        vector<int> res(n, 0);\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                if (temp[j] > temp[i]) {\n                    res[i] = j - i;\n                    break;\n                }\n            }\n        }\n        return res;\n    }\n};"
        },
        optimal: {
          explanation: "Monotonic stack storing indices. Pop elements when current temp is higher, calculating day difference in O(N).",
          timeComp: "O(N) - Monotonic stack pass.",
          spaceComp: "O(N) - Index stack.",
          cppCode: "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temp) {\n        int n = temp.size();\n        vector<int> res(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temp[st.top()] < temp[i]) {\n                int idx = st.top(); st.pop();\n                res[idx] = i - idx;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};"
        }
      }
    ]
  }
];
