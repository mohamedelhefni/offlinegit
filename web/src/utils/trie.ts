
interface trieNode {
    id: number
    value: any
    childrens: Map<string, trieNode>
    isWord: boolean
}


export class Trie {
    root: trieNode;
    size: number = 0;
    constructor() {
        this.root = {
            id: 0,
            isWord: false,
            childrens: new Map<string, trieNode>(),
            value: null
        } as trieNode

        if (!localStorage.getItem("keys")) {
            this.persist();
        }
        let keys = JSON.parse(localStorage.getItem("keys") || '[]') || []
        keys.forEach((key: string) => {
            this.insert(key)
        })
    }
    insertNode(key: string) {
        let node = this.root;
        const keys = [...key]
        keys.forEach((char: string) => {
            let child = node.childrens.get(char)
            if (!child) {
                child = {
                    isWord: false,
                    childrens: new Map<string, trieNode>(),
                    value: null
                } as trieNode
                node.childrens.set(char, child)
            }
            node = child
        })
        return node
    }
    dfs(node: trieNode, word: string, keys: any[]) {
        node.childrens.forEach((child: trieNode, key: string) => {
            if (child.isWord) keys.push(word + key)
            this.dfs(child, word + key, keys)
        })
    }
    persist() {
        let keys = [] as any[]
        let node = this.root;
        this.dfs(node, "", keys)
        localStorage.setItem("keys", JSON.stringify(keys))
    }
    put(key: string, value: any) {
        let node = this.insertNode(key)
        let isNewValue = node.value == null
        if (isNewValue) {
            this.size++
            node.id = this.size;
        }
        node.value = value;
        node.isWord = true
        return node.id
    }
    insert(key: string) {
        let node = this.insertNode(key)
        let isNewValue = node.value == null
        if (isNewValue) {
            this.size++
            node.id = this.size;
        }
        node.isWord = true
        node.value = node.id
        return node.id
    }
    get(key: string): any {
        let node = this.root as trieNode | undefined;
        const keys = [...key]
        keys.forEach((char: string) => {
            node = node?.childrens.get(char);
            if (!node) return null
        });
        return node?.value
    }
    delete(key: string): boolean {
        return true
    }

    isLeaf(node: trieNode) {
        return node.childrens.size == 0
    }
}
