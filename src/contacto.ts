export class Contacto {
    private _nombreCompleto: string;
    private _email: string;
    
    constructor(nombreCompleto: string, email: string) {
        this._nombreCompleto = nombreCompleto;
        this._email = Contacto.validarEmail(email);
    }
    public get nombreCompleto(): string {
        return this._nombreCompleto;
    }
    public get email(): string {
        return this._email;
    }
    public set nombreCompleto(nuevoNombre: string) {
        this._nombreCompleto = nuevoNombre;
    }

    public set email(nuevoEmail: string) {
        this._email = Contacto.validarEmail(nuevoEmail);
    }
    private static validarEmail(email: string): string {
        return email.includes('@') && email.includes('.')
            ? email.toLowerCase()
            : Contacto.lanzarError(`El email "${email}" no tiene un formato válido`);
    }

    private static lanzarError(mensaje: string): never {
        throw new Error(mensaje);
    }
}