import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { $debug } from "@/utils/";
import { $api } from "@/api";
import { Review, IRubric, Rubric } from "@/types/core/project/rubric";

@Component
export default class ReviewForm extends Vue {
    @Prop()
    readonly review!: Review;

    form: Review = new Review({});

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
            this.$store.commit(
                "set_rubrics",
                rubrics.map(r => new Rubric(r))
            );
        }
    }

    onSelectRubric(rubric: Rubric): void {
        this.form.rubric = new Rubric(rubric);
        this.form.rubric_id = rubric.id as number;
    }

    onSubmit(): void {
        this.$emit("change", this.form);
    }

    get rubrics(): Rubric[] {
        return this.$store.state.rubrics as Rubric[];
    }
}
