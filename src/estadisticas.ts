import { Correo } from './correo';
import { Predicado } from './predicados';

export class Estadisticas {
    public static asuntos(correos: Correo[]): string[] {
        return correos.map(c => c.asunto);
    }

    public static queCumplen(correos: Correo[], condicion: Predicado): Correo[] {
        return correos.filter(condicion);
    }
        public static contar(correos: Correo[], condicion: Predicado): number {
        return correos.reduce((total, c) => condicion(c) ? total + 1 : total, 0);
    }
}