export class Correo {
    private _ID: number;
    private _asunto: string;
    private _contenido: string;
    private _remitente: string;
    private _destinatarios: string[];
    private _leido: boolean;
    private _favorito: boolean; 

    constructor(ID: number, asunto: string, contenido: string, remitente: string, destinatarios: string[]) {
        this._ID = ID;
        this._asunto = asunto;
        this._contenido = contenido;
        this._remitente = remitente;
        this._destinatarios = destinatarios;
        if (destinatarios.length === 0) {
            throw new Error("Debe haber al menos un destinatario");
        }
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

    public get remitente(): string {
        return this._remitente;
    }

    public get destinatarios(): string[]{
        return [...this._destinatarios];
    }

    public get leido(): boolean {
        return this._leido;
    }

    public set leido(value: boolean) {
        this._leido = value;
    }

    public get favorito(): boolean {
        return this._favorito;
    }

    public set favorito(value: boolean) {
        this._favorito = value;
    }
}