import { Correo } from './correo';

export class Estadisticas {
    public static asuntos(correos: Correo[]): string[] {
        return correos.map(c => c.asunto);
    }
}