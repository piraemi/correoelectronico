import { Correo } from './correo';
import { GestorBandejas } from './gestorbandejas';
import { BandejaEliminados } from './bandejas';

export class Papelera {
    private _eliminados: BandejaEliminados;
    private _origenes: Map<number, GestorBandejas> = new Map();

    constructor(eliminados: BandejaEliminados) {
        this._eliminados = eliminados;
    }

    public eliminar(correo: Correo, origen: GestorBandejas): void {
        Papelera.exigir(!(origen instanceof BandejaEliminados), "El correo ya está en Eliminados");
        Papelera.exigir(origen.existeCorreoPorID(correo.ID), `El correo ${correo.ID} no está en esa bandeja`);

        origen.eliminarCorreoPorID(correo.ID);
        this._eliminados.agregarCorreo(correo);
        this._origenes.set(correo.ID, origen);
    }

    private static exigir(condicion: boolean, mensaje: string): void {
        condicion || Papelera.lanzarError(mensaje);
    }

    private static lanzarError(mensaje: string): never {
        throw new Error(mensaje);
    }
        public restaurar(correo: Correo): void {
        const origen = this._origenes.get(correo.ID)
            ?? Papelera.lanzarError(`El correo ${correo.ID} no está en Eliminados`);

        this._eliminados.eliminarCorreoPorID(correo.ID);
        origen.agregarCorreo(correo);
        this._origenes.delete(correo.ID);
    }
}