export interface Booking{
    id?:number,
    userId:number,
    accommodationId:number,
    startDate?:Date,
    endDate?:Date,
    persons:number,
    Totalprice:number,
    status: "pending"|"confirmed"|"cancelled",
    createdAt?:Date,
    accommodation:string,
    email?:string
}