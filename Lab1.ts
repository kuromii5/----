export type numNode = {
    data: number
    next?: numNode
}

export class LinkedList {
    private length: number
    public head?: numNode
    public tail?: numNode

    constructor() {
        this.length = 0
        this.head = this.tail = undefined
    }

    // 1) addition to the end of the list
    public append(value: number | undefined): void {
        const node = {data: value, next: undefined} as numNode
        this.length++

        if (!this.tail) {
            this.head = this.tail = node
            return
        }

        this.tail.next = node
        this.tail = node
    }

    // 2) addition to the start of the list
    public prepend(value: number | undefined): void {
        const node = {data: value, next: undefined} as numNode
        this.length++

        if (!this.head) {
            this.head = this.tail = node
            return
        }

        node.next = this.head
        this.head = node
    }

    // 11) checking the list for emptiness
    public isEmpty(): boolean {
        return (!this.head)
    }

    // 3) removing the last element in list
    public removeLast(): number | undefined {
        if (!this.tail) {
            return
        }

        return this.removeNode(this.tail)
    }

    // 4) removing the first element in list
    public removeFirst(): number | undefined {
        if (!this.head) {
            console.log("list is empty.")
            return
        }

        return this.removeNode(this.head)
    }

    // 7) removing the element by index
    public removeAt(index: number): number | undefined {
        const node = this.getAt(index)

        if(!node) {
            return undefined
        }

        return this.removeNode(node, index)
    }

    // 9) removing the whole list
    public removeAll(): void {
        let curr = this.head
        while(curr) {
            this.removeFirst()
            curr = curr?.next
        }
    }

    // helper method for removing (we don't wanna duplicate these lines of code)
    private removeNode(node: numNode, index = -1): number | undefined {
        this.length--
        if (this.length === 0) {
            const value = this.head?.data
            this.head = this.tail = undefined
            return value
        }
        
        if (this.head === node) {
            this.head = node.next
        } else if (this.tail === node) {
            let prev = this.getAt(index - 1) as numNode
            this.tail = prev
        } else {
            let prev = this.getAt(index - 1) as numNode
            prev.next = node.next
        }

        return node.data
    }

    // 10) replacing an element with other in the list
    public replace(value: number | undefined, index: number): void {
        const node = {data: value, next: undefined} as numNode
        let curr = this.getAt(index)

        if (curr === this.head) {
            node.next = this.head?.next
            this.head = node
            return
        }

        let prev = this.getAt(index - 1) as numNode
        if (curr === this.tail) {
            prev.next = node
            this.tail = node
            return
        }

        prev.next = node
        node.next = curr?.next
    }

    // 12) reversing list
    public reverse(): void {
        let prev: undefined | numNode
        let next: undefined | numNode
        let curr = this.head

        while(curr) {
            next = curr.next
            curr.next = prev
            prev = curr
            curr = next
        }

        this.head = prev
    }

    // 5) inserting an element by index
    public insertAt(value: number | undefined, index: number): void {
        if (index > this.length || index < 0) {
            console.log("index is out of bound")
            return
        } else if (index === 0) {
            this.prepend(value)
            return
        } else if (index === this.length) {
            this.append(value)
            return
        }

        this.length++
        const curr = this.getAt(index) as numNode
        const node = {data: value, next: undefined} as numNode

        let prev = this.getAt(index - 1) as numNode

        node.next = curr
        prev.next = node
    }

    // 14) inserting a list at the end of list
    public appendList(list: LinkedList): void {
        if (!this.tail) {
            this.head = list.head
            return
        }

        this.length += list.length
        let tempList = list.copy()

        this.tail.next = tempList.head
        this.tail = tempList.tail
    }

    // 15) inserting a list at the beginning of list
    public prependList(list: LinkedList): void {
        if (!this.head) {
            this.head = list.head
            return
        }

        this.length += list.length
        let tempList = list.copy()

        tempList.tail!.next = this.head
        this.head = tempList.head
    }

