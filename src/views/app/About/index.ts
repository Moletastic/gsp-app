import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class AboutView extends Vue {
    text = `UTEM GSP (acrónimo de Gestor de Seguimiento de Proyectos) es un proyecto informático desarrollado para su presentación como trabajo final de título para la carrera de Ingeniería en computación, mención informática, de la Universidad Tecnológica Metropolitana (UTEM).
        UTEM GSP consiste en un sistema informático basado en WEB que se presenta como solución prototipo y centralizada a las labores de gestión de proyectos de título llevadas acabo por Jefatura y Docentes del Departamento de Informática y Computación de la UTEM.
        UTEM GSP ha sido desarrollado por el estudiante Jacob Isaac Romero Landeros, guiado por los profesores guía Mauro Castilloy David Castro, a través del ciclo académico de las asignaturas de Trabajo de Título 1 y 2 durante el año 2020.
    `;
}
