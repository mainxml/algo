/// <reference types="vite/client" />

declare interface Window {
    /**
     * App原生方法映射对象
     */
    $app: {
        onSwap: (i: number, j: number) => void;
        onUp: (i: number, isFloating: boolean) => void
        onDown: (i: number) => void
        onMove: (i: number, j: number, isFloating: boolean) => void,
        onPointMove: (pointName: string, i: number) => void,
        onTrack: (lineNumber: number) => void,
        addPoints: (names: string[]) => void,
        play: () => void
    }

    // 以下是挂载给App调用的函数

    /**
     * 显示算法源码
     * @param algorithmName
     */
    showSourceCode: (algorithmName: string) => void

    /**
     * 开始动画排序
     * @param algorithmName
     * @param a
     */
    animateSort:(algorithmName: string, a: number[]) => void


    /**
     * 高亮代码行
     * @param lineNumber
     */
    highlightLineNumber:(lineNumber: number) => void
}