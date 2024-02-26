export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}
export interface CategoryObj{
    id:string|number,
    name:string,
    category1Id?:number,
    category2Id?:number,
}
export interface categoryResponseDate extends ResponseData{
    data:CategoryObj[]
}

export interface AttrValue {
    id?:number,
    valueName:string,
    attrId?:number,
    flag?:boolean
}
export type AttrValueList = AttrValue[]


export interface Attr {
    id?:number,
    attrName:string,
    
    categoryId:number|string,
    categoryLevel:number,
    attrValueList:AttrValueList
}
export type AttrList = Attr[]

export interface AttrResponseDate extends ResponseData{
    data:Attr[]
}