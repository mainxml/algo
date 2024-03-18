import CallBack from "@/algo/CallBack";

/**
 * 算法类
 */
export default class Algo {
    /**
     * 获取算法源码
     * @param algorithmName 算法名
     */
    public getSourceCode(algorithmName: string): string {
        switch (algorithmName) {
            case 'selectionSort':
                return this.filterCharacter(this.selectionSort.toString())
            case 'bubbleSort':
                return this.filterCharacter(this.bubbleSort.toString())
            case 'insertionSort':
                return this.filterCharacter(this.insertionSort.toString())
            case 'quickSort':
                return this.filterCharacter(this.quickSort.toString())
            default:
                return 'Nothing'
        }
    }

    /**
     * 动画排序
     * @param algorithmName 算法名称
     * @param a 数组
     */
    public animateSort(algorithmName: string, a: number[]) {
        const callback = new CallBack()
        switch (algorithmName) {
            case 'selectionSort':
                this.selectionSort(a, callback)
                break
            case 'bubbleSort':
                this.bubbleSort(a, callback)
                break
            case 'insertionSort':
                this.insertionSort(a, callback)
                break
            case 'quickSort':
                this.quickSort(a, 0, a.length - 1, callback)
                break
            default:
                return
        }
        callback.play()
    }

    /**
     * 选择排序
     * @param {number[]} a
     * @param {CallBack} callback
     */
    public selectionSort(a: number[], callback: CallBack) {
        this.track(callback, true, ['i', 0], ['j', 0], ['m', 0])
        const n = a.length

        for (let i = 0; i < n - 1; i++) {
            let m = i
            this.track(callback, false, ['i', i], ['m', m])

            for (let j = i + 1; j < n; j++) {
                this.track(callback, false, ['j', j])
                if (a[j] < a[m]) {
                    m = j
                    this.track(callback, false, ['m', m])
                }
            }
            this.track(callback)
            this.swap(a, i, m, callback)
        }

        this.track(callback)
    }

    /**
     * 冒泡排序
     * @param {number[]} a
     * @param {CallBack} callback
     */
    public bubbleSort(a: number[], callback: CallBack) {
        this.track(callback, true, ['i', 0], ['j', 0], ['j+1', 0])
        const n = a.length

        for (let i = n - 1; i > 0; i--) {
            this.track(callback, false, ['i', i])
            for (let j = 0; j < i; j++) {
                this.track(callback, false, ['j', j], ['j+1', j + 1])
                if (a[j] > a[j + 1]) {
                    this.track(callback)
                    this.swap(a, j, j + 1, callback);
                }
            }
        }

        this.track(callback)
    }

    /**
     * 插入排序
     * @param {number[]} a
     * @param {CallBack} callback
     */
    public insertionSort(a: number[], callback: CallBack) {
        this.track(callback, true, ['i', 0], ['j', 0])
        const n = a.length

        for (let i = 1; i < n; i++) {
            let base = a[i];
            let j = i - 1;
            this.track(callback, false, ['i', i]);
            callback.onUp(i, true);

            while (j >= 0 && a[j] > base) {
                this.track(callback, false, ['j', j]);
                callback.onMove(j, j + 1, false);
                a[j + 1] = a[j];
                j--;
            }

            a[j + 1] = base;
            this.track(callback); callback.onMove(i, j + 1, true);
            callback.onDown(i);
        }

        this.track(callback)
    }

    /**
     * 快速排序
     * @param {number[]} a
     * @param {number} left
     * @param {number} right
     * @param {CallBack} callback
     */
    public quickSort(a: number[], left: number, right: number, callback: CallBack) {
        this.track(callback, (left == 0 && right == a.length - 1), ['i', left], ['j', right])
        if (left >= right) {
            this.track(callback)
            return
        }

        let i = left
        let j = right
        this.track(callback)

        while (i < j) {
            while (i < j && a[j] >= a[left]) {
                j--
                this.track(callback, false, ['j', j])
            }
            while (i < j && a[i] <= a[left]) {
                i++
                this.track(callback, false, ['i', i])
            }
            this.track(callback)
            this.swap(a, i, j, callback)
        }
        this.track(callback, false, ['i', left])
        this.swap(a, left, i, callback)

        this.quickSort(a, left, i - 1, callback)
        this.quickSort(a, i + 1, right, callback)
    }

    /**
     * 交换两个个元素
     * @param a
     * @param i
     * @param j
     * @param callback
     */
    private swap(a: number[], i: number, j: number, callback: CallBack) {
        let temp = a[i]
        a[i] = a[j]
        a[j] = temp
        callback.onSwap(i, j)
    }

    private startLine = 0

    /**
     * 追踪代码
     * @param callback
     * @param isStartLine 是否开始行
     * @param pointNameIndexes 指针名和指针下标元组数组
     * @private
     */
    private track(callback: CallBack, isStartLine: boolean = false, ...pointNameIndexes: [string, number][]): number {
        const curLineStr = new Error().stack?.split('\n')[2].split(':').slice(-2, -1)[0] ?? '0';
        const curLine = parseInt(curLineStr)

        if (isStartLine) {
            this.startLine = curLine
            const pointNames: string[] = []
            pointNameIndexes.forEach(pointNameIndex => {
                pointNames.push(pointNameIndex[0])
            })
            callback.addPoints(...pointNames)
        }

        let executeLine = curLine - this.startLine + 2
        callback.onTrack(executeLine)

        pointNameIndexes.forEach(pointNameIndex => {
            callback.onPointMove(pointNameIndex[0], pointNameIndex[1])
        })

        return executeLine
    }

    /**
     * 过虑掉多余的字符
     * @param sourceCode
     */
    private filterCharacter(sourceCode: string): string {
        let lines = sourceCode.split('\n')
        for (let i = 0; i < lines.length; i++) {
            if (i == 0) {
                lines[i] = 'function ' + lines[i]
                continue
            }
            if (lines[i].includes(', callback')) {
                lines[i] = lines[i].replace(', callback', '')
            }
            if (lines[i].includes('callback.')) {
                lines[i] = lines[i].replace('callback.', '// callback.')
            }
            if (lines[i].includes('this.')) {
                lines[i] = lines[i].replace('this.', '')
            }
            if (lines[i].includes('track')) {
                lines[i] = lines[i].replace('track', '// track |')
                lines[i] = lines[i].split('|')[0]
            }
        }
        return lines.filter((line) => line.length != 0).join('\n')
    }
}