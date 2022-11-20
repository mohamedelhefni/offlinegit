package artrie

import (
	"math/rand"
	"testing"
)

var stringKeys [1000]string // random string keys
const bytesPerKey = 30

func init() {
	// string keys
	for i := 0; i < len(stringKeys); i++ {
		key := make([]byte, bytesPerKey)
		if _, err := rand.Read(key); err != nil {
			panic("error generating random byte slice")
		}
		stringKeys[i] = string(key)
	}
}

func BenchmarkInsert(b *testing.B) {

	trie := InitTrie()
	b.ResetTimer()
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		trie.Insert(stringKeys[i%len(stringKeys)])
	}
}

func BenchmarkFind(b *testing.B) {
	trie := InitTrie()
	b.ResetTimer()
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		trie.Find(stringKeys[i%len(stringKeys)])
	}
}

func BenchmarkPut(b *testing.B) {
	trie := InitTrie()
	b.ResetTimer()
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		trie.Put(stringKeys[i%len(stringKeys)], i)
	}
}

func BenchmarkGet(b *testing.B) {
	trie := InitTrie()
	b.ResetTimer()
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		trie.Get(stringKeys[i%len(stringKeys)])
	}
}

func BenchmarkKeys(b *testing.B) {
	trie := InitTrie()
	b.ResetTimer()
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		trie.Keys(stringKeys[i%len(stringKeys)][:3])
	}
}

func BenchmarkSearch(b *testing.B) {
	trie := InitTrie()
	b.ResetTimer()
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		trie.Search(stringKeys[i%len(stringKeys)][:3])
	}
}

func TestInsert(t *testing.T) {
	tr := InitTrie()
	tr.Insert("hefni")
	res := tr.Find("hefni")
	if res != true {
		t.Errorf("Expected %v got %v", true, false)
	}
}

func TestTrie(t *testing.T) {

	trie := InitTrie()

  const firstPutValue =  "الاول"

	cases := []struct {
		key   string
		value interface{}
	}{
    {"first", "first put value"},
    {"second", "القيمة الثانية "},
    {"第三", "這是第三個值"},
	}

	for _, c := range cases {
		if value := trie.Get(c.key); value != nil {
			t.Errorf("expected key %s to be missing, found value %v", c.key, value)
		}
	}

	// initial put
	for _, c := range cases {
		if isNew := trie.Put(c.key, firstPutValue); !isNew {
			t.Errorf("expected key %s to be missing", c.key)
		}
	}

	// subsequent put
	for _, c := range cases {
		if isNew := trie.Put(c.key, c.value); isNew {
			t.Errorf("expected key %s to have a value already", c.key)
		}
	}

	// get
	for _, c := range cases {
		if value := trie.Get(c.key); value != c.value {
			t.Errorf("expected key %s to have value %v, got %v", c.key, c.value, value)
		}
	}

	// delete, expect Delete to return true indicating a node was nil'd
	for _, c := range cases {
		if deleted := trie.Delete(c.key); !deleted {
			t.Errorf("expected key %s to be deleted", c.key)
		}
	}

	// get deleted keys
	for _, c := range cases {
		if value := trie.Get(c.key); value != nil {
			t.Errorf("expected key %s to be deleted, got value %v", c.key, value)
		}
	}

}

func TestTrieRoot(t *testing.T) {
	const firstPutValue = "first put"
	const putValue = "value"

	trie := InitTrie()

	if value := trie.Get(""); value != nil {
		t.Errorf("expected key '' to be missing, found value %v", value)
	}
	if !trie.Put("", firstPutValue) {
		t.Error("expected key '' to be missing")
	}
	if trie.Put("", putValue) {
		t.Error("expected key '' to have a value already")
	}
	if value := trie.Get(""); value != putValue {
		t.Errorf("expected key '' to have value %v, got %v", putValue, value)
	}
	if !trie.Delete("") {
		t.Error("expected key '' to be deleted")
	}
	if value := trie.Get(""); value != nil {
		t.Errorf("expected key '' to be deleted, got value %v", value)
	}
}
