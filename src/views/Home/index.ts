import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils';

@Component
export default class HomeView extends Vue {
    mounted(){
        $debug('log', 'hola');
    }
}