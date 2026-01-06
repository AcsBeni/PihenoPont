export interface Accommodations{
    id:number,
    name:string,
    description:string,
    address:string,
    capacity:number,
    basePrice:number,
    active:boolean,
    createdAt?:Date,
    imagePath?:string
}