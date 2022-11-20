# Coding Interview University
A repository to keep track of my progress on coding interview university plan
if you are a notion user this is my [notion summary](https://hefni101.notion.site/Coding-Interview-University-57b128f90d6a4e53b0ee50f4031a8681)

# Topics

### DataStructures
- [x] Arrays
- [x] Linked List
- [x] Stack
- [x] Queue
- [x] Hash Table
- [ ] More Knowledge
    - [x] Binary Search
    - [ ] Bitwise Operations


## Trees

- ### Trees - Notes & Background
    - [x] [Series: Trees (video)](https://www.coursera.org/lecture/data-structures/trees-95qda)
    - basic tree construction
    - traversal
    - manipulation algorithms
    - [x] [BFS(breadth-first search) and DFS(depth-first search) (video)](https://www.youtube.com/watch?v=uWL6FJhq5fM)
        - BFS notes:
           - level order (BFS, using queue)
           - time complexity: O(n)
           - space complexity: best: O(1), worst: O(n/2)=O(n)
        - DFS notes:
            - time complexity: O(n)
            - space complexity:
                best: O(log n) - avg. height of tree
                worst: O(n)
            - inorder (DFS: left, self, right)
            - postorder (DFS: left, right, self)
            - preorder (DFS: self, left, right)

- ### Binary search trees: BSTs
    - [x] [Binary Search Tree Review (video)](https://www.youtube.com/watch?v=x6At0nzX92o&index=1&list=PLA5Lqm4uh9Bbq-E0ZnqTIa8LRaL77ica6)    
    - [x] [MIT (video)](https://www.youtube.com/watch?v=9Jry5-82I68)
    - C/C++:
        - [x] [Binary search tree - Implementation in C/C++ (video)](https://www.youtube.com/watch?v=COZK7NATh4k&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P&index=28)
        - [x] [BST implementation - memory allocation in stack and heap (video)](https://www.youtube.com/watch?v=hWokyBoo0aI&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P&index=29)
        - [x] [Find min and max element in a binary search tree (video)](https://www.youtube.com/watch?v=Ut90klNN264&index=30&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P)
        - [x] [Find height of a binary tree (video)](https://www.youtube.com/watch?v=_pnqMz5nrRs&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P&index=31)
        - [x] [Check if a binary tree is binary search tree or not (video)](https://www.youtube.com/watch?v=yEwSGhSsT0U&index=35&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P)
        - [x] [Delete a node from Binary Search Tree (video)](https://www.youtube.com/watch?v=gcULXE7ViZw&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P&index=36)
    - [x] Implement:
        - [x] insert    // insert value into tree
        - [x] get_node_count // get count of values stored
        - [x] print_values // prints the values in the tree, from min to max
        - [x] delete_tree
        - [x] in_tree // returns true if given value exists in the tree
        - [x] get_height // returns the height in nodes (single node's height is 1)
        - [x] get_min   // returns the minimum value stored in the tree
        - [x] get_max   // returns the maximum value stored in the tree
        - [x] is_binary_search_tree
        - [x] delete_value

