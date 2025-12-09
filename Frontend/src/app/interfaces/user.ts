export interface Users{
    ID?:number,
    name:string,
    password:string,
    email:string,
    role?: "admin" |"user",
    created_at?:Date
}