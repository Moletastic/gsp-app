import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug, generateID } from '@/utils'
import { Project, Subject, Link, LinkType, LinkIcon, Milestone } from '@/types/core/project'
import LinkForm from '@/components/form/link/index.vue'
import DateField from '@/components/fields/date/index.vue'
import TimeLine from '@/components/timelines/form/index.vue'
import StudentForm from '@/components/form/user/student/index.vue'
import { Student } from '@/types/core/access/student'
import { User } from '@/types/core/access/user'
import { Teacher } from '@/types/core/access/teacher'
import { $api } from '@/api'
import moment, { Moment } from 'moment'

@Component({
    components:{LinkForm, DateField,TimeLine, StudentForm}
})
export default class ProjectForm extends Vue {
    form = new Project()
    milestones = 2
    subjects : Subject[] = []
    students : Student[] = []
    teachers : Teacher[] = []
    linktypes : LinkType[] = []

    tag = "";
    tags : string[] = [];

    student_modal = false;

    private initForm(){
        this.form.subjects = [this.subjects[0]]
    }

    mounted(){
        this.init()
    }

    async init(){
        type ProjectDep = [Array<Subject>, Array<Student>, Array<Teacher>, Array<LinkType>]
        const promises : Promise<ProjectDep> = Promise.all([
            $api.get<Subject>("subjects"),
            $api.get<Student>("students"),
            $api.get<Teacher>("teachers"),
            $api.get<LinkType>("linktypes")
        ]);
        const results = await promises;
        this.subjects = results[0];
        this.students = results[1];
        this.teachers = results[2];
        this.linktypes = results[3];
        $debug('log', this.linktypes);
        this.initForm()
    }

    onSubmit(){
        this.form.tags = this.tags;
        //this.form.id = generateID("pro");
        $api.create("projects", this.form.getClean());
        //this.$emit("submited", Object.assign({}, this.form))
        //this.form = new Project()
        //this.initForm();
    }

    enterTag(){
        const tag = this.tag;
        const exists = this.tags.includes(tag);
        if(!exists){
            this.tags.push(tag);
        }
        this.tag = "";
    }

    removeTag(tag: string){
        const index = this.tags.indexOf(tag);
        this.$delete(this.tags, index);
    }

    addEmptyLink(){
        this.form.links.push(new Link({type: this.linktypes[0]}))
    }

    addEmptyMilestone(){
        this.form.milestones.push(new Milestone({title: "Avance #", date: moment(new Date())}))
    }

    removeMilestone(id: string){
        const index = this.form.milestones.findIndex(milestone => milestone.id === id);
        if(index !== -1){
            this.$delete(this.form.milestones, index);
        }
    }

    onChangeDateMilestone(date: Moment, id: string){
        const index = this.form.milestones.findIndex(mil => mil.id === id);
        this.form.milestones[index].date = date;
    }

    get disabled(){
        return this.form.title === "" || !this.form.title
    }

    async getLinkTypes(): Promise<LinkType[]>{
        const res = await $api.get<LinkType>("linktypes");
        return res
    }

    get timelineItems(){
        return this.form.milestones.map(milestone => {
            return {
                title: milestone.title,
                date: milestone.date
            }
        })
    }

}
