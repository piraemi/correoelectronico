import { Correo } from './correo';

export type Predicado = (correo: Correo) => boolean;

export const remitenteDeDominio = (dominio: string): Predicado =>
    c => c.remitente.email.endsWith(dominio.toLowerCase());

export const asuntoContiene = (texto: string): Predicado =>
    c => c.asunto.toLowerCase().includes(texto.toLowerCase());

export const contenidoContiene = (texto: string): Predicado =>
    c => c.contenido.toLowerCase().includes(texto.toLowerCase());

export const noLeido: Predicado = c => !c.leido;

export const esFavorito: Predicado = c => c.favorito;