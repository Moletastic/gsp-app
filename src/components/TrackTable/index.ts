import { Component, Vue, Watch } from 'vue-property-decorator'

enum ActivityType{
    "meet" = "Reunion",
    "agreement" = "Acuerdo",
    "progress" = "Avance"
}



@Component
export default class TrackTable extends Vue {
    headers = [
        { text: 'Actividad', value: 'name' },
        { text: 'Categoria', value: 'type' },
        { text: 'Detalles', value: 'details' }
    ]
    types = {
        "meet" : "Reunion",
        "agreement" : "Acuerdo",
        "progress" : "Avance"
    }

    meetplace = {
        "TEAMS" : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bemidjistate.edu%2Foffices%2Fits%2Fwp-content%2Fuploads%2Fsites%2F60%2F2018%2F03%2Ficon-microsoft-teams.png&f=1&nofb=1",
        "ZOOM" : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.macupdate.com%2Fimages%2Ficons512%2F52421.png&f=1&nofb=1"
    }

    items = [
        {
            name : "Reunion #1",
            type: 'meet',
            date : "27/04",
            place: 'TEAMS'
        },
        {
            name: 'Acuerdo #1',
            type: 'agreement',
            solved: false
        },
        {
            name: 'Avance #1',
            type: 'progress',
            uploaded: true,
        },
        {
            name: 'Avance #2',
            type: 'progress',
            uploaded: false,
        },
        {
            name : "Reunion #1",
            type: 'meet',
            date : "06/05",
            place: 'ZOOM'
        }
    ]

}