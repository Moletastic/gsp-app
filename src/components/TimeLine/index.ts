import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'

enum EventType {
    commit = "commit",
    meet = "meet",
    milestone = "milestone"
}

enum EventIcon {
    commit = "mdi-note",
    meet = "mdi-calendar",
    milestone = "mdi-package-variant-closed"
}

interface ProjectEvent {
    title: string
    type: EventType
}

@Component
export default class TimeLine extends Vue {

    icons = {
        commit: "mdi-tooltip-text",
        meet: "mdi-calendar",
        milestone: "mdi-package-variant-closed"
    }

    events: ProjectEvent[] = [
        {
            title: "Hito #1",
            type: EventType.milestone
        },
        {
            title: "Reunion #2",
            type: EventType.meet
        },
        {
            title: "Acuerdo #2",
            type: EventType.commit
        },
        {
            title: "Acuerdo #1",
            type: EventType.commit
        },
        {
            title: "Reunion #1",
            type: EventType.meet
        },
    ]

    mounted() {
        $debug('log', this.icons);
        $debug('log', this.events);
    }
}