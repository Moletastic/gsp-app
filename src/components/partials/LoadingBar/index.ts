import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { ILoopBar } from '@/types/vuetify'

@Component
export default class LoadingBar extends Vue {
    @Prop({default: {}})
    loading!: ILoopBar
}