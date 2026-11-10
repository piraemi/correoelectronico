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

export const AND = (p1: Predicado, p2: Predicado): Predicado => 
  (c: Correo) => p1(c) && p2(c);

export const OR = (p1: Predicado, p2: Predicado): Predicado => 
  (c: Correo) => p1(c) || p2(c);

export const NOT = (p: Predicado): Predicado => 
  (c: Correo) => !p(c);