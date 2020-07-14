import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import ProjectForm from '@/components/form/project/index.vue'

@Component({
    components: {
        ProjectForm
    }
})
export default class NewProjectView extends Vue {
    
}