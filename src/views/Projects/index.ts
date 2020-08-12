import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug, generateID } from '@/utils'
import { IProject,Project, Subject, ProjectState, FormatProjectState, ProjectType, FormatProjectType } from '@/types/core/project';
import { Student } from '@/types/core/access/student';
import { User } from '@/types/core/access/user';
import { Teacher } from '@/types/core/access/teacher';
import ProjectForm from '@/components/form/project/index.vue'
import axios, { AxiosResponse } from 'axios'
import { $api } from '@/api';
import { filter } from 'vue/types/umd';

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

    fmt_type = FormatProjectType

    project_types = Object.keys(FormatProjectType).map((type) => {
        return {
            key: type,
            val: FormatProjectType[type as ProjectType]
        }
    })

    states = Object.keys(FormatProjectState).map(state => {
        return {
            key: state,
            val: FormatProjectState[state]
        }
    })
    teachers : Teacher[] = [];

    years = [2019, 2020, 2021, 2022, 2023];

    filtered = false;
    filters = {
        name: undefined as string | undefined,
        teacher: undefined as Teacher | undefined,
        state: undefined as ProjectState | undefined,
        year : 2020,
        project_type: undefined as ProjectType | undefined,
    }

    scores : {[key: string] : {done_meets: number, meets: number, milestones: number, solved_milestones: number}} = {}

    modal = false;

    mounted() {
        this.init();
    }

    async init(){
        this.teachers = await this.getTeachers();
        this.projects = await this.getProjects();
        this.$store.commit("set_projects", this.projects);
        this.projects.map(project => {
            this.scores[project.id] = {
                done_meets: project.get_done_meets(),
                meets : project.meets.length,
                milestones: project.milestones.length,
                solved_milestones: project.get_solved_milestone()
            }
        })
    }

    applyFilter(){
        let filteredProjects : Project[] = this.$store.state.projects;
        const {name,state,teacher,year,project_type} = this.filters;
        if(name && name !== ""){
            filteredProjects = filteredProjects.filter(project => project.title.toLowerCase().includes(name))
        }
        if(project_type){
            filteredProjects = filteredProjects.filter(project => project.project_type === project_type)
        }
        if(teacher){
            filteredProjects = filteredProjects.filter(project => project.guides.map(teach => teach.id).includes(teacher.id))
        }
        this.projects = filteredProjects;
    }

    clearFilter(){
        this.projects = this.$store.state.projects;
        this.filters = {
            name: undefined,
            state: undefined,
            teacher: undefined,
            year: 2020,
            project_type: undefined
        }
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
