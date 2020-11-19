import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ErrorView extends Vue {

    goLogin(): void{
        this.$router.push({name: "login"})
    }
}
