import { Pattern } from '../models/dsa.types';

export const PATTERNS_DATA: Pattern[] = [
  {
    "id": "p_matrix_simulation_transformations",
    "slug": "matrix-simulation-array-transformations",
    "name": "Matrix Simulation & Array Transformations",
    "displayOrder": 1,
    "cues": [
      "Spiral matrix traversal / generation",
      "In-place 90 degree matrix rotation",
      "Set matrix zeroes with O(1) space",
      "Pascal's Triangle row generation",
      "Next Permutation pivot swap"
    ],
    "thinkAbout": "When working with 2D grid matrix boundaries, 90-degree spatial symmetry, or in-place state marking using 1st row/col as dummy storage.",
    "coreIdea": "Simulate matrix layer-by-layer using 4 shrinking boundary variables (top, bottom, left, right), or perform transpose + row/col reversal for spatial rotations.",
    "templateLabel": "C++ Matrix Traversal & Rotation Template",
    "templateCode": "// Spiral Traversal Template\nint top = 0, bottom = R - 1, left = 0, right = C - 1;\nwhile (top <= bottom && left <= right) {\n    for (int col = left; col <= right; col++) process(matrix[top][col]);\n    top++;\n    for (int row = top; row <= bottom; row++) process(matrix[row][right]);\n    right--;\n    if (top <= bottom) {\n        for (int col = right; col >= left; col--) process(matrix[bottom][col]);\n        bottom--;\n    }\n    if (left <= right) {\n        for (int row = bottom; row >= top; row--) process(matrix[row][left]);\n        left++;\n    }\n}",
    "timeComplexity": "O(R * C) matrix scan.",
    "spaceComplexity": "O(1) auxiliary space.",
    "pitfalls": [
      "Forgetting to check top <= bottom and left <= right conditions before inner leftward/upward loops in non-square matrices.",
      "Not transposing before row reversal in 90-degree matrix rotation."
    ],
    "subPatterns": [
      {
        "id": "sp_matrix_spiral",
        "slug": "matrix-spiral-traversal-generation",
        "patternSlug": "matrix-simulation-array-transformations",
        "patternId": "p_matrix_simulation_transformations",
        "name": "Matrix Spiral Traversal & Generation",
        "cues": [
          "Spiral matrix traversal",
          "Spiral grid generation"
        ],
        "thinkAbout": "When traversing 2D grid layers in clockwise order.",
        "coreIdea": "Maintain 4 boundary pointers. Shrink boundaries after completing each direction.",
        "templateCode": "// Spiral Matrix Generation Template"
      },
      {
        "id": "sp_matrix_rotation",
        "slug": "matrix-symmetry-rotations",
        "patternSlug": "matrix-simulation-array-transformations",
        "patternId": "p_matrix_simulation_transformations",
        "name": "Matrix Symmetry & In-Place Rotations",
        "cues": [
          "Rotate image 90 degrees",
          "In-place grid transpose"
        ],
        "thinkAbout": "When rotating NxN matrix by 90 degrees in-place without extra matrix memory.",
        "coreIdea": "Clockwise 90° = Transpose matrix (swap A[i][j] & A[j][i]) + reverse each row.",
        "templateCode": "// Transpose + Reverse Rows\nfor (int i = 0; i < n; i++)\n    for (int j = i + 1; j < n; j++) swap(matrix[i][j], matrix[j][i]);\nfor (int i = 0; i < n; i++) reverse(matrix[i].begin(), matrix[i].end());"
      },
      {
        "id": "sp_matrix_state_pattern",
        "slug": "matrix-state-marking-patterns",
        "patternSlug": "matrix-simulation-array-transformations",
        "patternId": "p_matrix_simulation_transformations",
        "name": "Matrix State Marking & Pattern Generation",
        "cues": [
          "Set matrix zeroes in O(1) space",
          "Pascal's triangle",
          "Next permutation"
        ],
        "thinkAbout": "When marking grid state using 1st row/col markers or generating next lexicographical permutation.",
        "coreIdea": "Use first row and column as flag indicators to avoid O(R*C) extra memory.",
        "templateCode": "// Matrix Zeroes Dummy Marker"
      }
    ],
    "questions": [
      {
        "id": "q_spiral_matrix",
        "slug": "spiral-matrix",
        "patternSlug": "matrix-simulation-array-transformations",
        "subPatternId": "sp_matrix_spiral",
        "subPatternSlug": "matrix-spiral-traversal-generation",
        "patternId": "p_matrix_simulation_transformations",
        "lcNum": "LC 54",
        "title": "Spiral Matrix",
        "url": "https://leetcode.com/problems/spiral-matrix/",
        "diff": "medium",
        "statement": "Given an `m x n` `matrix`, return all elements of the `matrix` in spiral order.",
        "bruteForce": {
          "explanation": "Maintain visited boolean matrix of size M x N and directional offsets in O(M * N) space.",
          "timeComp": "O(M * N)",
          "spaceComp": "O(M * N)",
          "cppCode": "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        vector<int> res;\n        if (matrix.empty()) return res;\n        int m = matrix.size(), n = matrix[0].size();\n        vector<vector<bool>> visited(m, vector<bool>(n, false));\n        int dr[] = {0, 1, 0, -1}, dc[] = {1, 0, -1, 0};\n        int r = 0, c = 0, di = 0;\n        for (int i = 0; i < m * n; i++) {\n            res.push_back(matrix[r][c]);\n            visited[r][c] = true;\n            int cr = r + dr[di], cc = c + dc[di];\n            if (cr >= 0 && cr < m && cc >= 0 && cc < n && !visited[cr][cc]) {\n                r = cr; c = cc;\n            } else {\n                di = (di + 1) % 4;\n                r += dr[di]; c += dc[di];\n            }\n        }\n        return res;\n    }\n};"
        },
        "optimal": {
          "explanation": "Maintain 4 boundary variables (top, bottom, left, right). Shrink boundaries after traversing each edge in O(1) space.",
          "timeComp": "O(M * N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        vector<int> res;\n        if (matrix.empty()) return res;\n        int top = 0, bottom = matrix.size() - 1;\n        int left = 0, right = matrix[0].size() - 1;\n\n        while (top <= bottom && left <= right) {\n            for (int col = left; col <= right; col++) res.push_back(matrix[top][col]);\n            top++;\n\n            for (int row = top; row <= bottom; row++) res.push_back(matrix[row][right]);\n            right--;\n\n            if (top <= bottom) {\n                for (int col = right; col >= left; col--) res.push_back(matrix[bottom][col]);\n                bottom--;\n            }\n\n            if (left <= right) {\n                for (int row = bottom; row >= top; row--) res.push_back(matrix[row][left]);\n                left++;\n            }\n        }\n        return res;\n    }\n};"
        }
      },
      {
        "id": "q_spiral_matrix_ii",
        "slug": "spiral-matrix-ii",
        "patternSlug": "matrix-simulation-array-transformations",
        "subPatternId": "sp_matrix_spiral",
        "subPatternSlug": "matrix-spiral-traversal-generation",
        "patternId": "p_matrix_simulation_transformations",
        "lcNum": "LC 59",
        "title": "Spiral Matrix II",
        "url": "https://leetcode.com/problems/spiral-matrix-ii/",
        "diff": "medium",
        "statement": "Given a positive integer `n`, generate an `n x n` `matrix` filled with elements from `1` to `n^2` in spiral order.",
        "bruteForce": {
          "explanation": "Simulate movement with direction vectors (dr, dc) filling values 1 to n^2.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<int>> generateMatrix(int n) {\n        vector<vector<int>> res(n, vector<int>(n, 0));\n        int val = 1, top = 0, bottom = n - 1, left = 0, right = n - 1;\n        while (val <= n * n) {\n            for (int col = left; col <= right; col++) res[top][col] = val++;\n            top++;\n            for (int row = top; row <= bottom; row++) res[row][right] = val++;\n            right--;\n            for (int col = right; col >= left; col--) res[bottom][col] = val++;\n            bottom--;\n            for (int row = bottom; row >= top; row--) res[row][left] = val++;\n            left++;\n        }\n        return res;\n    }\n};"
        },
        "optimal": {
          "explanation": "Use 4-boundary pointers (top, bottom, left, right) to populate cells sequentially from 1 to n^2.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<int>> generateMatrix(int n) {\n        vector<vector<int>> res(n, vector<int>(n, 0));\n        int val = 1;\n        int top = 0, bottom = n - 1, left = 0, right = n - 1;\n\n        while (top <= bottom && left <= right) {\n            for (int col = left; col <= right; col++) res[top][col] = val++;\n            top++;\n\n            for (int row = top; row <= bottom; row++) res[row][right] = val++;\n            right--;\n\n            if (top <= bottom) {\n                for (int col = right; col >= left; col--) res[bottom][col] = val++;\n                bottom--;\n            }\n\n            if (left <= right) {\n                for (int row = bottom; row >= top; row--) res[row][left] = val++;\n                left++;\n            }\n        }\n        return res;\n    }\n};"
        }
      },
      {
        "id": "q_rotate_image",
        "slug": "rotate-image",
        "patternSlug": "matrix-simulation-array-transformations",
        "subPatternId": "sp_matrix_rotation",
        "subPatternSlug": "matrix-symmetry-rotations",
        "patternId": "p_matrix_simulation_transformations",
        "lcNum": "LC 48",
        "title": "Rotate Image",
        "url": "https://leetcode.com/problems/rotate-image/",
        "diff": "medium",
        "statement": "You are given an `n x n` 2D `matrix` representing an image, rotate the image by 90 degrees (clockwise) in-place.",
        "bruteForce": {
          "explanation": "Copy matrix elements to a temporary N x N grid where `temp[j][n - 1 - i] = matrix[i][j]`, then copy back.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(N^2)",
          "cppCode": "class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        int n = matrix.size();\n        vector<vector<int>> temp = matrix;\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                matrix[j][n - 1 - i] = temp[i][j];\n            }\n        }\n    }\n};"
        },
        "optimal": {
          "explanation": "In-place Transpose (swap matrix[i][j] with matrix[j][i]) followed by reversing each row in O(1) space.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        int n = matrix.size();\n        // 1. Transpose Matrix\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                swap(matrix[i][j], matrix[j][i]);\n            }\n        }\n        // 2. Reverse Each Row\n        for (int i = 0; i < n; i++) {\n            reverse(matrix[i].begin(), matrix[i].end());\n        }\n    }\n};"
        }
      },
      {
        "id": "q_set_matrix_zeroes",
        "slug": "set-matrix-zeroes",
        "patternSlug": "matrix-simulation-array-transformations",
        "subPatternId": "sp_matrix_state_pattern",
        "subPatternSlug": "matrix-state-marking-patterns",
        "patternId": "p_matrix_simulation_transformations",
        "lcNum": "LC 73",
        "title": "Set Matrix Zeroes",
        "url": "https://leetcode.com/problems/set-matrix-zeroes/",
        "diff": "medium",
        "statement": "Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s in-place.",
        "bruteForce": {
          "explanation": "Use separate boolean arrays `row[M]` and `col[N]` to mark zero rows and columns in O(M + N) space.",
          "timeComp": "O(M * N)",
          "spaceComp": "O(M + N)",
          "cppCode": "class Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        int m = matrix.size(), n = matrix[0].size();\n        vector<bool> row(m, false), col(n, false);\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (matrix[i][j] == 0) { row[i] = true; col[j] = true; }\n            }\n        }\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (row[i] || col[j]) matrix[i][j] = 0;\n            }\n        }\n    }\n};"
        },
        "optimal": {
          "explanation": "Use 1st row & 1st col of matrix as dummy flag markers + two extra booleans for 1st row/col itself in O(1) space.",
          "timeComp": "O(M * N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        int m = matrix.size(), n = matrix[0].size();\n        bool firstRowZero = false, firstColZero = false;\n\n        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) firstColZero = true;\n        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) firstRowZero = true;\n\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                if (matrix[i][j] == 0) {\n                    matrix[i][0] = 0;\n                    matrix[0][j] = 0;\n                }\n            }\n        }\n\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                if (matrix[i][0] == 0 || matrix[0][j] == 0) {\n                    matrix[i][j] = 0;\n                }\n            }\n        }\n\n        if (firstColZero) for (int i = 0; i < m; i++) matrix[i][0] = 0;\n        if (firstRowZero) for (int j = 0; j < n; j++) matrix[0][j] = 0;\n    }\n};"
        }
      },
      {
        "id": "q_pascals_triangle",
        "slug": "pascals-triangle",
        "patternSlug": "matrix-simulation-array-transformations",
        "subPatternId": "sp_matrix_state_pattern",
        "subPatternSlug": "matrix-state-marking-patterns",
        "patternId": "p_matrix_simulation_transformations",
        "lcNum": "LC 118",
        "title": "Pascal's Triangle",
        "url": "https://leetcode.com/problems/pascals-triangle/",
        "diff": "easy",
        "statement": "Given an integer `numRows`, return the first `numRows` of Pascal's triangle.",
        "bruteForce": {
          "explanation": "Compute each cell using Combination formula C(n, k) = n! / (k! * (n-k)!) in O(N^3).",
          "timeComp": "O(N^3)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<int>> generate(int numRows) {\n        vector<vector<int>> res;\n        for (int i = 0; i < numRows; i++) {\n            vector<int> row(i + 1, 1);\n            for (int j = 1; j < i; j++) {\n                row[j] = res[i - 1][j - 1] + res[i - 1][j];\n            }\n            res.push_back(row);\n        }\n        return res;\n    }\n};"
        },
        "optimal": {
          "explanation": "Generate each row iteratively setting inner elements `row[j] = res[i-1][j-1] + res[i-1][j]` in O(N^2) time.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<int>> generate(int numRows) {\n        vector<vector<int>> res;\n        for (int i = 0; i < numRows; i++) {\n            vector<int> row(i + 1, 1);\n            for (int j = 1; j < i; j++) {\n                row[j] = res[i - 1][j - 1] + res[i - 1][j];\n            }\n            res.push_back(row);\n        }\n        return res;\n    }\n};"
        }
      },
      {
        "id": "q_next_permutation",
        "slug": "next-permutation",
        "patternSlug": "matrix-simulation-array-transformations",
        "subPatternId": "sp_matrix_state_pattern",
        "subPatternSlug": "matrix-state-marking-patterns",
        "patternId": "p_matrix_simulation_transformations",
        "lcNum": "LC 31",
        "title": "Next Permutation",
        "url": "https://leetcode.com/problems/next-permutation/",
        "diff": "medium",
        "statement": "Rearrange numbers into the lexicographically next greater permutation of numbers in-place.",
        "bruteForce": {
          "explanation": "Generate all permutations in O(N!), sort them, and find the successor.",
          "timeComp": "O(N! * N)",
          "spaceComp": "O(N!)",
          "cppCode": "// Generate all permutations recursively"
        },
        "optimal": {
          "explanation": "3 Steps: 1) Find largest index i where nums[i] < nums[i+1]. 2) Find index j > i where nums[j] > nums[i] and swap. 3) Reverse suffix from i+1.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    void nextPermutation(vector<int>& nums) {\n        int n = nums.size(), i = n - 2;\n        while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n\n        if (i >= 0) {\n            int j = n - 1;\n            while (nums[j] <= nums[i]) j--;\n            swap(nums[i], nums[j]);\n        }\n        reverse(nums.begin() + i + 1, nums.end());\n    }\n};"
        }
      }
    ]
  },
  {
    "id": "p_sorting_algorithms_comparators",
    "slug": "sorting-algorithms-custom-comparators",
    "name": "Complete Sorting Algorithms Suite",
    "displayOrder": 2,
    "cues": [
      "O(N^2) Selection, Bubble & Insertion Sorts",
      "O(N log N) Merge, Quick & Heap Sorts",
      "O(N) Counting, Radix & Bucket Sorts",
      "Custom String Comparators (Largest Number)",
      "Dutch National Flag 3-way Partition"
    ],
    "thinkAbout": "When understanding foundational sorting time/space trade-offs, custom comparator ordering, or in-place array partitioning.",
    "coreIdea": "Choose sorting strategy based on input constraints: O(N log N) comparison sorts for arbitrary elements, or O(N) linear non-comparison sorts for bounded integer ranges.",
    "templateLabel": "C++ Merge Sort & Quick Sort Templates",
    "templateCode": "// QuickSort Partition Template\nint partition(vector<int>& nums, int low, int high) {\n    int pivot = nums[high], i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (nums[j] <= pivot) { i++; swap(nums[i], nums[j]); }\n    }\n    swap(nums[i + 1], nums[high]);\n    return i + 1;\n}",
    "timeComplexity": "O(N log N) average for comparison sorts; O(N + K) for linear sorts.",
    "spaceComplexity": "O(1) in-place (Quick/Heap Sort) to O(N) (Merge/Counting Sort).",
    "pitfalls": [
      "QuickSort worst-case O(N^2) performance on already sorted inputs without randomized pivot selection.",
      "Custom comparator breaking strict weak ordering requirements."
    ],
    "subPatterns": [
      {
        "id": "sp_sort_elementary",
        "slug": "elementary-comparison-sorts",
        "patternSlug": "sorting-algorithms-custom-comparators",
        "patternId": "p_sorting_algorithms_comparators",
        "name": "Elementary Comparison Sorts (O(N^2))",
        "cues": [
          "Selection sort",
          "Bubble sort",
          "Insertion sort"
        ],
        "thinkAbout": "Foundational O(N^2) quadratic sorting mechanics.",
        "coreIdea": "Selection: swap min element. Bubble: swap adjacent inverted pairs. Insertion: shift elements right."
      },
      {
        "id": "sp_sort_divide_conquer",
        "slug": "divide-conquer-advanced-sorts",
        "patternSlug": "sorting-algorithms-custom-comparators",
        "patternId": "p_sorting_algorithms_comparators",
        "name": "Divide & Conquer & Advanced Sorts (O(N log N))",
        "cues": [
          "Merge sort",
          "Quick sort",
          "Heap sort",
          "Count inversions"
        ],
        "thinkAbout": "O(N log N) comparison sorts for general arrays.",
        "coreIdea": "Merge sort divides in halves and merges. Quick sort partitions around pivot. Heap sort uses Max-Heap."
      },
      {
        "id": "sp_sort_linear",
        "slug": "linear-non-comparison-sorts",
        "patternSlug": "sorting-algorithms-custom-comparators",
        "patternId": "p_sorting_algorithms_comparators",
        "name": "Linear Non-Comparison Sorts (O(N))",
        "cues": [
          "Counting sort",
          "Radix sort",
          "Bucket sort"
        ],
        "thinkAbout": "When array values lie in a bounded integer/float range.",
        "coreIdea": "Bypasses O(N log N) lower bound using frequency arrays or bucket distribution."
      },
      {
        "id": "sp_sort_specialized",
        "slug": "custom-comparators-string-sorting",
        "patternSlug": "sorting-algorithms-custom-comparators",
        "patternId": "p_sorting_algorithms_comparators",
        "name": "Custom Comparators & String Sorting",
        "cues": [
          "Largest Number",
          "Custom comparator sort"
        ],
        "thinkAbout": "When sorting elements by custom algebraic or string concatenation rules.",
        "coreIdea": "Define custom lambda `[](string& a, string& b) { return a + b > b + a; }`."
      }
    ],
    "questions": [
      {
        "id": "q_selection_sort",
        "slug": "selection-sort",
        "patternSlug": "sorting-algorithms-custom-comparators",
        "subPatternId": "sp_sort_elementary",
        "subPatternSlug": "elementary-comparison-sorts",
        "patternId": "p_sorting_algorithms_comparators",
        "lcNum": "ALG 1",
        "title": "Selection Sort Algorithm Blueprint",
        "url": "https://leetcode.com/problems/sort-an-array/",
        "diff": "easy",
        "statement": "Implement Selection Sort: repeatedly find the minimum element from the unsorted region and swap it with the first unsorted element.",
        "bruteForce": {
          "explanation": "Selection sort performs O(N^2) comparisons and O(N) swaps regardless of initial order.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> selectionSort(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 0; i < n - 1; i++) {\n            int minIdx = i;\n            for (int j = i + 1; j < n; j++) {\n                if (nums[j] < nums[minIdx]) minIdx = j;\n            }\n            swap(nums[i], nums[minIdx]);\n        }\n        return nums;\n    }\n};"
        },
        "optimal": {
          "explanation": "Selection sort in-place implementation maintaining unsorted boundary.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> selectionSort(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 0; i < n - 1; i++) {\n            int minIdx = i;\n            for (int j = i + 1; j < n; j++) {\n                if (nums[j] < nums[minIdx]) minIdx = j;\n            }\n            swap(nums[i], nums[minIdx]);\n        }\n        return nums;\n    }\n};"
        }
      },
      {
        "id": "q_bubble_sort",
        "slug": "bubble-sort",
        "patternSlug": "sorting-algorithms-custom-comparators",
        "subPatternId": "sp_sort_elementary",
        "subPatternSlug": "elementary-comparison-sorts",
        "patternId": "p_sorting_algorithms_comparators",
        "lcNum": "ALG 2",
        "title": "Bubble Sort Algorithm Blueprint",
        "url": "https://leetcode.com/problems/sort-an-array/",
        "diff": "easy",
        "statement": "Implement Bubble Sort: repeatedly swap adjacent elements if they are in wrong order. Optimize with an early-exit swapped flag.",
        "bruteForce": {
          "explanation": "Standard double nested loop Bubble sort in O(N^2) time.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> bubbleSort(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 0; i < n - 1; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (nums[j] > nums[j + 1]) swap(nums[j], nums[j + 1]);\n            }\n        }\n        return nums;\n    }\n};"
        },
        "optimal": {
          "explanation": "Bubble sort with early exit flag optimization (`swapped = false`). Best case O(N) when array is already sorted.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> bubbleSort(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 0; i < n - 1; i++) {\n            bool swapped = false;\n            for (int j = 0; j < n - i - 1; j++) {\n                if (nums[j] > nums[j + 1]) {\n                    swap(nums[j], nums[j + 1]);\n                    swapped = true;\n                }\n            }\n            if (!swapped) break;\n        }\n        return nums;\n    }\n};"
        }
      },
      {
        "id": "q_insertion_sort",
        "slug": "insertion-sort",
        "patternSlug": "sorting-algorithms-custom-comparators",
        "subPatternId": "sp_sort_elementary",
        "subPatternSlug": "elementary-comparison-sorts",
        "patternId": "p_sorting_algorithms_comparators",
        "lcNum": "ALG 3",
        "title": "Insertion Sort Algorithm Blueprint",
        "url": "https://leetcode.com/problems/sort-an-array/",
        "diff": "easy",
        "statement": "Implement Insertion Sort: build the sorted array one item at a time by shifting elements larger than key rightward.",
        "bruteForce": {
          "explanation": "Insertion sort shifts larger elements right to insert key into sorted prefix.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> insertionSort(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 1; i < n; i++) {\n            int key = nums[i];\n            int j = i - 1;\n            while (j >= 0 && nums[j] > key) {\n                nums[j + 1] = nums[j];\n                j--;\n            }\n            nums[j + 1] = key;\n        }\n        return nums;\n    }\n};"
        },
        "optimal": {
          "explanation": "In-place Insertion sort algorithm. Efficient for small or nearly-sorted datasets (O(N) best case).",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> insertionSort(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 1; i < n; i++) {\n            int key = nums[i];\n            int j = i - 1;\n            while (j >= 0 && nums[j] > key) {\n                nums[j + 1] = nums[j];\n                j--;\n            }\n            nums[j + 1] = key;\n        }\n        return nums;\n    }\n};"
        }
      },
      {
        "id": "q_merge_sort_inversions",
        "slug": "merge-sort-inversions",
        "patternSlug": "sorting-algorithms-custom-comparators",
        "subPatternId": "sp_sort_divide_conquer",
        "subPatternSlug": "divide-conquer-advanced-sorts",
        "patternId": "p_sorting_algorithms_comparators",
        "lcNum": "ALG 4",
        "title": "Merge Sort & Inversion Counting Blueprint",
        "url": "https://leetcode.com/problems/sort-an-array/",
        "diff": "medium",
        "statement": "Implement Merge Sort: divide array into two halves, recursively sort each half, and merge them in O(N log N) time.",
        "bruteForce": {
          "explanation": "Naive merge sort copying subarrays during merge phase in O(N log N) time and O(N) space.",
          "timeComp": "O(N log N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\n    void merge(vector<int>& nums, int l, int m, int r) {\n        vector<int> left(nums.begin() + l, nums.begin() + m + 1);\n        vector<int> right(nums.begin() + m + 1, nums.begin() + r + 1);\n        int i = 0, j = 0, k = l;\n        while (i < left.size() && j < right.size()) {\n            if (left[i] <= right[j]) nums[k++] = left[i++];\n            else nums[k++] = right[j++];\n        }\n        while (i < left.size()) nums[k++] = left[i++];\n        while (j < right.size()) nums[k++] = right[j++];\n    }\n    void mergeSort(vector<int>& nums, int l, int r) {\n        if (l >= r) return;\n        int m = l + (r - l) / 2;\n        mergeSort(nums, l, m);\n        mergeSort(nums, m + 1, r);\n        merge(nums, l, m, r);\n    }\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        mergeSort(nums, 0, nums.size() - 1);\n        return nums;\n    }\n};"
        },
        "optimal": {
          "explanation": "Merge sort using reusable temp buffer to minimize allocations. Also counts inversion pairs (left[i] > right[j]).",
          "timeComp": "O(N log N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\n    void merge(vector<int>& nums, int l, int m, int r, vector<int>& temp) {\n        int i = l, j = m + 1, k = l;\n        while (i <= m && j <= r) {\n            if (nums[i] <= nums[j]) temp[k++] = nums[i++];\n            else temp[k++] = nums[j++];\n        }\n        while (i <= m) temp[k++] = nums[i++];\n        while (j <= r) temp[k++] = nums[j++];\n        for (i = l; i <= r; i++) nums[i] = temp[i];\n    }\n    void mergeSort(vector<int>& nums, int l, int r, vector<int>& temp) {\n        if (l >= r) return;\n        int m = l + (r - l) / 2;\n        mergeSort(nums, l, m, temp);\n        mergeSort(nums, m + 1, r, temp);\n        merge(nums, l, m, r, temp);\n    }\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        vector<int> temp(nums.size());\n        mergeSort(nums, 0, nums.size() - 1, temp);\n        return nums;\n    }\n};"
        }
      },
      {
        "id": "q_quick_sort",
        "slug": "quick-sort",
        "patternSlug": "sorting-algorithms-custom-comparators",
        "subPatternId": "sp_sort_divide_conquer",
        "subPatternSlug": "divide-conquer-advanced-sorts",
        "patternId": "p_sorting_algorithms_comparators",
        "lcNum": "ALG 5",
        "title": "Quick Sort Algorithm Blueprint",
        "url": "https://leetcode.com/problems/sort-an-array/",
        "diff": "medium",
        "statement": "Implement Quick Sort using Lomuto partitioning with randomized pivot selection.",
        "bruteForce": {
          "explanation": "Standard QuickSort without randomized pivot (vulnerable to O(N^2) on sorted input).",
          "timeComp": "O(N log N) avg, O(N^2) worst",
          "spaceComp": "O(log N) stack",
          "cppCode": "class Solution {\n    int partition(vector<int>& nums, int low, int high) {\n        int pivot = nums[high], i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (nums[j] <= pivot) swap(nums[++i], nums[j]);\n        }\n        swap(nums[i + 1], nums[high]);\n        return i + 1;\n    }\n    void quickSort(vector<int>& nums, int low, int high) {\n        if (low < high) {\n            int p = partition(nums, low, high);\n            quickSort(nums, low, p - 1);\n            quickSort(nums, p + 1, high);\n        }\n    }\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        quickSort(nums, 0, nums.size() - 1);\n        return nums;\n    }\n};"
        },
        "optimal": {
          "explanation": "Randomized QuickSort swapping random pivot to high, guaranteeing O(N log N) expected time.",
          "timeComp": "O(N log N) expected",
          "spaceComp": "O(log N) stack",
          "cppCode": "class Solution {\n    int partition(vector<int>& nums, int low, int high) {\n        int randIdx = low + rand() % (high - low + 1);\n        swap(nums[randIdx], nums[high]);\n        int pivot = nums[high], i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (nums[j] <= pivot) swap(nums[++i], nums[j]);\n        }\n        swap(nums[i + 1], nums[high]);\n        return i + 1;\n    }\n    void quickSort(vector<int>& nums, int low, int high) {\n        if (low < high) {\n            int p = partition(nums, low, high);\n            quickSort(nums, low, p - 1);\n            quickSort(nums, p + 1, high);\n        }\n    }\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        quickSort(nums, 0, nums.size() - 1);\n        return nums;\n    }\n};"
        }
      },
      {
        "id": "q_counting_sort",
        "slug": "counting-sort",
        "patternSlug": "sorting-algorithms-custom-comparators",
        "subPatternId": "sp_sort_linear",
        "subPatternSlug": "linear-non-comparison-sorts",
        "patternId": "p_sorting_algorithms_comparators",
        "lcNum": "ALG 6",
        "title": "Counting Sort Algorithm Blueprint",
        "url": "https://leetcode.com/problems/sort-an-array/",
        "diff": "easy",
        "statement": "Implement Counting Sort: sort array of integers in bounded range [minVal, maxVal] in linear O(N + K) time.",
        "bruteForce": {
          "explanation": "Use hash map frequency count in O(N + K) time.",
          "timeComp": "O(N + K)",
          "spaceComp": "O(K)",
          "cppCode": "class Solution {\npublic:\n    vector<int> countingSort(vector<int>& nums) {\n        if (nums.empty()) return nums;\n        int minVal = *min_element(nums.begin(), nums.end());\n        int maxVal = *max_element(nums.begin(), nums.end());\n        int range = maxVal - minVal + 1;\n\n        vector<int> count(range, 0);\n        for (int x : nums) count[x - minVal]++;\n\n        int idx = 0;\n        for (int i = 0; i < range; i++) {\n            while (count[i]-- > 0) nums[idx++] = i + minVal;\n        }\n        return nums;\n    }\n};"
        },
        "optimal": {
          "explanation": "Counting sort maintaining stable prefix sum count array in O(N + K) time.",
          "timeComp": "O(N + K)",
          "spaceComp": "O(K)",
          "cppCode": "class Solution {\npublic:\n    vector<int> countingSort(vector<int>& nums) {\n        if (nums.empty()) return nums;\n        int minVal = *min_element(nums.begin(), nums.end());\n        int maxVal = *max_element(nums.begin(), nums.end());\n        int range = maxVal - minVal + 1;\n\n        vector<int> count(range, 0);\n        for (int x : nums) count[x - minVal]++;\n\n        int idx = 0;\n        for (int i = 0; i < range; i++) {\n            while (count[i]-- > 0) nums[idx++] = i + minVal;\n        }\n        return nums;\n    }\n};"
        }
      },
      {
        "id": "q_largest_number",
        "slug": "largest-number",
        "patternSlug": "sorting-algorithms-custom-comparators",
        "subPatternId": "sp_sort_specialized",
        "subPatternSlug": "custom-comparators-string-sorting",
        "patternId": "p_sorting_algorithms_comparators",
        "lcNum": "LC 179",
        "title": "Largest Number",
        "url": "https://leetcode.com/problems/largest-number/",
        "diff": "medium",
        "statement": "Given a list of non-negative integers `nums`, arrange them such that they form the largest number and return it as a string.",
        "bruteForce": {
          "explanation": "Try all permutations of numbers in O(N! * N) and take the lexicographically max string.",
          "timeComp": "O(N! * N)",
          "spaceComp": "O(N!)",
          "cppCode": "// Permutation brute force"
        },
        "optimal": {
          "explanation": "Convert numbers to strings and sort using custom comparator: `[](const string& a, const string& b) { return a + b > b + a; }`.",
          "timeComp": "O(N log N * K)",
          "spaceComp": "O(N * K)",
          "cppCode": "class Solution {\npublic:\n    string largestNumber(vector<int>& nums) {\n        vector<string> strs;\n        for (int x : nums) strs.push_back(to_string(x));\n\n        sort(strs.begin(), strs.end(), [](const string& a, const string& b) {\n            return a + b > b + a;\n        });\n\n        if (strs[0] == \"0\") return \"0\";\n\n        string res = \"\";\n        for (const string& s : strs) res += s;\n        return res;\n    }\n};"
        }
      }
    ]
  },
  {
    "id": "p_hashing_frequency_counting",
    "name": "Hashing / Frequency Counting",
    "cues": [
      "Duplicates detection",
      "Frequency counting",
      "O(1) Existence checking",
      "Pair lookup (X + Y = Target)",
      "Subarray frequency tracking",
      "Unordered matching / Anagrams"
    ],
    "thinkAbout": "When the problem asks to match elements, count occurrences, find pairs adding up to a target, or check if elements have been seen previously without spending O(N) search time per element.",
    "coreIdea": "Trade extra O(N) space for instant O(1) lookup time. Store elements or their frequencies in an std::unordered_map or std::unordered_set as you iterate through the vector once.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (seen.count(complement)) return {seen[complement], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};",
    "timeComplexity": "O(N) average time for single pass lookup.",
    "spaceComplexity": "O(N) auxiliary space for unordered_map.",
    "pitfalls": [
      "Modifying map keys while iterating over the map.",
      "Forgetting hash lookup can degrade to O(N) worst-case under severe hash collisions.",
      "Not handling duplicate values properly when storing indices as keys."
    ],
    "subPatterns": [
      {
        "id": "sp_hash_frequency",
        "name": "Frequency Counting & Anagrams",
        "cues": [
          "Count occurrences",
          "String anagrams in O(N)",
          "Majority element frequency"
        ],
        "thinkAbout": "When checking structural equivalence between sequences, such as string anagrams, or tracking frequency distribution.",
        "coreIdea": "Populate a frequency hash map or fixed array of size 26. Decrement counts for the second string or check for exact match.",
        "templateCode": "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.length() != t.length()) return false;\n        int freq[26] = {0};\n        for (int i = 0; i < s.length(); i++) {\n            freq[s[i] - 'a']++;\n            freq[t[i] - 'a']--;\n        }\n        for (int count : freq) if (count != 0) return false;\n        return true;\n    }\n};",
        "timeComplexity": "O(N) single pass over strings.",
        "spaceComplexity": "O(1) auxiliary space using fixed 26-element array.",
        "pitfalls": [
          "Not checking length equality at start.",
          "Assuming ASCII lowercase only."
        ],
        "slug": "frequency-counting-anagrams",
        "patternSlug": "hashing-frequency-counting",
        "patternId": "p_hashing_frequency_counting"
      },
      {
        "id": "sp_hash_lookup",
        "name": "O(1) Pair & Complement Lookup",
        "cues": [
          "Find two numbers adding up to target",
          "Check complement X = Target - Y",
          "Single pass traversal"
        ],
        "thinkAbout": "When looking for element pairs satisfying an algebraic relation without quadratic nested loops.",
        "coreIdea": "Iterate through elements. Calculate required complement. Check if present in hash map; if found return indices, else insert current element.",
        "templateCode": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (mp.count(complement)) return {mp[complement], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};",
        "timeComplexity": "O(N) time complexity.",
        "spaceComplexity": "O(N) for hash map.",
        "pitfalls": [
          "Using the same element index twice."
        ],
        "slug": "o-1-pair-complement-lookup",
        "patternSlug": "hashing-frequency-counting",
        "patternId": "p_hashing_frequency_counting"
      },
      {
        "id": "sp_hash_xor",
        "slug": "prefix-xor-bitwise-hashing",
        "patternSlug": "hashing-frequency-counting",
        "patternId": "p_hashing_frequency_counting",
        "name": "Prefix XOR & Bitwise Hashing",
        "cues": [
          "Subarray with given XOR",
          "Bitwise XOR sum"
        ],
        "thinkAbout": "When calculating subarray XOR sum equal to K. Note: xr(L..R) = xr(0..R) ^ xr(0..L-1) = K implies xr(0..L-1) = xr(0..R) ^ K.",
        "coreIdea": "Maintain running XOR sum `xr`. Lookup count of `xr ^ target` in hash map.",
        "templateCode": "unordered_map<int, int> mp;\nmp[0] = 1;\nint xr = 0, count = 0;\nfor (int x : nums) {\n    xr ^= x;\n    if (mp.count(xr ^ k)) count += mp[xr ^ k];\n    mp[xr]++;\n}"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 1",
        "title": "Two Sum",
        "subPatternId": "sp_hash_lookup",
        "url": "https://leetcode.com/problems/two-sum/",
        "diff": "easy",
        "statement": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
        "bruteForce": {
          "explanation": "Use nested loops to test all pairs (i, j) in O(N^2).",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        for (int i = 0; i < nums.size(); i++) {\n            for (int j = i + 1; j < nums.size(); j++) {\n                if (nums[i] + nums[j] == target) return {i, j};\n            }\n        }\n        return {};\n    }\n};"
        },
        "optimal": {
          "explanation": "Maintain an unordered_map mapping array values to their indices. For each element x at index i, check if (target - x) exists in O(1).",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (mp.count(complement)) return {mp[complement], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};"
        },
        "id": "q_two_sum",
        "slug": "two-sum",
        "patternSlug": "hashing-frequency-counting",
        "subPatternSlug": "o-1-pair-complement-lookup",
        "patternId": "p_hashing_frequency_counting"
      },
      {
        "lcNum": "LC 217",
        "title": "Contains Duplicate",
        "subPatternId": "sp_hash_frequency",
        "url": "https://leetcode.com/problems/contains-duplicate/",
        "diff": "easy",
        "statement": "Given an integer array `nums`, return `true` if any value appears at least twice in the array.",
        "bruteForce": {
          "explanation": "Sort array first in O(N log N) time, then check adjacent elements.",
          "timeComp": "O(N log N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        for (int i = 1; i < nums.size(); i++) if (nums[i] == nums[i-1]) return true;\n        return false;\n    }\n};"
        },
        "optimal": {
          "explanation": "Insert each element into an unordered_set. If already present, duplicate is found in O(1).",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> seen;\n        for (int num : nums) {\n            if (seen.count(num)) return true;\n            seen.insert(num);\n        }\n        return false;\n    }\n};"
        },
        "id": "q_contains_duplicate",
        "slug": "contains-duplicate",
        "patternSlug": "hashing-frequency-counting",
        "subPatternSlug": "frequency-counting-anagrams",
        "patternId": "p_hashing_frequency_counting"
      },
      {
        "id": "q_group_anagrams",
        "lcNum": "LC 49",
        "title": "Group Anagrams",
        "slug": "group-anagrams",
        "diff": "medium",
        "url": "https://leetcode.com/problems/group-anagrams/",
        "patternId": "p_hashing_frequency_counting",
        "patternSlug": "hashing-frequency-counting",
        "subPatternId": "sp_hash_frequency",
        "subPatternSlug": "frequency-counting-anagrams",
        "statement": "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
        "bruteForce": {
          "explanation": "For each string, sort its characters to form a canonical key in O(K log K) time, then store in hash map.",
          "timeComp": "O(N * K log K)",
          "spaceComp": "O(N * K)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        unordered_map<string, vector<string>> mp;\n        for (string s : strs) {\n            string key = s;\n            sort(key.begin(), key.end());\n            mp[key].push_back(s);\n        }\n        vector<vector<string>> ans;\n        for (auto& p : mp) ans.push_back(p.second);\n        return ans;\n    }\n};"
        },
        "optimal": {
          "explanation": "Encode character frequencies into a 26-char string or array key in O(K) time per string instead of sorting.",
          "timeComp": "O(N * K)",
          "spaceComp": "O(N * K)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        unordered_map<string, vector<string>> mp;\n        for (const string& s : strs) {\n            int count[26] = {0};\n            for (char c : s) count[c - 'a']++;\n            string key = \"\";\n            for (int i = 0; i < 26; i++) {\n                key += \"#\" + to_string(count[i]);\n            }\n            mp[key].push_back(s);\n        }\n        vector<vector<string>> ans;\n        for (auto& p : mp) ans.push_back(p.second);\n        return ans;\n    }\n};"
        }
      },
      {
        "id": "q_longest_consecutive_sequence",
        "lcNum": "LC 128",
        "title": "Longest Consecutive Sequence",
        "slug": "longest-consecutive-sequence",
        "diff": "medium",
        "url": "https://leetcode.com/problems/longest-consecutive-sequence/",
        "patternId": "p_hashing_frequency_counting",
        "patternSlug": "hashing-frequency-counting",
        "subPatternId": "sp_hash_lookup",
        "subPatternSlug": "o-1-pair-complement-lookup",
        "statement": "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence in O(N) time.",
        "bruteForce": {
          "explanation": "Sort array first in O(N log N), then iterate to find longest consecutive duplicate-filtered sequence.",
          "timeComp": "O(N log N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        if (nums.empty()) return 0;\n        sort(nums.begin(), nums.end());\n        int longest = 1, current = 1;\n        for (int i = 1; i < nums.size(); i++) {\n            if (nums[i] != nums[i-1]) {\n                if (nums[i] == nums[i-1] + 1) current++;\n                else { longest = max(longest, current); current = 1; }\n            }\n        }\n        return max(longest, current);\n    }\n};"
        },
        "optimal": {
          "explanation": "Insert all numbers into unordered_set. Only start counting sequence if `(num - 1)` does not exist in set (ensuring sequence start).",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        unordered_set<int> numSet(nums.begin(), nums.end());\n        int longest = 0;\n\n        for (int num : numSet) {\n            // Check if num is start of sequence\n            if (!numSet.count(num - 1)) {\n                int currentNum = num;\n                int currentStreak = 1;\n                while (numSet.count(currentNum + 1)) {\n                    currentNum++;\n                    currentStreak++;\n                }\n                longest = max(longest, currentStreak);\n            }\n        }\n        return longest;\n    }\n};"
        }
      },
      {
        "id": "q_subarray_with_given_xor",
        "slug": "subarray-with-given-xor",
        "patternSlug": "hashing-frequency-counting",
        "subPatternId": "sp_hash_xor",
        "subPatternSlug": "prefix-xor-bitwise-hashing",
        "patternId": "p_hashing_frequency_counting",
        "lcNum": "IB 1",
        "title": "Subarray with Given XOR",
        "url": "https://www.interviewbit.com/problems/subarray-with-given-xor/",
        "diff": "medium",
        "statement": "Given an array of integers `A` and an integer `B`, find the total number of subarrays having bitwise XOR equal to `B`.",
        "bruteForce": {
          "explanation": "Check all subarray pairs (i, j) calculating bitwise XOR in O(N^2).",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int solve(vector<int>& A, int B) {\n        int count = 0;\n        for (int i = 0; i < A.size(); i++) {\n            int xr = 0;\n            for (int j = i; j < A.size(); j++) {\n                xr ^= A[j];\n                if (xr == B) count++;\n            }\n        }\n        return count;\n    }\n};"
        },
        "optimal": {
          "explanation": "Maintain running XOR sum `xr`. Count previous occurrences of `(xr ^ B)` in hash map in O(N) time.",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    int solve(vector<int>& A, int B) {\n        unordered_map<int, int> mp;\n        mp[0] = 1;\n        int xr = 0, count = 0;\n        for (int x : A) {\n            xr ^= x;\n            if (mp.count(xr ^ B)) count += mp[xr ^ B];\n            mp[xr]++;\n        }\n        return count;\n    }\n};"
        }
      }
    ],
    "slug": "hashing-frequency-counting",
    "displayOrder": 3
  },
  {
    "id": "p_prefix_sum_difference_arrays",
    "name": "Prefix Sum & Difference Arrays",
    "cues": [
      "Range sum queries [L, R]",
      "Subarray sum equals K",
      "Cumulative sums",
      "Range updates / Add val to [L, R]"
    ],
    "thinkAbout": "When performing multiple range sum queries or finding continuous subarrays with a specific target sum.",
    "coreIdea": "Precalculate prefix sums P[i] = P[i-1] + nums[i]. Sum of subarray [L, R] is simply P[R] - P[L-1] in O(1) time.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class PrefixSum {\n    vector<int> pref;\npublic:\n    PrefixSum(vector<int>& nums) {\n        pref.resize(nums.size() + 1, 0);\n        for (int i = 0; i < nums.size(); i++) pref[i+1] = pref[i] + nums[i];\n    }\n    int query(int L, int R) {\n        return pref[R+1] - pref[L];\n    }\n};",
    "timeComplexity": "O(N) build, O(1) per query.",
    "spaceComplexity": "O(N) for prefix array.",
    "pitfalls": [
      "Off-by-one errors when computing 1-indexed prefix bounds."
    ],
    "subPatterns": [
      {
        "id": "sp_prefix_basic",
        "name": "Standard Prefix Sum & Subarray Sum K",
        "cues": [
          "Subarray sum equals K",
          "Range sum queries",
          "Prefix sum with hash map"
        ],
        "thinkAbout": "When calculating subarray sums equal to K, note that Sum(L..R) = Pref[R] - Pref[L-1] = K implies Pref[L-1] = Pref[R] - K.",
        "coreIdea": "Maintain current running sum and count occurrences of (current_sum - K) in a hash map.",
        "templateCode": "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        unordered_map<int, int> prefCount;\n        prefCount[0] = 1;\n        int sum = 0, count = 0;\n        for (int x : nums) {\n            sum += x;\n            if (prefCount.count(sum - k)) count += prefCount[sum - k];\n            prefCount[sum]++;\n        }\n        return count;\n    }\n};",
        "timeComplexity": "O(N) single pass.",
        "spaceComplexity": "O(N) for prefix map.",
        "pitfalls": [
          "Forgetting to initialize prefCount[0] = 1."
        ],
        "slug": "standard-prefix-sum-subarray-sum-k",
        "patternSlug": "prefix-sum-difference-arrays",
        "patternId": "p_prefix_sum_difference_arrays"
      },
      {
        "id": "sp_prefix_diff",
        "name": "Difference Array & Range Updates",
        "slug": "difference-array-range-updates",
        "patternSlug": "prefix-sum-difference-arrays",
        "patternId": "p_prefix_sum_difference_arrays",
        "cues": [
          "Multiple range updates +val to [L, R]",
          "Final array state query"
        ],
        "thinkAbout": "When given multiple interval update operations [L, R, val] and asked for final array values in O(N + Q) time.",
        "coreIdea": "Add +val at index L and -val at index R+1. Compute prefix sum at the end.",
        "templateCode": "// Difference Array Template\nvector<int> diff(N + 1, 0);\nfor (auto& op : operations) {\n    diff[L] += val;\n    diff[R + 1] -= val;\n}\nfor (int i = 1; i < N; i++) diff[i] += diff[i-1];"
      },
      {
        "id": "sp_prefix_product",
        "slug": "prefix-suffix-products",
        "patternSlug": "prefix-sum-difference-arrays",
        "patternId": "p_prefix_sum_difference_arrays",
        "name": "Prefix & Suffix Products",
        "cues": [
          "Product of array except self",
          "No division operator allowed"
        ],
        "thinkAbout": "When calculating array products excluding current element without using division operator.",
        "coreIdea": "Build prefix products from left to right, then multiply by running suffix product from right to left.",
        "templateCode": "// Prefix Suffix Product Template"
      },
      {
        "id": "sp_prefix_modulo",
        "slug": "prefix-sum-modulo-arithmetic",
        "patternSlug": "prefix-sum-difference-arrays",
        "patternId": "p_prefix_sum_difference_arrays",
        "name": "Prefix Sum with Modulo Arithmetic",
        "cues": [
          "Subarray sum divisible by K",
          "Continuous subarray sum"
        ],
        "thinkAbout": "When checking if subarray sum is divisible by K. Note: (Pref[R] - Pref[L-1]) % K == 0 implies Pref[R] % K == Pref[L-1] % K.",
        "coreIdea": "Store earliest index of `running_sum % K` in map. Check if index difference >= 2.",
        "templateCode": "// Modulo Prefix Template"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 560",
        "title": "Subarray Sum Equals K",
        "subPatternId": "sp_prefix_basic",
        "url": "https://leetcode.com/problems/subarray-sum-equals-k/",
        "diff": "medium",
        "statement": "Given an array of integers `nums` and an integer `k`, return total number of subarrays whose sum equals `k`.",
        "bruteForce": {
          "explanation": "Compute sum for all possible subarrays (i, j) in O(N^2).",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        int count = 0;\n        for (int i = 0; i < nums.size(); i++) {\n            int sum = 0;\n            for (int j = i; j < nums.size(); j++) {\n                sum += nums[j];\n                if (sum == k) count++;\n            }\n        }\n        return count;\n    }\n};"
        },
        "optimal": {
          "explanation": "Use Prefix Sum + Hash Map. Track running sum. Count previous occurrences of (running_sum - k).",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        unordered_map<int, int> mp;\n        mp[0] = 1;\n        int sum = 0, count = 0;\n        for (int x : nums) {\n            sum += x;\n            if (mp.count(sum - k)) count += mp[sum - k];\n            mp[sum]++;\n        }\n        return count;\n    }\n};"
        },
        "id": "q_subarray_sum_equals_k",
        "slug": "subarray-sum-equals-k",
        "patternSlug": "prefix-sum-difference-arrays",
        "subPatternSlug": "standard-prefix-sum-subarray-sum-k",
        "patternId": "p_prefix_sum_difference_arrays"
      },
      {
        "id": "q_contiguous_array",
        "lcNum": "LC 525",
        "title": "Contiguous Array",
        "slug": "contiguous-array",
        "diff": "medium",
        "url": "https://leetcode.com/problems/contiguous-array/",
        "patternId": "p_prefix_sum_difference_arrays",
        "patternSlug": "prefix-sum-difference-arrays",
        "subPatternId": "sp_prefix_basic",
        "subPatternSlug": "standard-prefix-sum-subarray-sum-k",
        "statement": "Given a binary array `nums`, return the maximum length of a contiguous subarray with an equal number of 0 and 1.",
        "bruteForce": {
          "explanation": "Check all subarray pairs (i, j) counting 0s and 1s in O(N^2) time.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int findMaxLength(vector<int>& nums) {\n        int maxLen = 0;\n        for (int i = 0; i < nums.size(); i++) {\n            int zeros = 0, ones = 0;\n            for (int j = i; j < nums.size(); j++) {\n                if (nums[j] == 0) zeros++; else ones++;\n                if (zeros == ones) maxLen = max(maxLen, j - i + 1);\n            }\n        }\n        return maxLen;\n    }\n};"
        },
        "optimal": {
          "explanation": "Treat 0 as -1. The problem transforms into finding the longest subarray with sum 0 using Prefix Sum + Map.",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    int findMaxLength(vector<int>& nums) {\n        unordered_map<int, int> mp;\n        mp[0] = -1; // Base case for 0 prefix sum at index -1\n        int sum = 0, maxLen = 0;\n\n        for (int i = 0; i < nums.size(); i++) {\n            sum += (nums[i] == 1) ? 1 : -1;\n            if (mp.count(sum)) {\n                maxLen = max(maxLen, i - mp[sum]);\n            } else {\n                mp[sum] = i;\n            }\n        }\n        return maxLen;\n    }\n};"
        }
      },
      {
        "id": "q_corporate_flight_bookings",
        "lcNum": "LC 1109",
        "title": "Corporate Flight Bookings",
        "slug": "corporate-flight-bookings",
        "diff": "medium",
        "url": "https://leetcode.com/problems/corporate-flight-bookings/",
        "patternId": "p_prefix_sum_difference_arrays",
        "patternSlug": "prefix-sum-difference-arrays",
        "subPatternId": "sp_prefix_diff",
        "subPatternSlug": "difference-array-range-updates",
        "statement": "There are `n` flights labeled 1 to `n`. Given `bookings` where `bookings[i] = [first, last, seats]`, return total seats per flight.",
        "bruteForce": {
          "explanation": "Iterate over each booking and increment seats for flights in range [first, last].",
          "timeComp": "O(N * B)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {\n        vector<int> res(n, 0);\n        for (auto& b : bookings) {\n            for (int i = b[0] - 1; i <= b[1] - 1; i++) {\n                res[i] += b[2];\n            }\n        }\n        return res;\n    }\n};"
        },
        "optimal": {
          "explanation": "Use Difference Array. Increment diff[first - 1] by seats and decrement diff[last] by seats. Compute prefix sum.",
          "timeComp": "O(N + B)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {\n        vector<int> res(n, 0);\n        for (auto& b : bookings) {\n            int first = b[0] - 1;\n            int last = b[1];\n            int seats = b[2];\n            res[first] += seats;\n            if (last < n) res[last] -= seats;\n        }\n        for (int i = 1; i < n; i++) {\n            res[i] += res[i - 1];\n        }\n        return res;\n    }\n};"
        }
      },
      {
        "id": "q_product_of_array_except_self",
        "slug": "product-of-array-except-self",
        "patternSlug": "prefix-sum-difference-arrays",
        "subPatternId": "sp_prefix_product",
        "subPatternSlug": "prefix-suffix-products",
        "patternId": "p_prefix_sum_difference_arrays",
        "lcNum": "LC 238",
        "title": "Product of Array Except Self",
        "url": "https://leetcode.com/problems/product-of-array-except-self/",
        "diff": "medium",
        "statement": "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all elements of `nums` except `nums[i]` without using division.",
        "bruteForce": {
          "explanation": "For each element i, compute product of all elements j != i in O(N^2) time.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> res(n, 1);\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                if (i != j) res[i] *= nums[j];\n            }\n        }\n        return res;\n    }\n};"
        },
        "optimal": {
          "explanation": "Pass 1: Fill answer with prefix products from left. Pass 2: Multiply by running suffix product from right in O(N) time and O(1) space.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> res(n, 1);\n\n        int leftProd = 1;\n        for (int i = 0; i < n; i++) {\n            res[i] = leftProd;\n            leftProd *= nums[i];\n        }\n\n        int rightProd = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= rightProd;\n            rightProd *= nums[i];\n        }\n\n        return res;\n    }\n};"
        }
      },
      {
        "id": "q_continuous_subarray_sum",
        "slug": "continuous-subarray-sum",
        "patternSlug": "prefix-sum-difference-arrays",
        "subPatternId": "sp_prefix_modulo",
        "subPatternSlug": "prefix-sum-modulo-arithmetic",
        "patternId": "p_prefix_sum_difference_arrays",
        "lcNum": "LC 523",
        "title": "Continuous Subarray Sum",
        "url": "https://leetcode.com/problems/continuous-subarray-sum/",
        "diff": "medium",
        "statement": "Given an integer array `nums` and an integer `k`, return `true` if `nums` has a good subarray of size at least two whose sum is a multiple of `k`.",
        "bruteForce": {
          "explanation": "Check all subarray pairs (i, j) of length >= 2 in O(N^2) time.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    bool checkSubarraySum(vector<int>& nums, int k) {\n        for (int i = 0; i < nums.size(); i++) {\n            int sum = nums[i];\n            for (int j = i + 1; j < nums.size(); j++) {\n                sum += nums[j];\n                if (sum % k == 0) return true;\n            }\n        }\n        return false;\n    }\n};"
        },
        "optimal": {
          "explanation": "Store earliest index of `running_sum % k` in hash map. If remainder was seen previously at index j with (i - j >= 2), return true.",
          "timeComp": "O(N)",
          "spaceComp": "O(min(N, K))",
          "cppCode": "class Solution {\npublic:\n    bool checkSubarraySum(vector<int>& nums, int k) {\n        unordered_map<int, int> mp;\n        mp[0] = -1; // Remainder 0 seen at index -1\n        int sum = 0;\n\n        for (int i = 0; i < nums.size(); i++) {\n            sum += nums[i];\n            int rem = sum % k;\n            if (rem < 0) rem += k; // Handle negative mod\n\n            if (mp.count(rem)) {\n                if (i - mp[rem] >= 2) return true;\n            } else {\n                mp[rem] = i;\n            }\n        }\n        return false;\n    }\n};"
        }
      }
    ],
    "slug": "prefix-sum-difference-arrays",
    "displayOrder": 4
  },
  {
    "id": "p_two_pointers",
    "name": "Two Pointers",
    "cues": [
      "Sorted array",
      "Pair elements matching target",
      "In-place array manipulation",
      "Palindromes",
      "Trapping Rain Water / Container With Most Water"
    ],
    "thinkAbout": "When the array is sorted, or when searching for pairs/triplets satisfied by opposite bounds converging inward.",
    "coreIdea": "Initialize left = 0, right = N - 1. Move left pointer rightward or right pointer leftward based on comparison with target.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    vector<int> twoSumSorted(vector<int>& numbers, int target) {\n        int left = 0, right = numbers.size() - 1;\n        while (left < right) {\n            int sum = numbers[left] + numbers[right];\n            if (sum == target) return {left + 1, right + 1};\n            else if (sum < target) left++;\n            else right--;\n        }\n        return {};\n    }\n};",
    "timeComplexity": "O(N) linear scan.",
    "spaceComplexity": "O(1) auxiliary space.",
    "pitfalls": [
      "Not skipping duplicates when generating unique triplets in 3Sum."
    ],
    "subPatterns": [
      {
        "id": "sp_tp_opposite",
        "name": "Opposite Direction Pointers",
        "cues": [
          "Sorted array pair search",
          "Two sum on sorted array",
          "Palindromes"
        ],
        "thinkAbout": "When operating on a sorted array where moving left increases sum and moving right decreases sum.",
        "coreIdea": "Place left at start and right at end. Move inward based on sum comparison.",
        "templateCode": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        int l = 0, r = numbers.size() - 1;\n        while (l < r) {\n            int sum = numbers[l] + numbers[r];\n            if (sum == target) return {l + 1, r + 1};\n            if (sum < target) l++; else r--;\n        }\n        return {};\n    }\n};",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "pitfalls": [
          "Loop bounds (left < right vs left <= right)."
        ],
        "slug": "opposite-direction-pointers",
        "patternSlug": "two-pointers",
        "patternId": "p_two_pointers"
      },
      {
        "id": "sp_tp_partitioning",
        "slug": "partitioning-backward-pointers",
        "patternSlug": "two-pointers",
        "patternId": "p_two_pointers",
        "name": "Partitioning & Backward Pointers",
        "cues": [
          "Dutch National Flag 3-way partition",
          "Merge sorted array backwards"
        ],
        "thinkAbout": "When partitioning array elements in-place with 3 boundary pointers or merging arrays from end.",
        "coreIdea": "Maintain low, mid, high pointers for Dutch National Flag, or write to target array backwards from m+n-1.",
        "templateCode": "// Dutch National Flag\nint low = 0, mid = 0, high = N - 1;\nwhile (mid <= high) {\n    if (nums[mid] == 0) swap(nums[low++], nums[mid++]);\n    else if (nums[mid] == 1) mid++;\n    else swap(nums[mid], nums[high--]);\n}"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 167",
        "title": "Two Sum II - Input Array Is Sorted",
        "subPatternId": "sp_tp_opposite",
        "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        "diff": "medium",
        "statement": "Given a 1-indexed sorted array of integers `numbers`, find two numbers that add up to `target`.",
        "bruteForce": {
          "explanation": "For each element i, use binary search for (target - numbers[i]) in remaining array.",
          "timeComp": "O(N log N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        for (int i = 0; i < numbers.size(); i++) {\n            int low = i + 1, high = numbers.size() - 1;\n            while (low <= high) {\n                int mid = low + (high - low) / 2;\n                if (numbers[mid] == target - numbers[i]) return {i + 1, mid + 1};\n                if (numbers[mid] < target - numbers[i]) low = mid + 1; else high = mid - 1;\n            }\n        }\n        return {};\n    }\n};"
        },
        "optimal": {
          "explanation": "Use two pointers at ends of sorted array. Increment left if sum < target, decrement right if sum > target.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        int l = 0, r = numbers.size() - 1;\n        while (l < r) {\n            int sum = numbers[l] + numbers[r];\n            if (sum == target) return {l + 1, r + 1};\n            if (sum < target) l++; else r--;\n        }\n        return {};\n    }\n};"
        },
        "id": "q_two_sum_ii_input_array_is_sorted",
        "slug": "two-sum-ii-input-array-is-sorted",
        "patternSlug": "two-pointers",
        "subPatternSlug": "opposite-direction-pointers",
        "patternId": "p_two_pointers"
      },
      {
        "id": "q_3sum",
        "lcNum": "LC 15",
        "title": "3Sum",
        "slug": "3sum",
        "diff": "medium",
        "url": "https://leetcode.com/problems/3sum/",
        "patternId": "p_two_pointers",
        "patternSlug": "two-pointers",
        "subPatternId": "sp_tp_opposite",
        "subPatternSlug": "opposite-direction-pointers",
        "statement": "Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j != k` and sum equals 0.",
        "bruteForce": {
          "explanation": "Use 3 nested loops to test all triplets in O(N^3) time, using set for uniqueness.",
          "timeComp": "O(N^3 log U)",
          "spaceComp": "O(U)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        set<vector<int>> st;\n        int n = nums.size();\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                for (int k = j + 1; k < n; k++) {\n                    if (nums[i] + nums[j] + nums[k] == 0) {\n                        vector<int> temp = {nums[i], nums[j], nums[k]};\n                        sort(temp.begin(), temp.end());\n                        st.insert(temp);\n                    }\n                }\n            }\n        }\n        return vector<vector<int>>(st.begin(), st.end());\n    }\n};"
        },
        "optimal": {
          "explanation": "Sort array. Fix first element i. Use two pointers (left = i+1, right = n-1) to find sum == -nums[i]. Skip duplicates.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        vector<vector<int>> res;\n        sort(nums.begin(), nums.end());\n        int n = nums.size();\n\n        for (int i = 0; i < n - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicate i\n\n            int left = i + 1, right = n - 1;\n            while (left < right) {\n                int sum = nums[i] + nums[left] + nums[right];\n                if (sum == 0) {\n                    res.push_back({nums[i], nums[left], nums[right]});\n                    while (left < right && nums[left] == nums[left + 1]) left++; // Skip duplicate left\n                    while (left < right && nums[right] == nums[right - 1]) right--; // Skip duplicate right\n                    left++; right--;\n                } else if (sum < 0) left++;\n                else right--;\n            }\n        }\n        return res;\n    }\n};"
        }
      },
      {
        "id": "q_container_with_most_water",
        "lcNum": "LC 11",
        "title": "Container With Most Water",
        "slug": "container-with-most-water",
        "diff": "medium",
        "url": "https://leetcode.com/problems/container-with-most-water/",
        "patternId": "p_two_pointers",
        "patternSlug": "two-pointers",
        "subPatternId": "sp_tp_opposite",
        "subPatternSlug": "opposite-direction-pointers",
        "statement": "Given `height` array of size `n`, find two lines that together with the x-axis form a container containing the most water.",
        "bruteForce": {
          "explanation": "Test all line pairs (i, j) calculating area = min(height[i], height[j]) * (j - i).",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int maxW = 0;\n        for (int i = 0; i < height.size(); i++) {\n            for (int j = i + 1; j < height.size(); j++) {\n                int area = min(height[i], height[j]) * (j - i);\n                maxW = max(maxW, area);\n            }\n        }\n        return maxW;\n    }\n};"
        },
        "optimal": {
          "explanation": "Start two pointers at ends (left=0, right=n-1). Move the pointer with smaller height inward to potentially find a taller line.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int left = 0, right = height.size() - 1;\n        int maxW = 0;\n\n        while (left < right) {\n            int w = right - left;\n            int h = min(height[left], height[right]);\n            maxW = max(maxW, w * h);\n\n            if (height[left] < height[right]) left++;\n            else right--;\n        }\n        return maxW;\n    }\n};"
        }
      },
      {
        "id": "q_trapping_rain_water",
        "lcNum": "LC 42",
        "title": "Trapping Rain Water",
        "slug": "trapping-rain-water",
        "diff": "hard",
        "url": "https://leetcode.com/problems/trapping-rain-water/",
        "patternId": "p_two_pointers",
        "patternSlug": "two-pointers",
        "subPatternId": "sp_tp_opposite",
        "subPatternSlug": "opposite-direction-pointers",
        "statement": "Given `n` non-negative integers representing an elevation map where width of each bar is 1, compute how much water it can trap after raining.",
        "bruteForce": {
          "explanation": "For each bar i, find max left height and max right height in O(N), trapping min(leftMax, rightMax) - height[i].",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        int n = height.size(), water = 0;\n        for (int i = 0; i < n; i++) {\n            int leftMax = 0, rightMax = 0;\n            for (int j = i; j >= 0; j--) leftMax = max(leftMax, height[j]);\n            for (int j = i; j < n; j++) rightMax = max(rightMax, height[j]);\n            water += min(leftMax, rightMax) - height[i];\n        }\n        return water;\n    }\n};"
        },
        "optimal": {
          "explanation": "Use two pointers (left, right) with maxLeft and maxRight. Move pointer pointing to smaller boundary height.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        int left = 0, right = height.size() - 1;\n        int maxLeft = 0, maxRight = 0, water = 0;\n\n        while (left < right) {\n            if (height[left] <= height[right]) {\n                if (height[left] >= maxLeft) maxLeft = height[left];\n                else water += maxLeft - height[left];\n                left++;\n            } else {\n                if (height[right] >= maxRight) maxRight = height[right];\n                else water += maxRight - height[right];\n                right--;\n            }\n        }\n        return water;\n    }\n};"
        }
      },
      {
        "id": "q_sort_colors",
        "slug": "sort-colors",
        "patternSlug": "two-pointers",
        "subPatternId": "sp_tp_partitioning",
        "subPatternSlug": "partitioning-backward-pointers",
        "patternId": "p_two_pointers",
        "lcNum": "LC 75",
        "title": "Sort Colors (Dutch National Flag)",
        "url": "https://leetcode.com/problems/sort-colors/",
        "diff": "medium",
        "statement": "Given an array `nums` with `n` objects colored red (0), white (1), or blue (2), sort them in-place in O(N) single pass.",
        "bruteForce": {
          "explanation": "Count 0s, 1s, and 2s in 1st pass, then overwrite array in 2nd pass in O(2N).",
          "timeComp": "O(2N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        int c0 = 0, c1 = 0, c2 = 0;\n        for (int x : nums) {\n            if (x == 0) c0++; else if (x == 1) c1++; else c2++;\n        }\n        int idx = 0;\n        while (c0--) nums[idx++] = 0;\n        while (c1--) nums[idx++] = 1;\n        while (c2--) nums[idx++] = 2;\n    }\n};"
        },
        "optimal": {
          "explanation": "Dutch National Flag Algorithm using 3 pointers (low, mid, high). Single pass O(N) time and O(1) space.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        int low = 0, mid = 0, high = nums.size() - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) {\n                swap(nums[low++], nums[mid++]);\n            } else if (nums[mid] == 1) {\n                mid++;\n            } else {\n                swap(nums[mid], nums[high--]);\n            }\n        }\n    }\n};"
        }
      },
      {
        "id": "q_merge_sorted_array",
        "slug": "merge-sorted-array",
        "patternSlug": "two-pointers",
        "subPatternId": "sp_tp_partitioning",
        "subPatternSlug": "partitioning-backward-pointers",
        "patternId": "p_two_pointers",
        "lcNum": "LC 88",
        "title": "Merge Sorted Array",
        "url": "https://leetcode.com/problems/merge-sorted-array/",
        "diff": "easy",
        "statement": "Merge sorted arrays `nums1` and `nums2` into `nums1` as one sorted array in-place.",
        "bruteForce": {
          "explanation": "Copy nums2 into empty space of nums1 and call sort() in O((M+N) log(M+N)).",
          "timeComp": "O((M+N) log(M+N))",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        for (int i = 0; i < n; i++) nums1[m + i] = nums2[i];\n        sort(nums1.begin(), nums1.end());\n    }\n};"
        },
        "optimal": {
          "explanation": "Fill nums1 backwards starting from index `m + n - 1` using two pointers comparing elements from right to left.",
          "timeComp": "O(M + N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        int p1 = m - 1, p2 = n - 1, i = m + n - 1;\n        while (p2 >= 0) {\n            if (p1 >= 0 && nums1[p1] > nums2[p2]) {\n                nums1[i--] = nums1[p1--];\n            } else {\n                nums1[i--] = nums2[p2--];\n            }\n        }\n    }\n};"
        }
      }
    ],
    "slug": "two-pointers",
    "displayOrder": 5
  },
  {
    "id": "p_sliding_window",
    "name": "Sliding Window",
    "cues": [
      "Contiguous subarray or substring",
      "Maximum / Minimum sum of size K",
      "Longest substring with K distinct characters",
      "Window expansion and shrinking"
    ],
    "thinkAbout": "When looking for optimal contiguous subarrays or substrings satisfying a condition.",
    "coreIdea": "Expand right pointer to include elements. When condition is violated, shrink left pointer until valid.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    int minSubArrayLen(int target, vector<int>& nums) {\n        int left = 0, sum = 0, minLen = INT_MAX;\n        for (int right = 0; right < nums.size(); right++) {\n            sum += nums[right];\n            while (sum >= target) {\n                minLen = min(minLen, right - left + 1);\n                sum -= nums[left++];\n            }\n        }\n        return minLen == INT_MAX ? 0 : minLen;\n    }\n};",
    "timeComplexity": "O(N) because left and right pointers move at most N steps.",
    "spaceComplexity": "O(1) auxiliary space.",
    "pitfalls": [
      "Shrinking window with if instead of while."
    ],
    "subPatterns": [
      {
        "id": "sp_sw_variable",
        "name": "Variable Length Sliding Window",
        "cues": [
          "Longest substring without repeating characters",
          "Minimum size subarray sum"
        ],
        "thinkAbout": "When finding maximum or minimum length of a valid continuous subarray.",
        "coreIdea": "Expand right pointer. Use a hash map or frequency array. Shrink left pointer while condition invalid.",
        "templateCode": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> charSet;\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.length(); right++) {\n            while (charSet.count(s[right])) {\n                charSet.erase(s[left++]);\n            }\n            charSet.insert(s[right]);\n            maxLen = max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(min(N, AlphabetSize))",
        "pitfalls": [
          "Not updating maxLen after shrinking window."
        ],
        "slug": "variable-length-sliding-window",
        "patternSlug": "sliding-window",
        "patternId": "p_sliding_window"
      },
      {
        "id": "sp_sw_fixed",
        "name": "Fixed-Size Sliding Window",
        "slug": "fixed-size-sliding-window",
        "patternSlug": "sliding-window",
        "patternId": "p_sliding_window",
        "cues": [
          "Window size K is fixed",
          "Subarray of size K with max sum / property"
        ],
        "thinkAbout": "When the window size K is explicitly fixed. Add new right element and subtract old left element.",
        "coreIdea": "Maintain window sum or state of size K. Slide right by 1, subtracting nums[i - K] and adding nums[i].",
        "templateCode": "// Fixed Window Template\nfor (int i = 0; i < N; i++) {\n    windowState += nums[i];\n    if (i >= K) windowState -= nums[i - K];\n    if (i >= K - 1) updateAns(windowState);\n}"
      },
      {
        "id": "sp_sw_k_ops",
        "slug": "variable-window-k-operations-replacement",
        "patternSlug": "sliding-window",
        "patternId": "p_sliding_window",
        "name": "Variable Window with K Operations / Replacement",
        "cues": [
          "Max consecutive ones III after flip K zeroes",
          "Longest repeating character replacement"
        ],
        "thinkAbout": "When allowed up to K invalid element flips/replacements inside variable window.",
        "coreIdea": "Track count of invalid elements or max frequency. Shrink left pointer when `(window_len - max_freq) > K` or `zero_count > K`.",
        "templateCode": "// K Operations Window Template"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 3",
        "title": "Longest Substring Without Repeating Characters",
        "subPatternId": "sp_sw_variable",
        "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        "diff": "medium",
        "statement": "Given a string `s`, find the length of the longest substring without repeating characters.",
        "bruteForce": {
          "explanation": "Check all substrings (i, j) and verify if characters are unique using set in O(N^3).",
          "timeComp": "O(N^3)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        int maxLen = 0;\n        for (int i = 0; i < s.length(); i++) {\n            for (int j = i; j < s.length(); j++) {\n                unordered_set<char> set;\n                bool ok = true;\n                for (int k = i; k <= j; k++) {\n                    if (set.count(s[k])) { ok = false; break; }\n                    set.insert(s[k]);\n                }\n                if (ok) maxLen = max(maxLen, j - i + 1);\n            }\n        }\n        return maxLen;\n    }\n};"
        },
        "optimal": {
          "explanation": "Maintain sliding window [left, right] with hash set of active characters. Shrink left when duplicate is encountered.",
          "timeComp": "O(N)",
          "spaceComp": "O(min(N, AlphabetSize))",
          "cppCode": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> st;\n        int l = 0, maxLen = 0;\n        for (int r = 0; r < s.length(); r++) {\n            while (st.count(s[r])) st.erase(s[l++]);\n            st.insert(s[r]);\n            maxLen = max(maxLen, r - l + 1);\n        }\n        return maxLen;\n    }\n};"
        },
        "id": "q_longest_substring_without_repeating_characters",
        "slug": "longest-substring-without-repeating-characters",
        "patternSlug": "sliding-window",
        "subPatternSlug": "variable-length-sliding-window",
        "patternId": "p_sliding_window"
      },
      {
        "id": "q_minimum_size_subarray_sum",
        "lcNum": "LC 209",
        "title": "Minimum Size Subarray Sum",
        "slug": "minimum-size-subarray-sum",
        "diff": "medium",
        "url": "https://leetcode.com/problems/minimum-size-subarray-sum/",
        "patternId": "p_sliding_window",
        "patternSlug": "sliding-window",
        "subPatternId": "sp_sw_variable",
        "subPatternSlug": "variable-length-sliding-window",
        "statement": "Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is $\\ge target$.",
        "bruteForce": {
          "explanation": "Check all subarray pairs (i, j) in O(N^2) time to find minimal valid length.",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int minSubArrayLen(int target, vector<int>& nums) {\n        int minLen = INT_MAX;\n        for (int i = 0; i < nums.size(); i++) {\n            int sum = 0;\n            for (int j = i; j < nums.size(); j++) {\n                sum += nums[j];\n                if (sum >= target) {\n                    minLen = min(minLen, j - i + 1);\n                    break;\n                }\n            }\n        }\n        return minLen == INT_MAX ? 0 : minLen;\n    }\n};"
        },
        "optimal": {
          "explanation": "Use variable sliding window. Expand right pointer to build sum. Shrink left pointer while sum >= target.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int minSubArrayLen(int target, vector<int>& nums) {\n        int left = 0, sum = 0, minLen = INT_MAX;\n\n        for (int right = 0; right < nums.size(); right++) {\n            sum += nums[right];\n            while (sum >= target) {\n                minLen = min(minLen, right - left + 1);\n                sum -= nums[left++];\n            }\n        }\n        return minLen == INT_MAX ? 0 : minLen;\n    }\n};"
        }
      },
      {
        "id": "q_find_all_anagrams_in_a_string",
        "lcNum": "LC 438",
        "title": "Find All Anagrams in a String",
        "slug": "find-all-anagrams-in-a-string",
        "diff": "medium",
        "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
        "patternId": "p_sliding_window",
        "patternSlug": "sliding-window",
        "subPatternId": "sp_sw_fixed",
        "subPatternSlug": "fixed-size-sliding-window",
        "statement": "Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`.",
        "bruteForce": {
          "explanation": "Extract every substring of length |p| in s and sort it to match p in O(N * K log K).",
          "timeComp": "O(N * K log K)",
          "spaceComp": "O(K)",
          "cppCode": "class Solution {\npublic:\n    vector<int> findAnagrams(string s, string p) {\n        vector<int> ans;\n        int n = s.length(), m = p.length();\n        if (n < m) return ans;\n        string pSorted = p;\n        sort(pSorted.begin(), pSorted.end());\n\n        for (int i = 0; i <= n - m; i++) {\n            string sub = s.substr(i, m);\n            sort(sub.begin(), sub.end());\n            if (sub == pSorted) ans.push_back(i);\n        }\n        return ans;\n    }\n};"
        },
        "optimal": {
          "explanation": "Maintain a fixed sliding window of size |p| using a frequency array of size 26.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> findAnagrams(string s, string p) {\n        vector<int> ans;\n        if (s.length() < p.length()) return ans;\n\n        vector<int> pFreq(26, 0), sFreq(26, 0);\n        int m = p.length();\n        for (int i = 0; i < m; i++) {\n            pFreq[p[i] - 'a']++;\n            sFreq[s[i] - 'a']++;\n        }\n\n        if (pFreq == sFreq) ans.push_back(0);\n\n        for (int i = m; i < s.length(); i++) {\n            sFreq[s[i] - 'a']++;\n            sFreq[s[i - m] - 'a']--;\n            if (pFreq == sFreq) ans.push_back(i - m + 1);\n        }\n        return ans;\n    }\n};"
        }
      },
      {
        "id": "q_minimum_window_substring",
        "lcNum": "LC 76",
        "title": "Minimum Window Substring",
        "slug": "minimum-window-substring",
        "diff": "hard",
        "url": "https://leetcode.com/problems/minimum-window-substring/",
        "patternId": "p_sliding_window",
        "patternSlug": "sliding-window",
        "subPatternId": "sp_sw_variable",
        "subPatternSlug": "variable-length-sliding-window",
        "statement": "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included.",
        "bruteForce": {
          "explanation": "Check all possible substrings of s and verify if t's character frequency requirement is satisfied.",
          "timeComp": "O(N^2 * K)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    string minWindow(string s, string t) {\n        int n = s.length();\n        string minStr = \"\";\n        int minLen = INT_MAX;\n\n        for (int i = 0; i < n; i++) {\n            for (int j = i; j < n; j++) {\n                string sub = s.substr(i, j - i + 1);\n                unordered_map<char, int> mp;\n                for (char c : sub) mp[c]++;\n                bool valid = true;\n                for (char c : t) {\n                    if (--mp[c] < 0) { valid = false; break; }\n                }\n                if (valid && sub.length() < minLen) {\n                    minLen = sub.length();\n                    minStr = sub;\n                }\n            }\n        }\n        return minStr;\n    }\n};"
        },
        "optimal": {
          "explanation": "Variable Sliding Window with `required` match counter. Expand right pointer to meet counts, shrink left pointer to minimize window.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    string minWindow(string s, string t) {\n        if (s.empty() || t.empty()) return \"\";\n        unordered_map<char, int> targetMap;\n        for (char c : t) targetMap[c]++;\n\n        int required = targetMap.size();\n        int formed = 0;\n        unordered_map<char, int> windowMap;\n\n        int left = 0, minLen = INT_MAX, minStart = 0;\n\n        for (int right = 0; right < s.length(); right++) {\n            char c = s[right];\n            windowMap[c]++;\n            if (targetMap.count(c) && windowMap[c] == targetMap[c]) {\n                formed++;\n            }\n\n            while (left <= right && formed == required) {\n                if (right - left + 1 < minLen) {\n                    minLen = right - left + 1;\n                    minStart = left;\n                }\n\n                char leftChar = s[left];\n                windowMap[leftChar]--;\n                if (targetMap.count(leftChar) && windowMap[leftChar] < targetMap[leftChar]) {\n                    formed--;\n                }\n                left++;\n            }\n        }\n        return minLen == INT_MAX ? \"\" : s.substr(minStart, minLen);\n    }\n};"
        }
      },
      {
        "id": "q_max_consecutive_ones_iii",
        "slug": "max-consecutive-ones-iii",
        "patternSlug": "sliding-window",
        "subPatternId": "sp_sw_k_ops",
        "subPatternSlug": "variable-window-k-operations-replacement",
        "patternId": "p_sliding_window",
        "lcNum": "LC 1004",
        "title": "Max Consecutive Ones III",
        "url": "https://leetcode.com/problems/max-consecutive-ones-iii/",
        "diff": "medium",
        "statement": "Given a binary array `nums` and an integer `k`, return maximum number of consecutive `1`'s if you can flip at most `k` `0`'s.",
        "bruteForce": {
          "explanation": "Check all subarray pairs counting 0s. Take max length with 0-count <= K in O(N^2).",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int longestOnes(vector<int>& nums, int k) {\n        int maxLen = 0;\n        for (int i = 0; i < nums.size(); i++) {\n            int zeros = 0;\n            for (int j = i; j < nums.size(); j++) {\n                if (nums[j] == 0) zeros++;\n                if (zeros <= k) maxLen = max(maxLen, j - i + 1);\n                else break;\n            }\n        }\n        return maxLen;\n    }\n};"
        },
        "optimal": {
          "explanation": "Variable sliding window. Track `zeroCount`. Shrink `left` pointer whenever `zeroCount > k` in O(N) single pass.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int longestOnes(vector<int>& nums, int k) {\n        int left = 0, zeroCount = 0, maxLen = 0;\n        for (int right = 0; right < nums.size(); right++) {\n            if (nums[right] == 0) zeroCount++;\n            while (zeroCount > k) {\n                if (nums[left] == 0) zeroCount--;\n                left++;\n            }\n            maxLen = max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};"
        }
      },
      {
        "id": "q_longest_repeating_character_replacement",
        "slug": "longest-repeating-character-replacement",
        "patternSlug": "sliding-window",
        "subPatternId": "sp_sw_k_ops",
        "subPatternSlug": "variable-window-k-operations-replacement",
        "patternId": "p_sliding_window",
        "lcNum": "LC 424",
        "title": "Longest Repeating Character Replacement",
        "url": "https://leetcode.com/problems/longest-repeating-character-replacement/",
        "diff": "medium",
        "statement": "Given string `s` and integer `k`, choose any character and change it to any other uppercase English character at most `k` times. Return length of longest substring containing same letter.",
        "bruteForce": {
          "explanation": "Test all substrings checking if (length - maxFreq) <= K in O(26 * N^2).",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "// Substring brute force"
        },
        "optimal": {
          "explanation": "Sliding window with `maxFreq` tracker. Valid condition: `(right - left + 1) - maxFreq <= k`. Shrink left when invalid.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int characterReplacement(string s, int k) {\n        vector<int> freq(26, 0);\n        int left = 0, maxFreq = 0, maxLen = 0;\n\n        for (int right = 0; right < s.length(); right++) {\n            freq[s[right] - 'A']++;\n            maxFreq = max(maxFreq, freq[s[right] - 'A']);\n\n            while ((right - left + 1) - maxFreq > k) {\n                freq[s[left] - 'A']--;\n                left++;\n            }\n            maxLen = max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};"
        }
      }
    ],
    "slug": "sliding-window",
    "displayOrder": 6
  },
  {
    "id": "p_binary_search",
    "name": "Binary Search",
    "cues": [
      "Sorted array or monotonic function",
      "Search in O(log N) time",
      "Binary Search on Answer (Minimize Maximum / Maximize Minimum)",
      "Rotated sorted array",
      "Search space boundaries [Low, High]"
    ],
    "thinkAbout": "When the input is sorted, or when asking for an optimal minimum/maximum value over a range where a feasibility condition check(val) transitions monotonically from False to True.",
    "coreIdea": "Halve search space in each step by checking mid = low + (high - low) / 2. Discard half based on sorting invariant.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n};",
    "timeComplexity": "O(log N) standard, O(N log(Range)) for BS on answer.",
    "spaceComplexity": "O(1) auxiliary space.",
    "pitfalls": [
      "Integer overflow in C++ when computing (low + high) / 2.",
      "Infinite loops caused by incorrect pointer updating."
    ],
    "subPatterns": [
      {
        "id": "sp_bs_standard",
        "name": "Standard & Boundary Search",
        "cues": [
          "Sorted array",
          "O(log N) search"
        ],
        "thinkAbout": "When vector is sorted and target search is required in O(log N) time.",
        "coreIdea": "Maintain low and high pointers. Halve search space by comparing mid with target.",
        "templateCode": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n};",
        "timeComplexity": "O(log N)",
        "spaceComplexity": "O(1)",
        "pitfalls": [
          "Using (low + high) / 2 causing overflow."
        ],
        "slug": "standard-boundary-search",
        "patternSlug": "binary-search",
        "patternId": "p_binary_search"
      },
      {
        "id": "sp_bs_rotated",
        "name": "Rotated & Modified Array",
        "cues": [
          "Rotated sorted array",
          "Identify sorted half"
        ],
        "thinkAbout": "At any mid index in a rotated array, one half is guaranteed to be sorted.",
        "coreIdea": "Find which half is sorted. Check if target lies within its bounds.",
        "templateCode": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[low] <= nums[mid]) {\n                if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n                else low = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n                else high = mid - 1;\n            }\n        }\n        return -1;\n    }\n};",
        "timeComplexity": "O(log N)",
        "spaceComplexity": "O(1)",
        "pitfalls": [
          "Duplicates where nums[low] == nums[mid] == nums[high]."
        ],
        "slug": "rotated-modified-array",
        "patternSlug": "binary-search",
        "patternId": "p_binary_search"
      },
      {
        "id": "sp_bs_on_answer",
        "name": "Binary Search on Answer",
        "cues": [
          "Minimize Maximum / Maximize Minimum",
          "Monotonic check(mid) function"
        ],
        "thinkAbout": "When searching for optimal value over bounded range with monotonic feasibility predicate.",
        "coreIdea": "Binary search range [Low, High]. Test feasibility with check(mid). Store valid ans and shrink range.",
        "templateCode": "class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        int low = 1, high = *max_element(piles.begin(), piles.end());\n        int ans = high;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            long long hours = 0;\n            for (int p : piles) hours += (p + mid - 1) / mid;\n            if (hours <= h) { ans = mid; high = mid - 1; }\n            else low = mid + 1;\n        }\n        return ans;\n    }\n};",
        "timeComplexity": "O(N log(Range))",
        "spaceComplexity": "O(1)",
        "pitfalls": [
          "Setting low = 0 when speed must be positive."
        ],
        "slug": "binary-search-on-answer",
        "patternSlug": "binary-search",
        "patternId": "p_binary_search"
      },
      {
        "id": "sp_bs_matrix_peak",
        "slug": "2d-matrix-unsorted-condition-search",
        "patternSlug": "binary-search",
        "patternId": "p_binary_search",
        "name": "2D Matrix & Unsorted Condition Search",
        "cues": [
          "Search 2D matrix",
          "Find peak element"
        ],
        "thinkAbout": "When performing binary search on 2D grid flattened virtually, or searching peak on unsorted array.",
        "coreIdea": "Map 1D mid to 2D cell: `matrix[mid / N][mid % N]`. For peak element, eliminate side where `nums[mid] < nums[mid + 1]`.",
        "templateCode": "// Virtual 1D Matrix Search\nint low = 0, high = M * N - 1;\nwhile (low <= high) {\n    int mid = low + (high - low) / 2;\n    int val = matrix[mid / N][mid % N];\n    if (val == target) return true;\n    if (val < target) low = mid + 1; else high = mid - 1;\n}"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 704",
        "title": "Binary Search",
        "subPatternId": "sp_bs_standard",
        "url": "https://leetcode.com/problems/binary-search/",
        "diff": "easy",
        "statement": "Given an array of integers `nums` sorted in ascending order and an integer `target`, search `target` in `nums`.",
        "bruteForce": {
          "explanation": "Linear scan in O(N).",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        for (int i = 0; i < nums.size(); i++) if (nums[i] == target) return i;\n        return -1;\n    }\n};"
        },
        "optimal": {
          "explanation": "Binary search on sorted array in O(log N).",
          "timeComp": "O(log N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n};"
        },
        "id": "q_binary_search",
        "slug": "binary-search",
        "patternSlug": "binary-search",
        "subPatternSlug": "standard-boundary-search",
        "patternId": "p_binary_search"
      },
      {
        "lcNum": "LC 33",
        "title": "Search In Rotated Sorted Array",
        "subPatternId": "sp_bs_rotated",
        "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        "diff": "medium",
        "statement": "Given rotated array `nums` and integer `target`, return index of `target` or `-1`.",
        "bruteForce": {
          "explanation": "Linear scan in O(N).",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        for (int i = 0; i < nums.size(); i++) if (nums[i] == target) return i;\n        return -1;\n    }\n};"
        },
        "optimal": {
          "explanation": "Identify sorted half at mid. Check if target lies within bounds.",
          "timeComp": "O(log N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[low] <= nums[mid]) {\n                if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n                else low = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n                else high = mid - 1;\n            }\n        }\n        return -1;\n    }\n};"
        },
        "id": "q_search_in_rotated_sorted_array",
        "slug": "search-in-rotated-sorted-array",
        "patternSlug": "binary-search",
        "subPatternSlug": "rotated-modified-array",
        "patternId": "p_binary_search"
      },
      {
        "lcNum": "LC 875",
        "title": "Koko Eating Bananas",
        "subPatternId": "sp_bs_on_answer",
        "url": "https://leetcode.com/problems/koko-eating-bananas/",
        "diff": "medium",
        "statement": "Return minimum eating speed `k` to finish all piles within `h` hours.",
        "bruteForce": {
          "explanation": "Linear scan speed k from 1 upwards.",
          "timeComp": "O(N * MaxPile)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        int k = 1;\n        while (true) {\n            long long hours = 0;\n            for (int p : piles) hours += (p + k - 1) / k;\n            if (hours <= h) return k;\n            k++;\n        }\n    }\n};"
        },
        "optimal": {
          "explanation": "Binary Search on Answer range [1, max(piles)].",
          "timeComp": "O(N log(MaxPile))",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        int low = 1, high = *max_element(piles.begin(), piles.end());\n        int ans = high;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            long long hours = 0;\n            for (int p : piles) hours += (p + mid - 1) / mid;\n            if (hours <= h) { ans = mid; high = mid - 1; }\n            else low = mid + 1;\n        }\n        return ans;\n    }\n};"
        },
        "id": "q_koko_eating_bananas",
        "slug": "koko-eating-bananas",
        "patternSlug": "binary-search",
        "subPatternSlug": "binary-search-on-answer",
        "patternId": "p_binary_search"
      },
      {
        "id": "q_find_minimum_in_rotated_sorted_array",
        "lcNum": "LC 153",
        "title": "Find Minimum in Rotated Sorted Array",
        "slug": "find-minimum-in-rotated-sorted-array",
        "diff": "medium",
        "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
        "patternId": "p_binary_search",
        "patternSlug": "binary-search",
        "subPatternId": "sp_bs_rotated",
        "subPatternSlug": "rotated-modified-array-search",
        "statement": "Given a rotated sorted array `nums` of unique elements, return the minimum element of this array in O(log N) time.",
        "bruteForce": {
          "explanation": "Linear scan through the array in O(N) to find minimum element.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        int mn = nums[0];\n        for (int x : nums) mn = min(mn, x);\n        return mn;\n    }\n};"
        },
        "optimal": {
          "explanation": "Binary search comparing `nums[mid]` with `nums[high]`. If `nums[mid] > nums[high]`, minimum lies in right half.",
          "timeComp": "O(log N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        int low = 0, high = nums.size() - 1;\n        while (low < high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] > nums[high]) low = mid + 1;\n            else high = mid;\n        }\n        return nums[low];\n    }\n};"
        }
      },
      {
        "id": "q_capacity_to_ship_packages_within_d_days",
        "lcNum": "LC 1011",
        "title": "Capacity To Ship Packages Within D Days",
        "slug": "capacity-to-ship-packages-within-d-days",
        "diff": "medium",
        "url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
        "patternId": "p_binary_search",
        "patternSlug": "binary-search",
        "subPatternId": "sp_bs_on_answer",
        "subPatternSlug": "binary-search-on-answer-space",
        "statement": "Given package weights and days `D`, find the minimum ship capacity to convey all packages within `D` days.",
        "bruteForce": {
          "explanation": "Linear search ship capacities starting from max(weights) up to sum(weights).",
          "timeComp": "O(sum(weights) * N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int shipWithinDays(vector<int>& weights, int days) {\n        int low = *max_element(weights.begin(), weights.end());\n        int high = accumulate(weights.begin(), weights.end(), 0);\n\n        for (int cap = low; cap <= high; cap++) {\n            int neededDays = 1, currentLoad = 0;\n            for (int w : weights) {\n                if (currentLoad + w > cap) { neededDays++; currentLoad = 0; }\n                currentLoad += w;\n            }\n            if (neededDays <= days) return cap;\n        }\n        return high;\n    }\n};"
        },
        "optimal": {
          "explanation": "Binary search capacity range [max(weights), sum(weights)] using feasibility check predicate function.",
          "timeComp": "O(N log(sum - max))",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int shipWithinDays(vector<int>& weights, int days) {\n        int low = *max_element(weights.begin(), weights.end());\n        int high = accumulate(weights.begin(), weights.end(), 0);\n        int ans = high;\n\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            int neededDays = 1, currentLoad = 0;\n            for (int w : weights) {\n                if (currentLoad + w > mid) {\n                    neededDays++;\n                    currentLoad = 0;\n                }\n                currentLoad += w;\n            }\n\n            if (neededDays <= days) {\n                ans = mid;\n                high = mid - 1; // Try smaller capacity\n            } else {\n                low = mid + 1;  // Need bigger capacity\n            }\n        }\n        return ans;\n    }\n};"
        }
      },
      {
        "id": "q_search_a_2d_matrix",
        "slug": "search-a-2d-matrix",
        "patternSlug": "binary-search",
        "subPatternId": "sp_bs_matrix_peak",
        "subPatternSlug": "2d-matrix-unsorted-condition-search",
        "patternId": "p_binary_search",
        "lcNum": "LC 74",
        "title": "Search a 2D Matrix",
        "url": "https://leetcode.com/problems/search-a-2d-matrix/",
        "diff": "medium",
        "statement": "Given an `m x n` integer matrix `matrix` where rows are sorted and first integer of row > last of prev row, return `true` if `target` is in matrix.",
        "bruteForce": {
          "explanation": "Linear scan through all M x N cells in O(M * N).",
          "timeComp": "O(M * N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        for (auto& row : matrix) {\n            for (int x : row) if (x == target) return true;\n        }\n        return false;\n    }\n};"
        },
        "optimal": {
          "explanation": "Virtual 1D Binary Search treating M x N matrix as array of size M * N using cell mapping `matrix[mid / N][mid % N]` in O(log(M * N)).",
          "timeComp": "O(log(M * N))",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        if (matrix.empty() || matrix[0].empty()) return false;\n        int m = matrix.size(), n = matrix[0].size();\n        int low = 0, high = m * n - 1;\n\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            int val = matrix[mid / n][mid % n];\n            if (val == target) return true;\n            if (val < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return false;\n    }\n};"
        }
      },
      {
        "id": "q_find_peak_element",
        "slug": "find-peak-element",
        "patternSlug": "binary-search",
        "subPatternId": "sp_bs_matrix_peak",
        "subPatternSlug": "2d-matrix-unsorted-condition-search",
        "patternId": "p_binary_search",
        "lcNum": "LC 162",
        "title": "Find Peak Element",
        "url": "https://leetcode.com/problems/find-peak-element/",
        "diff": "medium",
        "statement": "A peak element is an element strictly greater than its neighbors. Given 0-indexed integer array `nums`, find a peak element and return its index in O(log N).",
        "bruteForce": {
          "explanation": "Linear scan finding index i where nums[i] > nums[i+1] in O(N).",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        for (int i = 0; i < nums.size() - 1; i++) {\n            if (nums[i] > nums[i + 1]) return i;\n        }\n        return nums.size() - 1;\n    }\n};"
        },
        "optimal": {
          "explanation": "Binary search on unsorted array. If `nums[mid] < nums[mid + 1]`, a peak MUST exist in the right half.",
          "timeComp": "O(log N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        int low = 0, high = nums.size() - 1;\n        while (low < high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] < nums[mid + 1]) low = mid + 1;\n            else high = mid;\n        }\n        return low;\n    }\n};"
        }
      }
    ],
    "slug": "binary-search",
    "displayOrder": 7
  },
  {
    "id": "p_overlapping_intervals",
    "name": "Overlapping Intervals",
    "cues": [
      "Interval start & end times",
      "Merge overlapping intervals",
      "Insert interval",
      "Meeting rooms / Non-overlapping intervals"
    ],
    "thinkAbout": "When dealing with continuous ranges [start, end] where events or intervals overlap.",
    "coreIdea": "Sort intervals by start time. Iterate through intervals and merge if current start <= previous end.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        if (intervals.empty()) return {};\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> merged = {intervals[0]};\n        for (int i = 1; i < intervals.size(); i++) {\n            if (intervals[i][0] <= merged.back()[1]) {\n                merged.back()[1] = max(merged.back()[1], intervals[i][1]);\n            } else {\n                merged.push_back(intervals[i]);\n            }\n        }\n        return merged;\n    }\n};",
    "timeComplexity": "O(N log N) sorting.",
    "spaceComplexity": "O(N) for merged results.",
    "pitfalls": [
      "Forgetting to sort intervals before iteration."
    ],
    "subPatterns": [
      {
        "id": "sp_int_merge",
        "name": "Interval Merging & Insertion",
        "cues": [
          "Merge intervals",
          "Insert interval into sorted list"
        ],
        "thinkAbout": "When combining overlapping time ranges into contiguous intervals.",
        "coreIdea": "Sort by start time. Compare current start with last merged end.",
        "templateCode": "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> res;\n        for (auto& interval : intervals) {\n            if (res.empty() || res.back()[1] < interval[0]) res.push_back(interval);\n            else res.back()[1] = max(res.back()[1], interval[1]);\n        }\n        return res;\n    }\n};",
        "timeComplexity": "O(N log N)",
        "spaceComplexity": "O(N)",
        "pitfalls": [
          "Not using max for end time updating."
        ],
        "slug": "interval-merging-insertion",
        "patternSlug": "overlapping-intervals",
        "patternId": "p_overlapping_intervals"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 56",
        "title": "Merge Intervals",
        "subPatternId": "sp_int_merge",
        "url": "https://leetcode.com/problems/merge-intervals/",
        "diff": "medium",
        "statement": "Given an array of `intervals`, merge all overlapping intervals.",
        "bruteForce": {
          "explanation": "Compare every pair of intervals and merge iteratively in O(N^2).",
          "timeComp": "O(N^2)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        // Brute force check\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> res;\n        for (auto& iv : intervals) {\n            if (res.empty() || res.back()[1] < iv[0]) res.push_back(iv);\n            else res.back()[1] = max(res.back()[1], iv[1]);\n        }\n        return res;\n    }\n};"
        },
        "optimal": {
          "explanation": "Sort by start time in O(N log N). Single pass merge.",
          "timeComp": "O(N log N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> res;\n        for (auto& iv : intervals) {\n            if (res.empty() || res.back()[1] < iv[0]) res.push_back(iv);\n            else res.back()[1] = max(res.back()[1], iv[1]);\n        }\n        return res;\n    }\n};"
        },
        "id": "q_merge_intervals",
        "slug": "merge-intervals",
        "patternSlug": "overlapping-intervals",
        "subPatternSlug": "interval-merging-insertion",
        "patternId": "p_overlapping_intervals"
      },
      {
        "id": "q_insert_interval",
        "lcNum": "LC 57",
        "title": "Insert Interval",
        "slug": "insert-interval",
        "diff": "medium",
        "url": "https://leetcode.com/problems/insert-interval/",
        "patternId": "p_overlapping_intervals",
        "patternSlug": "overlapping-intervals",
        "subPatternId": "sp_int_merge",
        "subPatternSlug": "interval-merging-insertion",
        "statement": "Given sorted non-overlapping intervals and a `newInterval`, insert `newInterval` and merge any overlapping intervals.",
        "bruteForce": {
          "explanation": "Append `newInterval` to list, re-sort all intervals in O(N log N), then merge overlapping intervals.",
          "timeComp": "O(N log N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n        intervals.push_back(newInterval);\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> merged;\n        for (auto& interval : intervals) {\n            if (merged.empty() || merged.back()[1] < interval[0]) {\n                merged.push_back(interval);\n            } else {\n                merged.back()[1] = max(merged.back()[1], interval[1]);\n            }\n        }\n        return merged;\n    }\n};"
        },
        "optimal": {
          "explanation": "3-Phase linear pass: 1) Add intervals ending before newInterval starts. 2) Merge overlapping intervals. 3) Add remaining.",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n        vector<vector<int>> res;\n        int i = 0, n = intervals.size();\n\n        // 1. Add all intervals ending before newInterval starts\n        while (i < n && intervals[i][1] < newInterval[0]) {\n            res.push_back(intervals[i++]);\n        }\n\n        // 2. Merge overlapping intervals\n        while (i < n && intervals[i][0] <= newInterval[1]) {\n            newInterval[0] = min(newInterval[0], intervals[i][0]);\n            newInterval[1] = max(newInterval[1], intervals[i][1]);\n            i++;\n        }\n        res.push_back(newInterval);\n\n        // 3. Add remaining intervals\n        while (i < n) {\n            res.push_back(intervals[i++]);\n        }\n        return res;\n    }\n};"
        }
      },
      {
        "id": "q_non_overlapping_intervals",
        "lcNum": "LC 435",
        "title": "Non-overlapping Intervals",
        "slug": "non-overlapping-intervals",
        "diff": "medium",
        "url": "https://leetcode.com/problems/non-overlapping-intervals/",
        "patternId": "p_overlapping_intervals",
        "patternSlug": "overlapping-intervals",
        "subPatternId": "sp_int_merge",
        "subPatternSlug": "interval-merging-insertion",
        "statement": "Given an array of intervals `intervals`, return minimum number of intervals to remove to make remaining intervals non-overlapping.",
        "bruteForce": {
          "explanation": "Recursively evaluate all sub-combinations of non-overlapping intervals in O(2^N).",
          "timeComp": "O(2^N)",
          "spaceComp": "O(N)",
          "cppCode": "// Recursive subset evaluation"
        },
        "optimal": {
          "explanation": "Greedy Interval Scheduling: Sort by end time. Always keep interval that finishes earliest to leave room for future intervals.",
          "timeComp": "O(N log N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        if (intervals.empty()) return 0;\n        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {\n            return a[1] < b[1]; // Sort by end time\n        });\n\n        int count = 0;\n        int prevEnd = intervals[0][1];\n\n        for (int i = 1; i < intervals.size(); i++) {\n            if (intervals[i][0] < prevEnd) {\n                count++; // Overlap detected, remove current interval\n            } else {\n                prevEnd = intervals[i][1];\n            }\n        }\n        return count;\n    }\n};"
        }
      }
    ],
    "slug": "overlapping-intervals",
    "displayOrder": 8
  },
  {
    "id": "p_fast_slow_pointers_linked_list",
    "name": "Fast & Slow Pointers (Linked List)",
    "cues": [
      "Linked List cycle detection",
      "Find middle of Linked List",
      "Floyd's Tortoise and Hare"
    ],
    "thinkAbout": "When detecting cycles or finding midpoints in singly linked lists without extra space.",
    "coreIdea": "Advance slow pointer by 1 step and fast pointer by 2 steps. If fast meets slow, cycle exists.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n};",
    "timeComplexity": "O(N) linear pass.",
    "spaceComplexity": "O(1) auxiliary space.",
    "pitfalls": [
      "Dereferencing null pointer when accessing fast->next->next."
    ],
    "subPatterns": [
      {
        "id": "sp_ll_cycle",
        "name": "Cycle Detection & Midpoint",
        "cues": [
          "Floyd's cycle detection",
          "Find midpoint"
        ],
        "thinkAbout": "When finding cycle entry point or linked list midpoint.",
        "coreIdea": "Slow moves 1 step, fast moves 2 steps. Midpoint is slow when fast reaches end.",
        "templateCode": "class Solution {\npublic:\n    ListNode* middleNode(ListNode* head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n        }\n        return slow;\n    }\n};",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "pitfalls": [
          "Odd vs even length list checks."
        ],
        "slug": "cycle-detection-midpoint",
        "patternSlug": "fast-slow-pointers-linked-list",
        "patternId": "p_fast_slow_pointers_linked_list"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 141",
        "title": "Linked List Cycle",
        "subPatternId": "sp_ll_cycle",
        "url": "https://leetcode.com/problems/linked-list-cycle/",
        "diff": "easy",
        "statement": "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.",
        "bruteForce": {
          "explanation": "Store visited nodes in hash set in O(N) space.",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        unordered_set<ListNode*> visited;\n        while (head) {\n            if (visited.count(head)) return true;\n            visited.insert(head);\n            head = head->next;\n        }\n        return false;\n    }\n};"
        },
        "optimal": {
          "explanation": "Floyd's Tortoise and Hare algorithm with fast and slow pointers.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n};"
        },
        "id": "q_linked_list_cycle",
        "slug": "linked-list-cycle",
        "patternSlug": "fast-slow-pointers-linked-list",
        "subPatternSlug": "cycle-detection-midpoint",
        "patternId": "p_fast_slow_pointers_linked_list"
      },
      {
        "id": "q_linked_list_cycle_ii",
        "lcNum": "LC 142",
        "title": "Linked List Cycle II",
        "slug": "linked-list-cycle-ii",
        "diff": "medium",
        "url": "https://leetcode.com/problems/linked-list-cycle-ii/",
        "patternId": "p_fast_slow_pointers_linked_list",
        "patternSlug": "fast-slow-pointers-linked-list",
        "subPatternId": "sp_ll_cycle",
        "subPatternSlug": "cycle-detection-midpoint",
        "statement": "Given head of a linked list, return node where cycle begins. If no cycle exists, return `null`.",
        "bruteForce": {
          "explanation": "Store visited node pointers in unordered_set. First repeated node is cycle entry point.",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    ListNode *detectCycle(ListNode *head) {\n        unordered_set<ListNode*> visited;\n        ListNode *curr = head;\n        while (curr) {\n            if (visited.count(curr)) return curr;\n            visited.insert(curr);\n            curr = curr->next;\n        }\n        return nullptr;\n    }\n};"
        },
        "optimal": {
          "explanation": "Floyd's Cycle Finding: Detect collision via fast/slow. Reset entry pointer to head; move entry & slow 1 step at a time.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    ListNode *detectCycle(ListNode *head) {\n        if (!head || !head->next) return nullptr;\n        ListNode *slow = head, *fast = head;\n\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n            if (slow == fast) {\n                ListNode *entry = head;\n                while (entry != slow) {\n                    entry = entry->next;\n                    slow = slow->next;\n                }\n                return entry;\n            }\n        }\n        return nullptr;\n    }\n};"
        }
      },
      {
        "id": "q_reorder_list",
        "lcNum": "LC 143",
        "title": "Reorder List",
        "slug": "reorder-list",
        "diff": "medium",
        "url": "https://leetcode.com/problems/reorder-list/",
        "patternId": "p_fast_slow_pointers_linked_list",
        "patternSlug": "fast-slow-pointers-linked-list",
        "subPatternId": "sp_ll_cycle",
        "subPatternSlug": "cycle-detection-midpoint",
        "statement": "Reorder list to `L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2...` in-place without modifying node values.",
        "bruteForce": {
          "explanation": "Store node pointers in vector, then construct reordered links using two pointers on vector.",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    void reorderList(ListNode* head) {\n        if (!head) return;\n        vector<ListNode*> nodes;\n        ListNode* curr = head;\n        while (curr) { nodes.push_back(curr); curr = curr->next; }\n        int l = 0, r = nodes.size() - 1;\n        while (l < r) {\n            nodes[l]->next = nodes[r];\n            l++;\n            if (l == r) break;\n            nodes[r]->next = nodes[l];\n            r--;\n        }\n        nodes[l]->next = nullptr;\n    }\n};"
        },
        "optimal": {
          "explanation": "3 Steps: 1) Find middle via fast/slow pointers. 2) Reverse second half. 3) Merge two halves alternately.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    void reorderList(ListNode* head) {\n        if (!head || !head->next) return;\n\n        // 1. Find Midpoint\n        ListNode *slow = head, *fast = head;\n        while (fast->next && fast->next->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n        }\n\n        // 2. Reverse Second Half\n        ListNode *prev = nullptr, *curr = slow->next, *next = nullptr;\n        slow->next = nullptr; // Split lists\n        while (curr) {\n            next = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = next;\n        }\n\n        // 3. Merge Alternate Nodes\n        ListNode *p1 = head, *p2 = prev;\n        while (p2) {\n            ListNode *t1 = p1->next, *t2 = p2->next;\n            p1->next = p2;\n            p2->next = t1;\n            p1 = t1;\n            p2 = t2;\n        }\n    }\n};"
        }
      }
    ],
    "slug": "fast-slow-pointers-linked-list",
    "displayOrder": 9
  },
  {
    "id": "p_monotonic_stack",
    "name": "Monotonic Stack",
    "cues": [
      "Next Greater Element",
      "Next Smaller Element",
      "Daily temperatures / Days to wait",
      "Histogram largest rectangle / Max area",
      "Monotonically increasing/decreasing order"
    ],
    "thinkAbout": "When needing to find nearest larger or smaller element for every index in linear time.",
    "coreIdea": "Maintain stack of indices kept strictly monotonic. When new element breaks monotonicity, pop top — current element is Next Greater/Smaller!",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temp) {\n        int n = temp.size();\n        vector<int> res(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temp[st.top()] < temp[i]) {\n                int idx = st.top(); st.pop();\n                res[idx] = i - idx;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};",
    "timeComplexity": "O(N) each element pushed and popped at most once.",
    "spaceComplexity": "O(N) for stack.",
    "pitfalls": [
      "Storing values on stack instead of indices."
    ],
    "subPatterns": [
      {
        "id": "sp_ms_basic",
        "name": "Basic Stack Matching",
        "cues": [
          "LIFO matching",
          "Valid Parentheses"
        ],
        "thinkAbout": "When matching symbol pairs in reverse order of arrival.",
        "coreIdea": "Push opening symbols. Pop and check on closing symbols.",
        "templateCode": "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;\n            }\n        }\n        return st.empty();\n    }\n};",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "pitfalls": [
          "Not checking st.empty() before st.top()."
        ],
        "slug": "basic-stack-matching",
        "patternSlug": "monotonic-stack",
        "patternId": "p_monotonic_stack"
      },
      {
        "id": "sp_ms_next_greater",
        "name": "Next Greater / Smaller Element",
        "cues": [
          "Next Greater Element",
          "Daily temperatures"
        ],
        "thinkAbout": "When finding distance to nearest greater/smaller element for every index.",
        "coreIdea": "Stack indices in monotonic order. Pop when current element breaks order.",
        "templateCode": "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temp) {\n        int n = temp.size();\n        vector<int> res(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temp[st.top()] < temp[i]) {\n                int idx = st.top(); st.pop();\n                res[idx] = i - idx;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "pitfalls": [
          "Pushing values instead of indices."
        ],
        "slug": "next-greater-smaller-element",
        "patternSlug": "monotonic-stack",
        "patternId": "p_monotonic_stack"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 20",
        "title": "Valid Parentheses",
        "subPatternId": "sp_ms_basic",
        "url": "https://leetcode.com/problems/valid-parentheses/",
        "diff": "easy",
        "statement": "Given string `s` containing brackets, determine if input string is valid.",
        "bruteForce": {
          "explanation": "Repeatedly replace matching pairs in string in O(N^2).",
          "timeComp": "O(N^2)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    bool isValid(string s) {\n        int len;\n        do {\n            len = s.length();\n            int pos;\n            if ((pos = s.find(\"()\")) != string::npos) s.erase(pos, 2);\n            else if ((pos = s.find(\"[]\")) != string::npos) s.erase(pos, 2);\n            else if ((pos = s.find(\"{}\")) != string::npos) s.erase(pos, 2);\n        } while (s.length() < len);\n        return s.empty();\n    }\n};"
        },
        "optimal": {
          "explanation": "Push opening brackets. Pop matching bracket on closing in O(N).",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;\n            }\n        }\n        return st.empty();\n    }\n};"
        },
        "id": "q_valid_parentheses",
        "slug": "valid-parentheses",
        "patternSlug": "monotonic-stack",
        "subPatternSlug": "basic-stack-matching",
        "patternId": "p_monotonic_stack"
      },
      {
        "lcNum": "LC 739",
        "title": "Daily Temperatures",
        "subPatternId": "sp_ms_next_greater",
        "url": "https://leetcode.com/problems/daily-temperatures/",
        "diff": "medium",
        "statement": "Return array `answer` such that `answer[i]` is number of days to wait for warmer temp.",
        "bruteForce": {
          "explanation": "Nested loops for each day in O(N^2).",
          "timeComp": "O(N^2)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temp) {\n        int n = temp.size();\n        vector<int> res(n, 0);\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                if (temp[j] > temp[i]) { res[i] = j - i; break; }\n            }\n        }\n        return res;\n    }\n};"
        },
        "optimal": {
          "explanation": "Monotonic stack storing indices. Pop elements when current temp is higher in O(N).",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temp) {\n        int n = temp.size();\n        vector<int> res(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temp[st.top()] < temp[i]) {\n                int idx = st.top(); st.pop();\n                res[idx] = i - idx;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};"
        },
        "id": "q_daily_temperatures",
        "slug": "daily-temperatures",
        "patternSlug": "monotonic-stack",
        "subPatternSlug": "next-greater-smaller-element",
        "patternId": "p_monotonic_stack"
      }
    ],
    "slug": "monotonic-stack",
    "displayOrder": 10
  },
  {
    "id": "p_heap_priority_queue",
    "name": "Heap / Priority Queue",
    "cues": [
      "Top K elements",
      "Kth largest / smallest",
      "Merge K sorted lists",
      "Stream median / Two heaps"
    ],
    "thinkAbout": "When needing dynamic minimum or maximum elements from a stream or array without full sorting.",
    "coreIdea": "Use max-heap or min-heap (`std::priority_queue`). Maintain heap size K for Top K problems.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> minHeap;\n        for (int x : nums) {\n            minHeap.push(x);\n            if (minHeap.size() > k) minHeap.pop();\n        }\n        return minHeap.top();\n    }\n};",
    "timeComplexity": "O(N log K) for Top K elements.",
    "spaceComplexity": "O(K) for priority queue size.",
    "pitfalls": [
      "Using Max-Heap for Top K Largest (uses O(N log N) space instead of O(K) min-heap)."
    ],
    "subPatterns": [
      {
        "id": "sp_heap_topk",
        "name": "Top K Elements / Min-Heap Pattern",
        "cues": [
          "Kth largest element",
          "Top K frequent elements"
        ],
        "thinkAbout": "When finding Top K largest, keep a Min-Heap of size K. Discard smallest elements.",
        "coreIdea": "Push into Min-Heap. If size > K, pop. Top of heap is Kth largest.",
        "templateCode": "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> pq;\n        for (int x : nums) {\n            pq.push(x);\n            if (pq.size() > k) pq.pop();\n        }\n        return pq.top();\n    }\n};",
        "timeComplexity": "O(N log K)",
        "spaceComplexity": "O(K)",
        "pitfalls": [
          "Using max-heap instead of min-heap."
        ],
        "slug": "top-k-elements-min-heap-pattern",
        "patternSlug": "heap-priority-queue",
        "patternId": "p_heap_priority_queue"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 215",
        "title": "Kth Largest Element in an Array",
        "subPatternId": "sp_heap_topk",
        "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        "diff": "medium",
        "statement": "Given an integer array `nums` and an integer `k`, return the `k-th` largest element in the array.",
        "bruteForce": {
          "explanation": "Sort array descending and return nums[k-1] in O(N log N).",
          "timeComp": "O(N log N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        sort(nums.rbegin(), nums.rend());\n        return nums[k-1];\n    }\n};"
        },
        "optimal": {
          "explanation": "Maintain Min-Heap of size K. Push elements and pop when size > K. Top is result.",
          "timeComp": "O(N log K)",
          "spaceComp": "O(K)",
          "cppCode": "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> pq;\n        for (int x : nums) {\n            pq.push(x);\n            if (pq.size() > k) pq.pop();\n        }\n        return pq.top();\n    }\n};"
        },
        "id": "q_kth_largest_element_in_an_array",
        "slug": "kth-largest-element-in-an-array",
        "patternSlug": "heap-priority-queue",
        "subPatternSlug": "top-k-elements-min-heap-pattern",
        "patternId": "p_heap_priority_queue"
      }
    ],
    "slug": "heap-priority-queue",
    "displayOrder": 11
  },
  {
    "id": "p_tree_dfs_depth_first_search",
    "name": "Tree DFS / Depth First Search",
    "cues": [
      "Tree traversal",
      "Maximum depth / Height of Binary Tree",
      "Path sum",
      "Lowest Common Ancestor"
    ],
    "thinkAbout": "When problem explores tree paths from root to leaves or computes property recursively.",
    "coreIdea": "Recursively process left and right subtrees. Base case: root == nullptr return 0/default.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};",
    "timeComplexity": "O(N) visits each node once.",
    "spaceComplexity": "O(H) recursion stack height.",
    "pitfalls": [
      "Forgetting base case root == nullptr."
    ],
    "subPatterns": [
      {
        "id": "sp_tree_dfs_height",
        "name": "Tree Height & Depth Recursion",
        "cues": [
          "Max depth",
          "Balanced tree check"
        ],
        "thinkAbout": "When calculating tree height or bottom-up property.",
        "coreIdea": "Base case 0. Recursively calculate left and right heights.",
        "templateCode": "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(H)",
        "pitfalls": [
          "Stack overflow on skewed tree."
        ],
        "slug": "tree-height-depth-recursion",
        "patternSlug": "tree-dfs-depth-first-search",
        "patternId": "p_tree_dfs_depth_first_search"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 104",
        "title": "Maximum Depth of Binary Tree",
        "subPatternId": "sp_tree_dfs_height",
        "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        "diff": "easy",
        "statement": "Given `root` of binary tree, return its maximum depth.",
        "bruteForce": {
          "explanation": "Recursive traversal calculating path lengths.",
          "timeComp": "O(N)",
          "spaceComp": "O(H)",
          "cppCode": "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};"
        },
        "optimal": {
          "explanation": "Standard DFS post-order traversal.",
          "timeComp": "O(N)",
          "spaceComp": "O(H)",
          "cppCode": "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};"
        },
        "id": "q_maximum_depth_of_binary_tree",
        "slug": "maximum-depth-of-binary-tree",
        "patternSlug": "tree-dfs-depth-first-search",
        "subPatternSlug": "tree-height-depth-recursion",
        "patternId": "p_tree_dfs_depth_first_search"
      }
    ],
    "slug": "tree-dfs-depth-first-search",
    "displayOrder": 12
  },
  {
    "id": "p_tree_bfs_level_order_traversal",
    "name": "Tree BFS / Level Order Traversal",
    "cues": [
      "Level order traversal",
      "Level by level processing",
      "Zigzag traversal",
      "Populate next right pointers"
    ],
    "thinkAbout": "When problem processes tree nodes level by level or asks for shortest distance from root.",
    "coreIdea": "Use FIFO queue (`std::queue<TreeNode*>`). Process all nodes in queue at current level count.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        if (!root) return {};\n        vector<vector<int>> res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> level;\n            for (int i = 0; i < sz; i++) {\n                TreeNode* curr = q.front(); q.pop();\n                level.push_back(curr->val);\n                if (curr->left) q.push(curr->left);\n                if (curr->right) q.push(curr->right);\n            }\n            res.push_back(level);\n        }\n        return res;\n    }\n};",
    "timeComplexity": "O(N) visits each node once.",
    "spaceComplexity": "O(W) max tree width in queue.",
    "pitfalls": [
      "Not capturing q.size() in fixed variable before inner loop."
    ],
    "subPatterns": [
      {
        "id": "sp_tree_bfs_level",
        "name": "Standard Level Order Traversal",
        "cues": [
          "Level order",
          "Queue BFS"
        ],
        "thinkAbout": "When grouping nodes level by level.",
        "coreIdea": "Push root. Loop while queue non-empty. Capture level size and pop nodes.",
        "templateCode": "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        if (!root) return {};\n        vector<vector<int>> res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> lvl;\n            for (int i = 0; i < sz; i++) {\n                TreeNode* curr = q.front(); q.pop();\n                lvl.push_back(curr->val);\n                if (curr->left) q.push(curr->left);\n                if (curr->right) q.push(curr->right);\n            }\n            res.push_back(lvl);\n        }\n        return res;\n    }\n};",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(W)",
        "pitfalls": [
          "Using dynamically growing q.size() in loop condition."
        ],
        "slug": "standard-level-order-traversal",
        "patternSlug": "tree-bfs-level-order-traversal",
        "patternId": "p_tree_bfs_level_order_traversal"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 102",
        "title": "Binary Tree Level Order Traversal",
        "subPatternId": "sp_tree_bfs_level",
        "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        "diff": "medium",
        "statement": "Given `root` of binary tree, return level order traversal of its nodes' values.",
        "bruteForce": {
          "explanation": "Recursive DFS carrying level depth parameter in O(N).",
          "timeComp": "O(N)",
          "spaceComp": "O(H)",
          "cppCode": "class Solution {\npublic:\n    void dfs(TreeNode* root, int lvl, vector<vector<int>>& res) {\n        if (!root) return;\n        if (lvl == res.size()) res.push_back({});\n        res[lvl].push_back(root->val);\n        dfs(root->left, lvl + 1, res);\n        dfs(root->right, lvl + 1, res);\n    }\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        vector<vector<int>> res;\n        dfs(root, 0, res);\n        return res;\n    }\n};"
        },
        "optimal": {
          "explanation": "Queue-based iterative BFS traversal level by level in O(N).",
          "timeComp": "O(N)",
          "spaceComp": "O(W)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        if (!root) return {};\n        vector<vector<int>> res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> lvl;\n            for (int i = 0; i < sz; i++) {\n                TreeNode* curr = q.front(); q.pop();\n                lvl.push_back(curr->val);\n                if (curr->left) q.push(curr->left);\n                if (curr->right) q.push(curr->right);\n            }\n            res.push_back(lvl);\n        }\n        return res;\n    }\n};"
        },
        "id": "q_binary_tree_level_order_traversal",
        "slug": "binary-tree-level-order-traversal",
        "patternSlug": "tree-bfs-level-order-traversal",
        "subPatternSlug": "standard-level-order-traversal",
        "patternId": "p_tree_bfs_level_order_traversal"
      }
    ],
    "slug": "tree-bfs-level-order-traversal",
    "displayOrder": 13
  },
  {
    "id": "p_binary_search_tree_bst",
    "name": "Binary Search Tree (BST)",
    "cues": [
      "Left < Root < Right invariant",
      "Validate BST",
      "Inorder traversal gives sorted order",
      "Search/Insert in BST"
    ],
    "thinkAbout": "When operating on Binary Search Tree where Left subtree < Root < Right subtree.",
    "coreIdea": "Leverage BST ordering property. Inorder traversal yields strictly ascending sorted array.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    bool validate(TreeNode* root, long long minVal, long long maxVal) {\n        if (!root) return true;\n        if (root->val <= minVal || root->val >= maxVal) return false;\n        return validate(root->left, minVal, root->val) && validate(root->right, root->val, maxVal);\n    }\n    bool isValidBST(TreeNode* root) {\n        return validate(root, LONG_MIN, LONG_MAX);\n    }\n};",
    "timeComplexity": "O(N) validation, O(H) search.",
    "spaceComplexity": "O(H) recursion stack.",
    "pitfalls": [
      "Only checking root->left->val < root->val instead of entire left subtree."
    ],
    "subPatterns": [
      {
        "id": "sp_bst_validate",
        "name": "BST Validation & Inorder Property",
        "cues": [
          "Validate BST",
          "Inorder traversal"
        ],
        "thinkAbout": "When verifying if tree satisfies BST properties.",
        "coreIdea": "Pass min and max bounds recursively, or check if inorder traversal is strictly increasing.",
        "templateCode": "class Solution {\npublic:\n    bool validate(TreeNode* root, long long minVal, long long maxVal) {\n        if (!root) return true;\n        if (root->val <= minVal || root->val >= maxVal) return false;\n        return validate(root->left, minVal, root->val) && validate(root->right, root->val, maxVal);\n    }\n    bool isValidBST(TreeNode* root) {\n        return validate(root, LONG_MIN, LONG_MAX);\n    }\n};",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(H)",
        "pitfalls": [
          "Using INT_MIN/INT_MAX bounds causing equality failure on boundary nodes."
        ],
        "slug": "bst-validation-inorder-property",
        "patternSlug": "binary-search-tree-bst",
        "patternId": "p_binary_search_tree_bst"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 98",
        "title": "Validate Binary Search Tree",
        "subPatternId": "sp_bst_validate",
        "url": "https://leetcode.com/problems/validate-binary-search-tree/",
        "diff": "medium",
        "statement": "Given `root` of binary tree, determine if it is a valid binary search tree.",
        "bruteForce": {
          "explanation": "Store inorder traversal in array and check if strictly sorted in O(N).",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    void inorder(TreeNode* root, vector<int>& vals) {\n        if (!root) return;\n        inorder(root->left, vals);\n        vals.push_back(root->val);\n        inorder(root->right, vals);\n    }\n    bool isValidBST(TreeNode* root) {\n        vector<int> vals;\n        inorder(root, vals);\n        for (int i = 1; i < vals.size(); i++) if (vals[i] <= vals[i-1]) return false;\n        return true;\n    }\n};"
        },
        "optimal": {
          "explanation": "Recursive range checking passing min/max bounds in O(N) time and O(H) space.",
          "timeComp": "O(N)",
          "spaceComp": "O(H)",
          "cppCode": "class Solution {\npublic:\n    bool validate(TreeNode* root, long long minV, long long maxV) {\n        if (!root) return true;\n        if (root->val <= minV || root->val >= maxV) return false;\n        return validate(root->left, minV, root->val) && validate(root->right, root->val, maxV);\n    }\n    bool isValidBST(TreeNode* root) {\n        return validate(root, LONG_MIN, LONG_MAX);\n    }\n};"
        },
        "id": "q_validate_binary_search_tree",
        "slug": "validate-binary-search-tree",
        "patternSlug": "binary-search-tree-bst",
        "subPatternSlug": "bst-validation-inorder-property",
        "patternId": "p_binary_search_tree_bst"
      }
    ],
    "slug": "binary-search-tree-bst",
    "displayOrder": 14
  },
  {
    "id": "p_backtracking_subsets_permutations",
    "name": "Backtracking / Subsets & Permutations",
    "cues": [
      "Generate all subsets",
      "Permutations / Combinations",
      "N-Queens / Sudoku Solver",
      "Decision tree traversal with undo"
    ],
    "thinkAbout": "When generating all combinatorial arrangements or exploring decision paths with undo step.",
    "coreIdea": "Choose, Recurse, Un-choose (Backtrack). Push element, recurse to next state, pop element.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    void backtrack(int start, vector<int>& nums, vector<int>& curr, vector<vector<int>>& res) {\n        res.push_back(curr);\n        for (int i = start; i < nums.size(); i++) {\n            curr.push_back(nums[i]);\n            backtrack(i + 1, nums, curr, res);\n            curr.pop_back(); // Backtrack undo\n        }\n    }\n    vector<vector<int>> subsets(vector<int>& nums) {\n        vector<vector<int>> res;\n        vector<int> curr;\n        backtrack(0, nums, curr, res);\n        return res;\n    }\n};",
    "timeComplexity": "O(2^N) for subsets, O(N!) for permutations.",
    "spaceComplexity": "O(N) recursion depth.",
    "pitfalls": [
      "Forgetting pop_back() undo step."
    ],
    "subPatterns": [
      {
        "id": "sp_bt_subsets",
        "name": "Subsets & Combination Choice",
        "cues": [
          "Generate subsets",
          "Combinations"
        ],
        "thinkAbout": "When choosing include/exclude for every element.",
        "coreIdea": "Recurse from start index. Push element, backtrack, pop element.",
        "templateCode": "class Solution {\npublic:\n    void backtrack(int start, vector<int>& nums, vector<int>& curr, vector<vector<int>>& res) {\n        res.push_back(curr);\n        for (int i = start; i < nums.size(); i++) {\n            curr.push_back(nums[i]);\n            backtrack(i + 1, nums, curr, res);\n            curr.pop_back();\n        }\n    }\n    vector<vector<int>> subsets(vector<int>& nums) {\n        vector<vector<int>> res;\n        vector<int> curr;\n        backtrack(0, nums, curr, res);\n        return res;\n    }\n};",
        "timeComplexity": "O(2^N)",
        "spaceComplexity": "O(N)",
        "pitfalls": [
          "Not handling duplicate elements in array."
        ],
        "slug": "subsets-combination-choice",
        "patternSlug": "backtracking-subsets-permutations",
        "patternId": "p_backtracking_subsets_permutations"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 78",
        "title": "Subsets",
        "subPatternId": "sp_bt_subsets",
        "url": "https://leetcode.com/problems/subsets/",
        "diff": "medium",
        "statement": "Given integer array `nums` of unique elements, return all possible subsets.",
        "bruteForce": {
          "explanation": "Bit manipulation generating all 2^N binary masks.",
          "timeComp": "O(N * 2^N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        int n = nums.size();\n        vector<vector<int>> res;\n        for (int mask = 0; mask < (1 << n); mask++) {\n            vector<int> sub;\n            for (int i = 0; i < n; i++) {\n                if (mask & (1 << i)) sub.push_back(nums[i]);\n            }\n            res.push_back(sub);\n        }\n        return res;\n    }\n};"
        },
        "optimal": {
          "explanation": "Backtracking recursion tree. Push element, recurse, pop element.",
          "timeComp": "O(2^N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    void backtrack(int start, vector<int>& nums, vector<int>& curr, vector<vector<int>>& res) {\n        res.push_back(curr);\n        for (int i = start; i < nums.size(); i++) {\n            curr.push_back(nums[i]);\n            backtrack(i + 1, nums, curr, res);\n            curr.pop_back();\n        }\n    }\n    vector<vector<int>> subsets(vector<int>& nums) {\n        vector<vector<int>> res;\n        vector<int> curr;\n        backtrack(0, nums, curr, res);\n        return res;\n    }\n};"
        },
        "id": "q_subsets",
        "slug": "subsets",
        "patternSlug": "backtracking-subsets-permutations",
        "subPatternSlug": "subsets-combination-choice",
        "patternId": "p_backtracking_subsets_permutations"
      }
    ],
    "slug": "backtracking-subsets-permutations",
    "displayOrder": 15
  },
  {
    "id": "p_graph_dfs_bfs",
    "name": "Graph DFS / BFS",
    "cues": [
      "Connected components",
      "Number of islands",
      "Shortest path in unweighted graph",
      "Flood fill / Matrix traversal"
    ],
    "thinkAbout": "When exploring node connections in graph or 2D grid matrix.",
    "coreIdea": "Maintain visited array/matrix. Use DFS recursion or BFS queue to visit connected neighbors.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    void dfs(vector<vector<char>>& grid, int r, int c) {\n        int m = grid.size(), n = grid[0].size();\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;\n        grid[r][c] = '0'; // Mark visited\n        dfs(grid, r + 1, c); dfs(grid, r - 1, c);\n        dfs(grid, r, c + 1); dfs(grid, r, c - 1);\n    }\n    int numIslands(vector<vector<char>>& grid) {\n        int count = 0;\n        for (int i = 0; i < grid.size(); i++) {\n            for (int j = 0; j < grid[0].size(); j++) {\n                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }\n            }\n        }\n        return count;\n    }\n};",
    "timeComplexity": "O(V + E) or O(M * N) grid traversal.",
    "spaceComplexity": "O(V) visited array / recursion depth.",
    "pitfalls": [
      "Infinite loops caused by not marking visited nodes."
    ],
    "subPatterns": [
      {
        "id": "sp_graph_grid_dfs",
        "name": "Grid Matrix Flood Fill DFS",
        "cues": [
          "Number of Islands",
          "Flood Fill"
        ],
        "thinkAbout": "When counting connected components in 2D matrix.",
        "coreIdea": "Check boundary bounds. Sink visited cells ('1' -> '0'). Recurse in 4 directions.",
        "templateCode": "class Solution {\npublic:\n    void dfs(vector<vector<char>>& grid, int r, int c) {\n        int m = grid.size(), n = grid[0].size();\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;\n        grid[r][c] = '0';\n        dfs(grid, r+1, c); dfs(grid, r-1, c);\n        dfs(grid, r, c+1); dfs(grid, r, c-1);\n    }\n    int numIslands(vector<vector<char>>& grid) {\n        int count = 0;\n        for (int i = 0; i < grid.size(); i++) {\n            for (int j = 0; j < grid[0].size(); j++) {\n                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }\n            }\n        }\n        return count;\n    }\n};",
        "timeComplexity": "O(M * N)",
        "spaceComplexity": "O(M * N) worst case recursion.",
        "pitfalls": [
          "Out of bounds access before base check."
        ],
        "slug": "grid-matrix-flood-fill-dfs",
        "patternSlug": "graph-dfs-bfs",
        "patternId": "p_graph_dfs_bfs"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 200",
        "title": "Number of Islands",
        "subPatternId": "sp_graph_grid_dfs",
        "url": "https://leetcode.com/problems/number-of-islands/",
        "diff": "medium",
        "statement": "Given `m x n` 2D binary grid `grid`, return total number of islands.",
        "bruteForce": {
          "explanation": "BFS/DFS using separate visited 2D boolean array.",
          "timeComp": "O(M * N)",
          "spaceComp": "O(M * N)",
          "cppCode": "class Solution {\npublic:\n    void dfs(vector<vector<char>>& grid, int r, int c, vector<vector<bool>>& vis) {\n        int m = grid.size(), n = grid[0].size();\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] == '0' || vis[r][c]) return;\n        vis[r][c] = true;\n        dfs(grid, r+1, c, vis); dfs(grid, r-1, c, vis);\n        dfs(grid, r, c+1, vis); dfs(grid, r, c-1, vis);\n    }\n    int numIslands(vector<vector<char>>& grid) {\n        int m = grid.size(), n = grid[0].size(), count = 0;\n        vector<vector<bool>> vis(m, vector<bool>(n, false));\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (grid[i][j] == '1' && !vis[i][j]) { count++; dfs(grid, i, j, vis); }\n            }\n        }\n        return count;\n    }\n};"
        },
        "optimal": {
          "explanation": "In-place grid sinking ('1' -> '0') via DFS traversal.",
          "timeComp": "O(M * N)",
          "spaceComp": "O(M * N)",
          "cppCode": "class Solution {\npublic:\n    void dfs(vector<vector<char>>& grid, int r, int c) {\n        int m = grid.size(), n = grid[0].size();\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;\n        grid[r][c] = '0';\n        dfs(grid, r+1, c); dfs(grid, r-1, c);\n        dfs(grid, r, c+1); dfs(grid, r, c-1);\n    }\n    int numIslands(vector<vector<char>>& grid) {\n        int count = 0;\n        for (int i = 0; i < grid.size(); i++) {\n            for (int j = 0; j < grid[0].size(); j++) {\n                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }\n            }\n        }\n        return count;\n    }\n};"
        },
        "id": "q_number_of_islands",
        "slug": "number-of-islands",
        "patternSlug": "graph-dfs-bfs",
        "subPatternSlug": "grid-matrix-flood-fill-dfs",
        "patternId": "p_graph_dfs_bfs"
      }
    ],
    "slug": "graph-dfs-bfs",
    "displayOrder": 16
  },
  {
    "id": "p_topological_sort_kahn_s_algorithm",
    "name": "Topological Sort (Kahn's Algorithm)",
    "cues": [
      "Prerequisites / Course Schedule",
      "Directed Acyclic Graph (DAG)",
      "In-degree array",
      "Order of execution"
    ],
    "thinkAbout": "When ordering tasks with prerequisite dependency constraints.",
    "coreIdea": "Build adjacency list and in-degree array. Push nodes with in-degree == 0 into queue. Decrement in-degree of neighbors.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> inDegree(numCourses, 0);\n        for (auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            inDegree[p[0]]++;\n        }\n        queue<int> q;\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);\n        int visited = 0;\n        while (!q.empty()) {\n            int u = q.front(); q.pop();\n            visited++;\n            for (int v : adj[u]) {\n                if (--inDegree[v] == 0) q.push(v);\n            }\n        }\n        return visited == numCourses;\n    }\n};",
    "timeComplexity": "O(V + E) time.",
    "spaceComplexity": "O(V + E) space.",
    "pitfalls": [
      "Reversing direction of directed edge in adjacency list."
    ],
    "subPatterns": [
      {
        "id": "sp_topo_kahns",
        "name": "Kahn's BFS In-degree Algorithm",
        "cues": [
          "Course schedule",
          "Prerequisite order"
        ],
        "thinkAbout": "When checking cycle or ordering nodes with dependencies.",
        "coreIdea": "Queue in-degree 0 nodes. Decrement neighbor degrees upon processing.",
        "templateCode": "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> inDegree(numCourses, 0);\n        for (auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            inDegree[p[0]]++;\n        }\n        queue<int> q;\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);\n        int visited = 0;\n        while (!q.empty()) {\n            int u = q.front(); q.pop(); visited++;\n            for (int v : adj[u]) if (--inDegree[v] == 0) q.push(v);\n        }\n        return visited == numCourses;\n    }\n};",
        "timeComplexity": "O(V + E)",
        "spaceComplexity": "O(V + E)",
        "pitfalls": [
          "Not checking visited == numCourses for cycle detection."
        ],
        "slug": "kahn-s-bfs-in-degree-algorithm",
        "patternSlug": "topological-sort-kahn-s-algorithm",
        "patternId": "p_topological_sort_kahn_s_algorithm"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 207",
        "title": "Course Schedule",
        "subPatternId": "sp_topo_kahns",
        "url": "https://leetcode.com/problems/course-schedule/",
        "diff": "medium",
        "statement": "Given total `numCourses` and prerequisites, return `true` if you can finish all courses.",
        "bruteForce": {
          "explanation": "DFS cycle detection with 3-state visited array (0=unvisited, 1=visiting, 2=visited).",
          "timeComp": "O(V + E)",
          "spaceComp": "O(V + E)",
          "cppCode": "class Solution {\npublic:\n    bool dfs(int u, vector<vector<int>>& adj, vector<int>& vis) {\n        vis[u] = 1;\n        for (int v : adj[u]) {\n            if (vis[v] == 1) return true; // Cycle\n            if (vis[v] == 0 && dfs(v, adj, vis)) return true;\n        }\n        vis[u] = 2;\n        return false;\n    }\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        for (auto& p : prerequisites) adj[p[1]].push_back(p[0]);\n        vector<int> vis(numCourses, 0);\n        for (int i = 0; i < numCourses; i++) {\n            if (vis[i] == 0 && dfs(i, adj, vis)) return false;\n        }\n        return true;\n    }\n};"
        },
        "optimal": {
          "explanation": "Kahn's BFS In-degree algorithm. Process in-degree 0 nodes.",
          "timeComp": "O(V + E)",
          "spaceComp": "O(V + E)",
          "cppCode": "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> inDegree(numCourses, 0);\n        for (auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            inDegree[p[0]]++;\n        }\n        queue<int> q;\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);\n        int visited = 0;\n        while (!q.empty()) {\n            int u = q.front(); q.pop(); visited++;\n            for (int v : adj[u]) if (--inDegree[v] == 0) q.push(v);\n        }\n        return visited == numCourses;\n    }\n};"
        },
        "id": "q_course_schedule",
        "slug": "course-schedule",
        "patternSlug": "topological-sort-kahn-s-algorithm",
        "subPatternSlug": "kahn-s-bfs-in-degree-algorithm",
        "patternId": "p_topological_sort_kahn_s_algorithm"
      }
    ],
    "slug": "topological-sort-kahn-s-algorithm",
    "displayOrder": 17
  },
  {
    "id": "p_disjoint_set_union_dsu_union_find",
    "name": "Disjoint Set Union (DSU / Union-Find)",
    "cues": [
      "Dynamic connectivity",
      "Redundant connection",
      "Kruskal's MST",
      "Connected components merging"
    ],
    "thinkAbout": "When checking if elements belong to same connected component or dynamically merging components.",
    "coreIdea": "Maintain parent vector. Implement find() with path compression and union() by rank.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class DSU {\n    vector<int> parent, rank;\npublic:\n    DSU(int n) {\n        parent.resize(n); iota(parent.begin(), parent.end(), 0);\n        rank.assign(n, 0);\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]); // Path compression\n    }\n    bool unite(int i, int j) {\n        int rootI = find(i), rootJ = find(j);\n        if (rootI != rootJ) {\n            if (rank[rootI] < rank[rootJ]) swap(rootI, rootJ);\n            parent[rootJ] = rootI;\n            if (rank[rootI] == rank[rootJ]) rank[rootI]++;\n            return true;\n        }\n        return false; // Cycle detected\n    }\n};",
    "timeComplexity": "O(alpha(N)) nearly O(1) amortized.",
    "spaceComplexity": "O(N) parent array.",
    "pitfalls": [
      "Forgetting path compression `parent[i] = find(parent[i])`."
    ],
    "subPatterns": [
      {
        "id": "sp_dsu_basic",
        "name": "DSU Path Compression & Union by Rank",
        "cues": [
          "Redundant Connection",
          "Union Find"
        ],
        "thinkAbout": "When detecting cycles in undirected graph or merging components.",
        "coreIdea": "Implement find with path compression and unite returning false on cycle.",
        "templateCode": "class DSU {\n    vector<int> parent;\npublic:\n    DSU(int n) {\n        parent.resize(n);\n        iota(parent.begin(), parent.end(), 0);\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]);\n    }\n    bool unite(int i, int j) {\n        int rI = find(i), rJ = find(j);\n        if (rI == rJ) return false;\n        parent[rI] = rJ;\n        return true;\n    }\n};",
        "timeComplexity": "O(alpha(N))",
        "spaceComplexity": "O(N)",
        "pitfalls": [
          "Not initializing iota parent array."
        ],
        "slug": "dsu-path-compression-union-by-rank",
        "patternSlug": "disjoint-set-union-dsu-union-find",
        "patternId": "p_disjoint_set_union_dsu_union_find"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 684",
        "title": "Redundant Connection",
        "subPatternId": "sp_dsu_basic",
        "url": "https://leetcode.com/problems/redundant-connection/",
        "diff": "medium",
        "statement": "Given undirected graph starting as a tree with 1 extra edge, return that edge causing cycle.",
        "bruteForce": {
          "explanation": "DFS cycle search after adding each edge in O(N^2).",
          "timeComp": "O(N^2)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    bool dfs(int u, int target, vector<vector<int>>& adj, vector<bool>& vis) {\n        if (u == target) return true;\n        vis[u] = true;\n        for (int v : adj[u]) {\n            if (!vis[v] && dfs(v, target, adj, vis)) return true;\n        }\n        return false;\n    }\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\n        int n = edges.size();\n        vector<vector<int>> adj(n + 1);\n        for (auto& e : edges) {\n            vector<bool> vis(n + 1, false);\n            if (!adj[e[0]].empty() && !adj[e[1]].empty() && dfs(e[0], e[1], adj, vis)) return e;\n            adj[e[0]].push_back(e[1]);\n            adj[e[1]].push_back(e[0]);\n        }\n        return {};\n    }\n};"
        },
        "optimal": {
          "explanation": "Union-Find with path compression. Return first edge where unite(u, v) returns false.",
          "timeComp": "O(N alpha(N))",
          "spaceComp": "O(N)",
          "cppCode": "class DSU {\npublic:\n    vector<int> parent;\n    DSU(int n) { parent.resize(n+1); iota(parent.begin(), parent.end(), 0); }\n    int find(int i) { return parent[i] == i ? i : parent[i] = find(parent[i]); }\n    bool unite(int i, int j) {\n        int rI = find(i), rJ = find(j);\n        if (rI == rJ) return false;\n        parent[rI] = rJ;\n        return true;\n    }\n};\nclass Solution {\npublic:\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\n        DSU dsu(edges.size());\n        for (auto& e : edges) {\n            if (!dsu.unite(e[0], e[1])) return e;\n        }\n        return {};\n    }\n};"
        },
        "id": "q_redundant_connection",
        "slug": "redundant-connection",
        "patternSlug": "disjoint-set-union-dsu-union-find",
        "subPatternSlug": "dsu-path-compression-union-by-rank",
        "patternId": "p_disjoint_set_union_dsu_union_find"
      }
    ],
    "slug": "disjoint-set-union-dsu-union-find",
    "displayOrder": 18
  },
  {
    "id": "p_1d_dynamic_programming",
    "name": "1D Dynamic Programming",
    "cues": [
      "Climbing stairs",
      "House robber",
      "Longest Increasing Subsequence",
      "Optimal choices with overlapping subproblems"
    ],
    "thinkAbout": "When decision at state i depends on previous states dp[i-1], dp[i-2], etc.",
    "coreIdea": "Define state dp[i]. Establish transition relation (e.g., dp[i] = max(dp[i-1], dp[i-2] + val[i])).",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        if (nums.empty()) return 0;\n        int prev2 = 0, prev1 = 0;\n        for (int x : nums) {\n            int curr = max(prev1, prev2 + x);\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        return prev1;\n    }\n};",
    "timeComplexity": "O(N) linear iteration.",
    "spaceComplexity": "O(1) space optimization.",
    "pitfalls": [
      "Out of bounds when accessing base cases dp[0] or dp[1]."
    ],
    "subPatterns": [
      {
        "id": "sp_dp_1d_basic",
        "name": "State Transition & Space Optimization",
        "cues": [
          "House Robber",
          "Climbing Stairs"
        ],
        "thinkAbout": "When state depends on 2 preceding states.",
        "coreIdea": "Maintain prev1 and prev2 variables instead of full dp array.",
        "templateCode": "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        int prev2 = 0, prev1 = 0;\n        for (int x : nums) {\n            int curr = max(prev1, prev2 + x);\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        return prev1;\n    }\n};",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "pitfalls": [
          "Incorrect base case initialization."
        ],
        "slug": "state-transition-space-optimization",
        "patternSlug": "1d-dynamic-programming",
        "patternId": "p_1d_dynamic_programming"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 198",
        "title": "House Robber",
        "subPatternId": "sp_dp_1d_basic",
        "url": "https://leetcode.com/problems/house-robber/",
        "diff": "medium",
        "statement": "Determine maximum amount of money you can rob tonight without robbing adjacent houses.",
        "bruteForce": {
          "explanation": "Recursive decision tree explore rob / don't rob choices in O(2^N).",
          "timeComp": "O(2^N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    int solve(int idx, vector<int>& nums) {\n        if (idx >= nums.size()) return 0;\n        return max(solve(idx + 1, nums), nums[idx] + solve(idx + 2, nums));\n    }\n    int rob(vector<int>& nums) {\n        return solve(0, nums);\n    }\n};"
        },
        "optimal": {
          "explanation": "Dynamic programming with space optimization in O(N) time and O(1) space.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        int prev2 = 0, prev1 = 0;\n        for (int x : nums) {\n            int curr = max(prev1, prev2 + x);\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        return prev1;\n    }\n};"
        },
        "id": "q_house_robber",
        "slug": "house-robber",
        "patternSlug": "1d-dynamic-programming",
        "subPatternSlug": "state-transition-space-optimization",
        "patternId": "p_1d_dynamic_programming"
      }
    ],
    "slug": "1d-dynamic-programming",
    "displayOrder": 19
  },
  {
    "id": "p_knapsack_2d_dynamic_programming",
    "name": "Knapsack / 2D Dynamic Programming",
    "cues": [
      "0/1 Knapsack",
      "Coin Change / Unbounded Knapsack",
      "Target Sum",
      "Grid Minimum Path Sum"
    ],
    "thinkAbout": "When selecting items under capacity constraint or calculating optimal path on 2D grid.",
    "coreIdea": "State dp[i][w] = max value using first i items with capacity w. Transition: take or skip item.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) {\n                if (i - c >= 0) dp[i] = min(dp[i], 1 + dp[i - c]);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};",
    "timeComplexity": "O(N * Amount) or O(M * N).",
    "spaceComplexity": "O(Amount) space.",
    "pitfalls": [
      "Initializing DP array with 0 instead of infinity when finding minimum."
    ],
    "subPatterns": [
      {
        "id": "sp_dp_knapsack",
        "name": "Unbounded Knapsack / Coin Change",
        "cues": [
          "Coin Change",
          "Combination Sum IV"
        ],
        "thinkAbout": "When items can be reused infinitely to reach target sum.",
        "coreIdea": "Loop amount 1..Target. Iterate coins and transition dp[i] = min(dp[i], 1 + dp[i-coin]).",
        "templateCode": "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) {\n                if (i - c >= 0) dp[i] = min(dp[i], 1 + dp[i - c]);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};",
        "timeComplexity": "O(N * Amount)",
        "spaceComplexity": "O(Amount)",
        "pitfalls": [
          "Integer overflow when adding 1 to infinity."
        ],
        "slug": "unbounded-knapsack-coin-change",
        "patternSlug": "knapsack-2d-dynamic-programming",
        "patternId": "p_knapsack_2d_dynamic_programming"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 322",
        "title": "Coin Change",
        "subPatternId": "sp_dp_knapsack",
        "url": "https://leetcode.com/problems/coin-change/",
        "diff": "medium",
        "statement": "Return fewest number of coins needed to make up amount, or `-1` if impossible.",
        "bruteForce": {
          "explanation": "Recursive recursion tree testing all coin combinations in O(S^N).",
          "timeComp": "O(S^N)",
          "spaceComp": "O(Amount)",
          "cppCode": "class Solution {\npublic:\n    int solve(vector<int>& coins, int rem) {\n        if (rem == 0) return 0;\n        if (rem < 0) return 1e9;\n        int res = 1e9;\n        for (int c : coins) res = min(res, 1 + solve(coins, rem - c));\n        return res;\n    }\n    int coinChange(vector<int>& coins, int amount) {\n        int ans = solve(coins, amount);\n        return ans >= 1e9 ? -1 : ans;\n    }\n};"
        },
        "optimal": {
          "explanation": "1D DP array of size amount + 1 in O(N * Amount).",
          "timeComp": "O(N * Amount)",
          "spaceComp": "O(Amount)",
          "cppCode": "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) if (i - c >= 0) dp[i] = min(dp[i], 1 + dp[i - c]);\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};"
        },
        "id": "q_coin_change",
        "slug": "coin-change",
        "patternSlug": "knapsack-2d-dynamic-programming",
        "subPatternSlug": "unbounded-knapsack-coin-change",
        "patternId": "p_knapsack_2d_dynamic_programming"
      }
    ],
    "slug": "knapsack-2d-dynamic-programming",
    "displayOrder": 20
  },
  {
    "id": "p_bit_manipulation_bitmasking",
    "name": "Bit Manipulation & Bitmasking",
    "cues": [
      "Bitwise XOR / AND / OR",
      "Single Number (XOR cancelation)",
      "Count set bits (Hamming Weight)",
      "Bitmask state representation"
    ],
    "thinkAbout": "When operating directly on binary bit representation or storing set subsets as integer bitmasks.",
    "coreIdea": "XOR properties: X ^ X = 0 and X ^ 0 = X. Clear lowest set bit: `n & (n - 1)`.",
    "templateLabel": "Modern C++ Template",
    "templateCode": "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int res = 0;\n        for (int x : nums) res ^= x;\n        return res;\n    }\n};",
    "timeComplexity": "O(N) single pass or O(1) bit operations.",
    "spaceComplexity": "O(1) constant space.",
    "pitfalls": [
      "Bitwise operator precedence (e.g. `a & b == 0` evaluates `b == 0` first!). Always wrap bit operations in parentheses `(a & b) == 0`."
    ],
    "subPatterns": [
      {
        "id": "sp_bit_xor",
        "name": "XOR Cancelation & Single Number",
        "cues": [
          "Single Number",
          "XOR identity"
        ],
        "thinkAbout": "When every element appears twice except one single element.",
        "coreIdea": "XOR all array elements. Duplicate pairs cancel out to 0, leaving single element.",
        "templateCode": "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int res = 0;\n        for (int x : nums) res ^= x;\n        return res;\n    }\n};",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "pitfalls": [
          "Operator precedence errors without parentheses."
        ],
        "slug": "xor-cancelation-single-number",
        "patternSlug": "bit-manipulation-bitmasking",
        "patternId": "p_bit_manipulation_bitmasking"
      }
    ],
    "questions": [
      {
        "lcNum": "LC 136",
        "title": "Single Number",
        "subPatternId": "sp_bit_xor",
        "url": "https://leetcode.com/problems/single-number/",
        "diff": "easy",
        "statement": "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.",
        "bruteForce": {
          "explanation": "Frequency map counting occurrences in O(N) space.",
          "timeComp": "O(N)",
          "spaceComp": "O(N)",
          "cppCode": "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        unordered_map<int, int> count;\n        for (int x : nums) count[x]++;\n        for (auto& pair : count) if (pair.second == 1) return pair.first;\n        return 0;\n    }\n};"
        },
        "optimal": {
          "explanation": "Bitwise XOR across all elements. Cancel pairs in O(N) time and O(1) space.",
          "timeComp": "O(N)",
          "spaceComp": "O(1)",
          "cppCode": "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int res = 0;\n        for (int x : nums) res ^= x;\n        return res;\n    }\n};"
        },
        "id": "q_single_number",
        "slug": "single-number",
        "patternSlug": "bit-manipulation-bitmasking",
        "subPatternSlug": "xor-cancelation-single-number",
        "patternId": "p_bit_manipulation_bitmasking"
      }
    ],
    "slug": "bit-manipulation-bitmasking",
    "displayOrder": 21
  }
];
