import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { Student } from '@/types/core/access/student'
import { User } from '@/types/core/access/user'
import { Career } from '@/types/core/education';
import { $api } from '@/api';

@Component
export default class StudentForm extends Vue {
    
    form = new Student(new User());

    careers : Career[] = []

    mounted(){
        this.init()
    }

    async init(){
        this.careers = await this.getCareers();
    }

    async getCareers(){
        const data : Array<Career> = await $api.get("careers");
        return data
    }

    generateNick(){
        const { first_name, last_name } = this.form.user;
        this.form.user.nick = first_name.split(' ')[0].toLowerCase() + "." + last_name.split(" ")[0].toLowerCase()
    }

}