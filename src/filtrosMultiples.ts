import { Filtro } from './filtro';
import { Predicado, AND, NOT } from './predicados';


export const NoLeido: Predicado = c => c.Noleido;
export const esFavorito: Predicado = c => c.favorito;
export const asuntoTieneUrgente: Predicado = c => c.asunto.toLowerCase().includes("urgente");
export const multiplesDestinos: Predicado = c => c.destinatarios.length > 1;

export const filtroLeidosFavoritos = new Filtro(
  "Leídos y Favoritos",
  AND(NoLeido, esFavorito)
);

export const filtroUrgentesNoLeidos = new Filtro(
  "Urgentes por revisar",
  AND(asuntoTieneUrgente, (NoLeido))
);
export const filtroMasivosNoFavoritos = new Filtro(
  "Difusiones estandar",
  AND(multiplesDestinos, NOT(esFavorito))
);