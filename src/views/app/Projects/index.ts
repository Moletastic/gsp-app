import { Component, Vue } from "vue-property-decorator";
import { Project, ProjectState, ProjectType } from "@/types/core/project";
import { Teacher } from "@/types/core/access/teacher";
import ProjectTable from "@/components/tables/projects/index.vue";
import ProjectForm from "@/components/form/project/index.vue";
import { $api } from "@/api";

import { DataTable } from "@/types/vuetify";
import { projectModule } from "@/store";

@Component({
    components: {
        ProjectForm,
        ProjectTable
    }
})
export default class ProjectsView extends Vue {
    projects: Array<Project> = [];
    table: DataTable<Project> = new DataTable<Project>({
        headers: [
            {
                text: "Título",
                value: "title"
            },
            {
                text: "Tipo",
                value: "project_type"
            },
            {
                text: "Hecho por",
                value: "authors"
            },
            {
                text: "Guiado Por",
                value: "guides"
            },
            {
                text: "Acciones",
                value: "_actions"
            }
        ],
        rowsPerPageText: "Proyectos por página"
    });

    teachers: Teacher[] = [];

    years = [2019, 2020, 2021, 2022, 2023];

    filtered = false;
    filters = {
        name: undefined as string | undefined,
        teacher: undefined as Teacher | undefined,
        state: undefined as ProjectState | undefined,
        year: 2020,
        project_type: undefined as ProjectType | undefined
    };

    scores: {
        [key: string]: {
            done_meets: number;
            meets: number;
            milestones: number;
            solved_milestones: number;
        };
    } = {};
    loading = false;

    modal = false;

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        this.loading = true;
        this.teachers = await this.getTeachers();
        this.projects = await this.getProjects();
        this.table.data = this.projects;
        this.loading = false;
        //this.$store.commit("set_projects", this.projects);
    }

    applyFilter(): void {
        let filteredProjects: Project[] = projectModule.projects;
        const { name, teacher, project_type } = this.filters;
        if (name && name !== "") {
            filteredProjects = filteredProjects.filter(project =>
                project.title.toLowerCase().includes(name)
            );
        }
        if (project_type) {
            filteredProjects = filteredProjects.filter(
                project => project.project_type === project_type
            );
        }
        if (teacher) {
            filteredProjects = filteredProjects.filter(project =>
                project.guides.map(teach => teach.id).includes(teacher.id)
            );
        }
        this.projects = filteredProjects;
    }

    clearFilter(): void {
        this.projects = projectModule.projects;
        this.filters = {
            name: undefined,
            state: undefined,
            teacher: undefined,
            year: 2020,
            project_type: undefined
        };
    }

    openModal(): void {
        this.modal = true;
    }

    createNewProject(): void {
        this.$router.push({ name: "new-project" });
    }

    goProject(id: string): void {
        this.$router.push({ name: "project", params: { id } });
    }

    async getProjects(): Promise<Array<Project>> {
        const data: Array<Project> = await $api.get("project");
        return data.map(row => new Project(row));
    }

    async getTeachers(): Promise<Teacher[]> {
        const data: Array<Teacher> = await $api.get("teacher");
        return data;
    }
}
