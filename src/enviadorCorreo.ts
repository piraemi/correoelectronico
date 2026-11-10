import { Correo } from "./correo";
import { BandejaEnviados, BandejaRecibidos, BandejaBorradores } from "./bandejas";

export class EnviadorCorreo {
    private _enviados: BandejaEnviados;
    private _borradores: BandejaBorradores;
    private _mapaRecibidos: Map<string, BandejaRecibidos>;

    constructor(
        enviados: BandejaEnviados,
        borradores: BandejaBorradores,
        mapaRecibidos: Map<string, BandejaRecibidos> = new Map()
    ) {
        this._enviados = enviados;
        this._borradores = borradores;
        this._mapaRecibidos = mapaRecibidos;
    }
    public obtenerBandejaRecibidosDe(email: string): BandejaRecibidos | undefined {
        return this._mapaRecibidos.get(email);
    }

    public enviarCorreo(correo: Correo): void {
        const yaEnviado = this._enviados.existeCorreoPorID(correo.ID);
        if (yaEnviado) {
            throw new Error(`El correo con ID ${correo.ID} ya ha sido enviado`);
        }

        correo.destinatarios.forEach(destinatario => {
            const email = destinatario.email;
            if (!this._mapaRecibidos.has(email)) {
                this._mapaRecibidos.set(email, new BandejaRecibidos());
            }
            this._mapaRecibidos.get(email)!.agregarCorreo(correo);
        });

        this._borradores.eliminarCorreoPorID(correo.ID);
        this._enviados.agregarCorreo(correo);
    }
}