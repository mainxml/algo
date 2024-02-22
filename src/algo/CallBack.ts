/**
 * 回调对象
 */
export default class CallBack {

    // App原生方法映射对象
    private readonly app = window.$app

    /**
     * 两个元素交换
     * @param {number} i - 下标1
     * @param {number} j - 下标2
     * @return {void}
     */
    public onSwap(i: number, j: number): void {
        this.app.onSwap(i, j)
    }

    /**
     * 元素升起
     * @param {number} i - 下标
     * @param {boolean} isFloating - 升起后是否悬浮
     * @return {void}
     */
    public onUp(i: number, isFloating: boolean): void {
        this.app.onUp(i, isFloating)
    }

    /**
     * 元素下降
     * @param {number} i - 下标
     * @return {void}
     */
    public onDown(i: number): void {
        this.app.onDown(i)
    }

    /**
     * 元素移动
     * @param {number} i - 开始下标
     * @param {number} j - 结束下标
     * @param {boolean} isFloating - 是否移动浮动的元素
     */
    public onMove(i: number, j: number, isFloating: boolean): void {
        this.app.onMove(i, j, isFloating)
    }

    /**
     * 指针元素移动
     * @param {string} pointName 指针元素名称
     * @param {number} i 指针新下标
     */
    public onPointMove(pointName: string, i: number): void {
        this.app.onPointMove(pointName, i)
    }

    /**
     * 跟踪代码行
     * @param lineNumber
     */
    public onTrack(lineNumber: number) {
        this.app.onTrack(lineNumber)
    }

    /**
     * 添加指针元素视图
     * @param names
     */
    public addPoints(...names: string[]) {
        this.app.addPoints(names)
    }

    /**
     * 播放动画
     */
    public play() {
        this.app.play()
    }
}