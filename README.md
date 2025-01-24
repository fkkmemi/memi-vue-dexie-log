# memi-log

logging with dexie(indexedDB)

# install

```zsh
$ npm i memi-vue-dexie-log
```

# how to use

**sample.vue**
```vue
<script setup lang="ts">
import type { MemiLog } from 'memi-vue-dexie-log'
import { MemiLogViewer, useMemiLog } from 'memi-vue-dexie-log'

const { add, clear, logsCountObservable, saveFile } = useMemiLog()

const count = ref(0)
const logAdd = () => {
  const log: Omit<MemiLog, 'id'> = {
    isUp: Math.random() >= 0.5,
    text: 'test ' + Math.random(),
    createdAt: new Date().getTime(),
  }
  add(log)
}
const subscriptionCount = logsCountObservable().subscribe({
  next: (r) => {
    count.value = r
  },
  error: (err) => {
    console.error(err)
  },
})
onUnmounted(() => {
  subscriptionCount.unsubscribe()
})

</script>
<template>
  <div>    
    <div>{{ count }}</div>
    <div>
      <button @click="logAdd"  >add</button>
      <button @click="clear"  >clear</button>
      <button @click="saveFile"  >save</button>
    </div>      
     
    <MemiLogViewer />
  </div>
</template>
```


