import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
    get year() : number {
        return new Date().getFullYear();
    }

    get text() : string {
        return `UTEM GSP - ${this.year}`
    }

}
