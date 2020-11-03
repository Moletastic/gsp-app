import { Component, Vue, Prop } from 'vue-property-decorator'
import { ILoopBar } from '@/types/vuetify'

@Component
export default class LoadingBar extends Vue {
    @Prop({default: {}})
    loading!: ILoopBar
}
