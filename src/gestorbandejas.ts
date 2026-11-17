import { Correo } from './correo';
import { noLeido } from './predicados';

export abstract class GestorBandejas {
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
    public get noLeidos(): Correo[] {
    return this._correos.filter(noLeido);
    }
    public obtenerPorID(id:number): Correo | undefined {
        return this._correos.find(c => c.ID === id)
    }
}
