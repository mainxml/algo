<script setup lang="ts">
import Prism from 'prismjs'
import {onMounted, onUpdated, ref} from 'vue'
import Algo from '@/algo/Algo'

// 高亮的行号
const _highlightLineNumber = ref()
// 算法源码
const _sourceCode = ref('\'选择一个算法开始\'')

// 算法对象
const algo = new Algo()

onMounted(() => {
  // 挂载给App调用的函数
  window.showSourceCode = showSourceCode
  window.animateSort = animateSort
  window.highlightLineNumber = highlightLineNumber

  // 代码高亮
  Prism.highlightAll()
})

onUpdated(() => Prism.highlightAll())

// 以下是挂载给App调用的函数
/**
 * 显示算法源码
 * @param algorithmName 算法名称
 */
function showSourceCode(algorithmName: string) {
  _sourceCode.value = algo.getSourceCode(algorithmName)
}

/**
 * 动画排序
 * @param algorithmName 算法名称
 * @param a 数组
 */
function animateSort(algorithmName: string, a: number[]) {
  algo.animateSort(algorithmName, a)
}

/**
 * 高亮代码行
 */
function highlightLineNumber(lineNumber: number) {
  _highlightLineNumber.value = lineNumber
}
</script>

<template>
  <div>
    <pre class="line-numbers" :data-line="_highlightLineNumber">
      <code class="language-js">
        {{ _sourceCode }}
      </code>
    </pre>
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style>
/*  代码字体大小 */
pre[class*="language-"] {
  font-size: 12px;
}
/* 代码行高亮背景色 */
.line-highlight {
  background-color: #83BA8280;
}
</style>
