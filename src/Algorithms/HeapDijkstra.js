
class MinHeapDijkstra {
    constructor(array) {
        this.heap = this.buildHeap(array);
    }

    buildHeap(array) {
        const n = array.length;
        for (let i = Math.floor(n / 2); i >= 0; i--) {
            this.siftDown(i, n, array);
        }
        return array;
    }

    siftDown(i, n, heap) {
        let l = 2 * i + 1;
        while (l < n) {
            let r = 2 * i + 2 < n ? 2 * i + 2 : -1;
            let minIdx = (r !== -1 && heap[r].distance < heap[l].distance) ? r : l;
            if (heap[minIdx].distance < heap[i].distance) {
                this.swap(minIdx, i, heap);
                i = minIdx;
                l = 2 * i + 1;
            } else {
                break;
            }
        }
    }

    siftUp(i, heap) {
        while (i > 0 && heap[i].distance < heap[Math.floor((i - 1) / 2)].distance) {
            this.swap(i, Math.floor((i - 1) / 2), heap);
            i = Math.floor((i - 1) / 2);
        }
    }

    remove() {
        this.swap(0, this.heap.length - 1, this.heap);
        const value = this.heap.pop();
        this.siftDown(0, this.heap.length, this.heap);
        return value;
    }

    insert(value) {
        this.heap.push(value);
        this.siftUp(this.heap.length - 1, this.heap);
    }

    swap(i, j, heap) {
        const c = heap[i];
        heap[i] = heap[j];
        heap[j] = c;
    }
}

export default MinHeapDijkstra;
