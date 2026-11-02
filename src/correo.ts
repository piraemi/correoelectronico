import { Contacto } from "./contacto";

export class Correo {
    private static contador: number = 0;

    private _ID: number;
    private _asunto: string;
    private _contenido: string;
    private _remitente: Contacto;
    private _destinatarios: Contacto[];
    private _leido: boolean;
    private _favorito: boolean;

    constructor(asunto: string, contenido: string, remitente: Contacto, destinatarios: Contacto[]) {
        Correo.contador++;
        this._ID = Correo.contador;
        this._asunto = asunto;
        this._contenido = contenido;
        this._remitente = Correo.validarRemitente(remitente);
        this._destinatarios = [...destinatarios];
        this._leido = false;
        this._favorito = false;
    }

    public get ID(): number {
        return this._ID;
    }

    public get asunto(): string {
        return this._asunto;
    }

    public get contenido(): string {
        return this._contenido;
    }

    public get remitente(): Contacto {
        return this._remitente;
    }

    public get destinatarios(): Contacto[] {
        return [...this._destinatarios];
    }

    public get leido(): boolean {
        return this._leido;
    }

    public set leido(valor: boolean) {
        this._leido = valor;
    }

    public get favorito(): boolean {
        return this._favorito;
    }

    public set favorito(valor: boolean) {
        this._favorito = valor;
    }
        private static validarRemitente(remitente: Contacto): Contacto {
        return remitente instanceof Contacto
            ? remitente
            : Correo.lanzarError("El correo debe tener un remitente");
    }

    private static lanzarError(mensaje: string): never {
        throw new Error(mensaje);
    }
    public static reiniciarContador(): void {
        Correo.contador = 0;
    }
}