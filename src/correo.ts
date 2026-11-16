import { Contacto } from "./contacto";
import { ValidadorCorreo } from "./validadorCorreo";

export class Correo {

    private _ID: number;
    private _asunto: string;
    private _contenido: string;
    private _remitente: Contacto;
    private _destinatarios: Contacto[];
    private _Noleido: boolean;
    private _favorito: boolean;

    constructor(ID: number, asunto: string = "", contenido: string = "", remitente: Contacto, destinatarios: Contacto[] = []) {
        this._ID = ID;
        this._asunto = asunto;
        this._contenido = contenido;
        this._remitente = remitente;
        this._destinatarios = [...destinatarios];
        this._Noleido = true;
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

    public get Noleido(): boolean {
        return this._Noleido;
    }

    public set Noleido(valor: boolean) {
        this._Noleido = valor;
    }

    public get favorito(): boolean {
        return this._favorito;
    }

    public set favorito(valor: boolean) {
        this._favorito = valor;
    }
   public set asunto(nuevoAsunto: string) {this._asunto = nuevoAsunto; }
   public set contenido(nuevoContenido: string) {this._contenido = nuevoContenido;}
   public set destinatarios(nuevosDestinatarios: Contacto[]) {this._destinatarios = [...nuevosDestinatarios]}
   public clonar(): Correo {
    return new Correo(
      this._ID,
      this._asunto,
      this._contenido,
      this._remitente,
      [...this._destinatarios] 
    );
  }
}