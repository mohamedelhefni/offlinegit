package artrie

type Trie interface {
	Get(key string) interface{}
	Put(key string, value interface{}) bool
	Insert(key string)
	Find(key string) bool
	Search(key string) []interface{}
	Delete(key string) bool
	Keys(key string) interface{}
}

type araTrie struct {
	value    interface{}
	children map[rune]*araTrie
	isWord   bool
}

type nodeRune struct {
	node *araTrie
	r    rune
}

func InitTrie() *araTrie {
	return new(araTrie)
}

func (t *araTrie) Get(key string) interface{} {
	node := t
	for _, r := range key {
		node = node.children[r]
		if node == nil {
			return nil
		}
	}
	return node.value
}

func (t *araTrie) Put(key string, value interface{}) bool {
	node := t
	for _, r := range key {
		child, _ := node.children[r]
		if child == nil {
			if node.children == nil {
				node.children = map[rune]*araTrie{}
			}
			child = new(araTrie)
			node.children[r] = child
		}
		node = child
	}
	isNewVal := node.value == nil
	node.value = value
	node.isWord = true
	return isNewVal
}

func (t *araTrie) Insert(key string) {
	node := t
	for _, r := range key {
		child, _ := node.children[r]
		if child == nil {
			if node.children == nil {
				node.children = map[rune]*araTrie{}
			}

			child = new(araTrie)
			node.children[r] = child
		}
		node = child
	}
	node.isWord = true
}

func (t *araTrie) Find(key string) bool {

	node := t
	for _, r := range key {
		node = node.children[r]
		if node == nil {
			return false
		}
	}
	return true
}

func (t *araTrie) Delete(key string) bool {

	path := make([]nodeRune, len(key))
	node := t

	for i, r := range key {
		path[i] = nodeRune{r: r, node: node}
		node = node.children[r]
		if node == nil {
			return false // node doesn't exist
		}
	}

	node.value = nil

	if node.isLeaf() {

		for i := len(key) - 1; i > 0; i-- {

			if path[i].node == nil {
				continue
			}

			parent := path[i].node
			r := path[i].r

			delete(parent.children, r)

			if !parent.isLeaf() {
				break
			}

			parent.children = nil

			if parent.value != nil {
				break
			}

		}
	}

	return true
}

func dfs(ch *araTrie, word string, wordsList *[]string) {
	for r, child := range ch.children {
		if child.isWord {
			*wordsList = append(*wordsList, word+string(r))
		}
		dfs(child, word+string(r), wordsList)
	}

}

func (t *araTrie) Keys(key string) []string {
	if !t.Find(key) {
		return nil
	}
	wordsList := make([]string, 0)
	node := t
	for _, r := range key {
		node = node.children[r]
	}

	if node.isWord {
		wordsList = append(wordsList, key)
	}
	if node != nil {
		dfs(node, key, &wordsList)
	}
	return wordsList
}

func (t *araTrie) Search(key string) []interface{} {
	results := make([]interface{}, 1)
	keys := t.Keys(key)
	if len(keys) > 0 {
		for _, key := range keys {
			result := t.Get(key)
			if len(results) > 0 {
				results = append(results, result)
			}
		}
	}
	return results[1:]
}

func (t *araTrie) isLeaf() bool {
	return len(t.children) == 0
}

