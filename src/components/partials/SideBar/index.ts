import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'

interface SideLink {
    title: string,
    icon : string,
    to : string
    active: boolean,
}

@Component
export default class SideBar extends Vue {
    links : Array<SideLink> = [
        {
            title: 'Inicio',
            icon : 'mdi-home',
            active : true,
            to : '/'
        },
        {
            title: 'Proyectos',
            icon : 'mdi-school',
            active : true,
            to : '/projects'
        }
    ]
    
    goTo(link: string){
        this.$router.push(link);
    }

    get active(){
        return this.$store.state.sidebar;
    }

    set active(state){
        this.$store.dispatch('toggle_sidebar');
    }

}