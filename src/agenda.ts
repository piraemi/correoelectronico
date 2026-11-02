import { Contacto } from './contacto';

export class Agenda {
    private _contactos: Contacto[];

    constructor() {
        this._contactos = [];
    }


    public get contactos(): Contacto[] {
        return [...this._contactos];
    }


    public agregar(contacto: Contacto): void {
        Agenda.exigir(!this.existe(contacto.email), `Ya existe un contacto con el email ${contacto.email}`);
        this._contactos.push(contacto);
    }

    public buscar(email: string): Contacto | undefined {
        return this._contactos.find(c => c.email === email.toLowerCase());
    }

    public existe(email: string): boolean {
        return this.buscar(email) !== undefined;
    }
    public modificar(email: string, nuevoNombre: string, nuevoEmail: string): void {
        const contacto = this.buscarObligatorio(email);
        Agenda.exigir(
            nuevoEmail.toLowerCase() === contacto.email || !this.existe(nuevoEmail),
            `Ya existe un contacto con el email ${nuevoEmail}`
        );
        contacto.nombreCompleto = nuevoNombre;
        contacto.email = nuevoEmail;
    }
    public eliminar(email: string): void {
        this.buscarObligatorio(email);
        this._contactos = this._contactos.filter(c => c.email !== email.toLowerCase());
    }

    private buscarObligatorio(email: string): Contacto {
        return this.buscar(email) ?? Agenda.lanzarError(`No existe un contacto con el email ${email}`);
    }
    private static exigir(condicion: boolean, mensaje: string): void {
        condicion || Agenda.lanzarError(mensaje);
    }

    private static lanzarError(mensaje: string): never {
        throw new Error(mensaje);
    }
}






