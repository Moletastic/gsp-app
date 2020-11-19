import { Vue, Component, Prop, Watch, Emit, Mixins } from 'vue-property-decorator'
import {Subject} from '@/types/core/project';
import FormValidation from '@/components/mixins/form-validation';
import {VVal} from '@/types';

@Component
export default class SubjectForm extends Mixins(FormValidation) {

    form = new Subject({});
    rules: VVal =  {
        name: [
            (val: string) => !!val || "Nombre requerido"
        ]
    }

    onSubmit() : void{
        if(this.validate()){
            this.sendForm()
        }
    }

    @Emit("submit")
    sendForm() : Subject {
        return new Subject(this.form);
    }

}
