import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { ITimeLineItem } from '@/types/vuetify'

@Component
export default class TimeLineForm extends Vue {
    
    @Prop({default: () => []})
    items !: ITimeLineItem[]

    get orderedItems(){
        return this.items.sort((a,b) => (b.date.valueOf() - a.date.valueOf()))
    }

}