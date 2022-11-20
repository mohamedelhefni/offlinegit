# Ar Trie


### Implement Trie Datastructure that supports rune types with functionalities :
-  **InitTrie**  initialize the trie
-  **Insert**  Insert single key in your tree 
-  **Find** check if your key is in the tree
-  **Put** map a key to a value 
-  **Get** get value for your key 
-  **Delete** Delete key from your trie
-  **Search** Search on trie values with your prefix key 


### Trie Benchmark 

```
BenchmarkInsert-12    	2260291	      523.4 ns/op	      2 B/op	      0 allocs/op
BenchmarkFind-12      	152889574	        7.304 ns/op	      0 B/op	      0 allocs/op
BenchmarkPut-12       	2127642	      561.2 ns/op	     10 B/op	      1 allocs/op
BenchmarkGet-12       	169333138	        7.154 ns/op	      0 B/op	      0 allocs/op
BenchmarkKeys-12      	117835408	        9.887 ns/op	      0 B/op	      0 allocs/op
BenchmarkSearch-12    	28626381	      102.2 ns/op	     16 B/op	      1 allocs/op

```

## Examples

```go
	tr := InitTrie()

	tr.Insert("mohamed")
	tr.Insert("mohmed")
	tr.Insert("modaser")
	tr.Insert("monzer")
	tr.Insert("momen")
	tr.Insert("mohsen")
  tr.Keys("mo") // [mohamed mohmed mohsen modaser monzer momen]

	tr.Insert("محمد")
	tr.Insert("محمود")
	tr.Keys("مح") // [محمد محمود]

	tr.Put("hello", "world")
	tr.Put("here", "is a trie search")

	tr.Search("he") // ["world", "is a trie search"]

	tr.Find("mohamed") // true
	tr.Delete("mohamed")
	tr.Find("mohamed") // false

	tr.Find("محمد") // true
	tr.Delete("محمد")
	tr.Find("محمد") // false

```
