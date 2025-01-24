import { App } from 'vue';
import MemiLogViewer from './components/MemiLogViewer.vue';


export { MemiLogViewer };
export * from './types/MemiLog';
export * from './composables/useMemiLog';

export default {
  install: (app: App) => {
    app.component('MemiLogViewer', MemiLogViewer);
  },
};