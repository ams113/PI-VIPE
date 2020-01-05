export class Video {

    constructor (
        public nombre: string,
        public tipo: string,
        public categoria: string,
        public director?: string,
        public descripcion?: string,
        public img?: string,
        public _id?: string
    ) { }

}
