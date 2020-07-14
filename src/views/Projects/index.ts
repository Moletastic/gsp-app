import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug, generateID } from '@/utils'
import { IProject,Project, Subject, ProjectState } from '@/types/core/project';
import { Student } from '@/types/core/access/student';
import { User } from '@/types/core/access/user';
import { Teacher } from '@/types/core/access/teacher';
import ProjectForm from '@/components/form/project/index.vue'
import axios, { AxiosResponse } from 'axios'
import { $api } from '@/api';

interface TempProject {
    id: string
    title: string
    author: string
    icon: string
    topics: string[],
    main_topic : string
}

@Component({
    components:{
        ProjectForm
    }
})
export default class ProjectsView extends Vue {

    projects : Array<Project> = [];

    states = Object.freeze(Object.keys(ProjectState))
    teachers : Teacher[] = [];
    years = [2019, 2020, 2021, 2022, 2023];

    filtered = false;
    filters = {
        year : 2020
    }

    scores : {[key: string] : {done_meets: number, meets: number, milestones: number, solved_milestones: number}} = {}

    modal = false;

    mounted() {
        this.init();
    }

    async init(){
        this.teachers = await this.getTeachers();
        this.projects = await this.getProjects();
        this.projects.map(project => {
            this.scores[project.id] = {
                done_meets: project.get_done_meets(),
                meets : project.meets.length,
                milestones: project.milestones.length,
                solved_milestones: project.get_solved_milestone()
            }
        })
    }

    openModal(){
        this.modal = true;
    }

    createNewProject(){
        this.$router.push("projects-add");
    }

    onProjectSubmited(project: Project){
        this.scores[project.id] = {
            done_meets : 0,
            meets : project.meets.length,
            milestones : project.milestones.length,
            solved_milestones : 0
        }
        this.$store.commit("add_project", Object.assign({}, project));
        this.modal = false;
    }

    goProject(id: string){
        this.$router.push("/projects/" + id);
    }

    async getProjects() : Promise<Array<Project>>{
        const data : Array<Project> = await $api.get("projects");
        return data.map(row => new Project(row))
    }

    async getTeachers(): Promise<Teacher[]> {
        const data : Array<Teacher> = await $api.get("teachers");
        return data
    }

}