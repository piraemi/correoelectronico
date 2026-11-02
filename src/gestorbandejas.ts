import { Correo } from './correo';

export class GestorBandejas {
    private _bandejaEnviados: Correo[];
    private _bandejaBorrador: Correo[];

    constructor() {
        this._bandejaEnviados = [];
        this._bandejaBorrador = [];
    }
    public enviarCorreo(correo: Correo): void {
        GestorBandejas.exigir(correo.asunto.trim() !== "", "El correo debe tener asunto");                          // NUEVO
        GestorBandejas.exigir(correo.destinatarios.length > 0, "El correo debe tener al menos un destinatario");    // NUEVO

        const yaEnviado = this._bandejaEnviados.some(c => c.ID === correo.ID);
        if (yaEnviado) {
            throw new Error(`El correo con ID ${correo.ID} ya ha sido enviado.`);
        }
        const indiceEnBorrador = this._bandejaBorrador.findIndex(c => c.ID === correo.ID);
        if (indiceEnBorrador !== -1) {
            this._bandejaBorrador.splice(indiceEnBorrador, 1);
        }
        this._bandejaEnviados.push(correo);
    }
    public guardarBorrador(correo: Correo): void {
        const yaEnBorrador = this._bandejaBorrador.some(c => c.ID === correo.ID);
        if (yaEnBorrador) {
            throw new Error(`El correo con ID ${correo.ID} ya está en borradores.`);
        }
        this._bandejaBorrador.push(correo);
    }
    public get bandejaEnviados(): Correo[] {
        return [...this._bandejaEnviados];
    }
    public get bandejaBorrador(): Correo[] {
        return [...this._bandejaBorrador];
    }

    private static exigir(condicion: boolean, mensaje: string): void {
        condicion || GestorBandejas.lanzarError(mensaje);
    }

    private static lanzarError(mensaje: string): never {
        throw new Error(mensaje);
    }
}