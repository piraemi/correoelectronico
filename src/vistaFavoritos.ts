import { Correo } from './correo';
import { GestorBandejas } from './gestorbandejas';
import { BandejaEliminados } from './bandejas';
import { esFavorito } from './predicados';

export class VistaFavoritos {
    public static obtener(bandejas: GestorBandejas[]): Correo[] {
        const favoritos = bandejas
            .filter(b => !(b instanceof BandejaEliminados))
            .flatMap(b => b.correos)
            .filter(esFavorito);

        return favoritos.filter((c, i) => favoritos.findIndex(x => x.ID === c.ID) === i);
    }
}