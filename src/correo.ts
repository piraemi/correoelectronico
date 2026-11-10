import { Contacto } from "./contacto";
import { ValidadorCorreo } from "./validadorCorreo";

export class Correo {
    private static contador: number = 0;

    private _ID: number;
    private _asunto: string;
    private _contenido: string;
    private _remitente: Contacto;
    private _destinatarios: Contacto[];
    private _leido: boolean;
    private _favorito: boolean;

    constructor(ID: number, asunto: string, contenido: string, remitente: Contacto, destinatarios: Contacto[]) {
        this._ID = ID;
        this._asunto = asunto;
        this._contenido = contenido;
        this._remitente = remitente;
        this._destinatarios = [...destinatarios];
        
         ValidadorCorreo.validarCorreo(this);

       
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
   
}