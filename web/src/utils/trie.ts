import { TiThList } from "react-icons/ti";
import { childrenToReact } from "react-markdown/lib/ast-to-react";

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

}