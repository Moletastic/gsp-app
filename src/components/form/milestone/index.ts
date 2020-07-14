import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { Milestone } from '@/types/core'
import DateField from '@/components/fields/date/index.vue'

@Component({
    components:{
        DateField
    }
})
export default class MilestoneForm extends Vue {
    
    @Prop({default: () => new Milestone()})
    form !: Milestone

    @Prop({default: false})
    disabled !: boolean

}