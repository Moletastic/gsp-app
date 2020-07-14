import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { Link, LinkIcon, LinkType } from '@/types/core/project'

@Component
export default class LinkForm extends Vue {

    @Prop()
    types !: LinkType[]

    @Prop({default: () => new Link({})})
    form !: Link

    onSelect(obj:LinkType){
        this.form.type = obj;
    }

}
