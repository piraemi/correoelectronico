import { Correo } from './correo';

export class GestorBandejas {
    private _correos: Correo[] = [];
    public agregarCorreo(correo: Correo): void {
        this._correos.push(correo);
    }
    public eliminarCorreoPorID(id: number): void {
        this._correos = this._correos.filter(correo => correo.ID !== id);
    }
    public existeCorreoPorID(id: number): boolean {
        return this._correos.some(correo => correo.ID === id);
    }
    public get correos(): Correo[] {
        return [...this._correos];
    }
}