    // 13) inserting a list in the list starting from index
    public insertListAt(list: LinkedList, index: number): void {
        if (list.isEmpty()) {
            return undefined
        }

        if (index > this.length || index < 0) {
            console.log("index is out of bound")
            return
        } else if (index === 0) {
            this.prependList(list)
            return
        } else if (index === this.length) {
            this.appendList(list)
            return
        }
        
        this.length += list.length
        let tempList = list.copy()

        const curr = this.getAt(index)
        let prev = this.getAt(index - 1) as numNode

        tempList.tail!.next = curr
        prev.next = tempList.head
    }

    // 16) checking if list contains another list in itself
    public containsList(list: LinkedList): boolean {
        if (list.length === 1) {
            return this.contains(list.head?.data)
        }

        let curr = this.head
        let temp = list.head

        for (let i = 0; i < this.length; i++) {
            if (curr?.data === temp?.data) {
                temp = temp?.next
            } else {
                temp = list.head
            }

            if (!temp) {
                return true
            }

            curr = curr?.next
        }

        return false
    }

    public contains(value: number | undefined): boolean {
        let curr = this.head
        for (let i = 0; i < this.length; i++) {
            if (curr?.data === value) {
                return true
            }
            curr = curr?.next
        }

        return false
    }

    // 17) searching first entry of one list in another
    public searchFirstEntry(list: LinkedList): number {
        let curr = this.head
        let temp = list.head

        for (let i = 0; i < this.length; i++) {
            if (curr!.data === temp!.data) {
                temp = temp?.next
            } else {
                temp = list.head
            }

            if(!temp) {
                return i - (list.length - 1)
            }

            curr = curr?.next
        }

        return -1
    }

    // 18) searching last entry of one list in another
    public searchLastEntry(list: LinkedList): number {
        this.reverse()
        list.reverse()

        let curr = this.head
        let temp = list.head
        
        for (let i = 0; i < this.length; i++) {
            if (curr!.data === temp!.data) {
                temp = temp?.next
            } else {
                temp = list.head
            }

            if(!temp) {
                return this.length - i - 1
            }

            curr = curr?.next
        }

        return -1
    }

    // 19) swapping 2 elements in the list by indexes
    public swap(i: number, j: number): void {
        if (i === j) {
            return undefined
        }

        let nodeA = this.getAt(i)
        let prevA = this.getAt(i - 1)

        let nodeB = this.getAt(j)
        let prevB = this.getAt(j - 1)

        if (!nodeA || !nodeB) {
            return undefined
        }

        if (nodeA === this.head) {
            this.head = nodeB
            prevB!.next = nodeA
        } else if (nodeB === this.head) {
            this.head = nodeA
            prevA!.next = nodeB
        } else {
            prevB!.next = nodeA
            prevA!.next = nodeB
        }

        let temp = nodeA.next
        nodeA.next = nodeB.next
        nodeB.next = temp
    }

    // helper method for inserting a list inside a list
    public copy(): LinkedList {
        let list = new LinkedList()
        let curr = this.head

        while(curr) {
            list.append(curr.data)
            curr = curr.next
        }

        return list
    }

    // 6) getting data stored in node by index
    public getValue(index: number): number | undefined {
        return this.getAt(index)?.data
    }

    // 8) getting the length of list
    public getLength(): number {
        return this.length
    }

    // helper method for getting the node via index
    private getAt(index: number): numNode | undefined {
        if (index < 0 || index > this.length - 1) {
            return undefined
        }

        let curr = this.head
        for (let i = 0; curr && i < index; i++) {
            curr = curr.next
        }
        return curr
    }

    public peek(index: number): numNode | undefined {
        return this.getAt(index)
    }

    //helper method for printing the list
    public printList(): void {
        let curr = this.head
        for (let i = 0; i < this.length; i++) {
            console.log(curr?.data)
            curr = curr?.next
        }
    }
}