import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import {VForm} from '@/types';
import {$debug} from '@/utils';

@Component
export default class FormValidation extends Vue {

    validate() : boolean {
        if (!this.$refs.form) {
            $debug("log", "Form ref not found")
            return false;
        }
        const form = this.$refs.form as VForm;
        if (!form.validate()) {
            return false;
        }
        return true;
    }

}
