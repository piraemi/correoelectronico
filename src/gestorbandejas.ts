import {Correo} from './correo';

export class GestorBandejas {
   private _bandejaEnviados: Correo[];
    private _bandejaBorrador: Correo[];

    constructor() {
        this._bandejaEnviados = [];
        this._bandejaBorrador = [];
    }
    public enviarCorreo(correo: Correo): void {
     this._bandejaEnviados.push(correo); 
     const yaEnviado = this._bandejaEnviados.some(c => c.ID === correo.ID);
     if (yaEnviado) {
         throw new Error(`El correo con ID ${correo.ID} ya ha sido enviado.`);
     }
     const indiceEnBorrador = this._bandejaBorrador.findIndex(c => c.ID === correo.ID);
     if (indiceEnBorrador !== -1) {
         this._bandejaBorrador.splice(indiceEnBorrador, 1);
     }
     this.bandejaEnviados.push(correo);
    }
    public guardarBorrador(correo: Correo): void {
        this._bandejaBorrador.push(correo);
        const yaEnBorrador = this._bandejaBorrador.some(c => c.ID === correo.ID);
        if (yaEnBorrador) {
            throw new Error(`El correo con ID ${correo.ID} ya está en borradores.`);
        }
    }
        public get bandejaEnviados(): Correo[] {
        return [...this._bandejaEnviados];
    }
    public get bandejaBorrador(): Correo[] {
        return [...this._bandejaBorrador];
    }
   
    
}