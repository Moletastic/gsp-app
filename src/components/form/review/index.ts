import {
    Vue,
    Component,
    Prop,
    Watch,
    Mixins,
    Emit
} from "vue-property-decorator";
import { $api } from "@/api";
import { Review, IRubric, Rubric } from "@/types/core/project/rubric";
import { projectModule } from "@/store";
import FormValidation from "@/components/mixins/form-validation";
import { VVal } from "@/types";

@Component
export default class ReviewForm extends Mixins(FormValidation) {
    @Prop()
    readonly review!: Review;

    form: Review = new Review({});

    rules: VVal = {
        name: [(val: string) => !!val || "Nombre requerido"],
        rubric: [(val: Rubric) => !!val || "Rubrica requerida"],
        file_url: [(val: string) => !!val || "Campo requerido"]
    };

    @Watch("review")
    onChange(review: Review): void {
        this.form = review;
    }

    mounted(): void {
        this.init();
    }

    async init(): Promise<void> {
        if (!this.rubrics || this.rubrics.length === 0) {
            const rubrics: IRubric[] = await $api.get("rubric");
            projectModule.setRubrics(rubrics);
        }
    }

    onSelectRubric(rubric: Rubric): void {
        this.form.rubric = new Rubric(rubric);
        this.form.rubric_id = rubric.id as number;
    }

    onSubmit(): void {
        this.form.score = Number(this.form.score) || this.review.score;
        if (this.validate()) {
            this.sendData();
        }
    }

    @Emit("change")
    sendData(): Review {
        return new Review(this.form);
    }

    get rubrics(): Rubric[] {
        return projectModule.rubrics;
    }

    get rubric_url(): string {
        if (!this.form.rubric) {
            return "";
        }
        return "Descargar desde: " + this.form.rubric.file_url;
    }
}
