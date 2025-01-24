<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, computed, onUnmounted } from 'vue'
import { MemiLog } from '../types/MemiLog'
import { useMemiLog  } from '../composables/useMemiLog'
// dayjs.locale('ko')
import 'dayjs/locale/ko'
dayjs.locale('ko')
const logs = ref<MemiLog[]>([])
const { logsObservable } = useMemiLog()
const subscription = logsObservable(10).subscribe({
  next: (r) => {
    logs.value = r
  },
  error: (err) => {
    console.error(err)
  },
})

const text = computed(() =>
  logs.value
    .map((l) => {
      return `${l.isUp ? '↑' : '↓'} ${dayjs(l.createdAt).format('YY.MM.DD a hh:mm:ss.SSS')} ${l.text}`
    })
    .reverse()
    .join('\n'),
)

onUnmounted(() => {
  subscription.unsubscribe()
})
</script>
<template>
  <textarea :value="text" rows="10" style="width: 100%; resize: none"></textarea>
</template>
