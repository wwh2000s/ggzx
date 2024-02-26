import Category from './Category/index.vue'
import SvgIcon from './SvgIcon/index.vue';

import Pagionation from './pagionation/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App, Component } from 'vue';
const components: { [name: string]: Component } = { SvgIcon,Pagionation,Category };
export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        });
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}