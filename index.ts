// Import stylesheets
import './style.css';

// Write TypeScript code!

// a project to create linked list

// list node
class Node<T> {
  value: T;
  next: Node<T>;
  constructor(value: T, next: Node<T>) {
    this.value = value;
    this.next = next;
  }
}

// node manager
class SingleLinkedList<T> {
  head: Node<T>;
  tail: Node<T>;

  constructor() {
    this.head = new Node<T>(null, null); // head initialization
    this.tail = new Node<T>(null, null); // tail initialization
    this.head.next = this.tail; // remain the head next ponter to point to tail
    this.tail.next = null; // tail next point to null
  }

  // running time of O(1)
  insertFront(value: T): void {
    if (this.head.next === this.tail) {
      // case head -> tail
      this.resolveHeadPointingToTail(value);
    } else {
      // case head -> linked list
      // let p = this.head.next;
      this.head.next = new Node(value, this.head.next);
    }
  }

  // running time of O(1)
  popFront(): void {
    if (this.head.next === this.tail) {
      return;
    } else {
      let p = this.head;
      p.next = p.next.next;
    }
  }

  // running time of O(N)
  insertBack(value: T): void {
    if (this.head.next === this.tail) {
      // case head -> tail
      this.resolveHeadPointingToTail(value);
    } else {
      // case head -> list
      let looper = this.head;
      let p = null;
      while (looper.next) {
        if (looper.next === this.tail) {
          p = looper; // capture the target
          break;
        }
        looper = looper.next;
      }
      if (p) {
        p.next = new Node(value, this.tail);
      }
    }
  }

  delete(value: T) {
    let p = this.getNode((p) => p.next.value === value);
    p.next = p.next.next;
  }

  get(value: T) {
    return this.getNode((p) => p.value === value);
  }

  getLast(): Node<T> {
    return this.getNode((p) => p.next === this.tail);
  }

  // running time == O(N)
  private getNode(getStrategy: (pointer: Node<T>) => boolean): Node<T> | null {
    let p = this.head;
    let targetNode = null;
    while (p.next) {
      if (getStrategy(p)) {
        targetNode = p;
        break;
      }
      p = p.next;
    }
    return targetNode || null;
  }

  private resolveHeadPointingToTail(value: T) {
    // case head -> tail
    let p = new Node(value, this.tail);
    this.head.next = p;
  }

  //print nodes
  print(callback?: (value: T) => void): void {
    let nodePointer = this.head;
    while (nodePointer.next && nodePointer.next !== this.tail) {
      if (callback) {
        callback(nodePointer.next.value);
      } else {
        console.log(nodePointer.next.value);
      }
      nodePointer = nodePointer.next;
    }
  }
}
const sll = new SingleLinkedList<number>();

sll.insertFront(10);
sll.insertFront(20);
sll.insertFront(30);
sll.insertFront(40);
sll.insertFront(50);

const appDiv = document.getElementById('app');
const masterNode = document.createElement('ul');
masterNode.setAttribute('id', 'master');
appDiv.appendChild(masterNode);

sll.print((value: number) => {
  const element = document.createElement('li');
  element.innerText = String(value);
  element.setAttribute('id', `${value}`);
  masterNode.appendChild(element);
});

const addButton = document.createElement('button');
addButton.setAttribute('id', 'add');
addButton.innerText = 'Add';
appDiv.appendChild(addButton);

addButton.addEventListener('click', () => {
  let lastValue = sll.getLast().value;
  lastValue += 10;
  sll.insertBack(lastValue);

  const element = document.createElement('li');
  element.innerText = String(lastValue);
  element.setAttribute('id', `${lastValue}`);
  masterNode.appendChild(element);
});
