export interface loginformData{
    username:string,
    password:string
}
export interface Response{
    code:number,
    message:string,
    ok:boolean
}
export interface loginResponseData extends Response{
    data:string
}

export interface userInfoResponseData extends Response{
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string
    }
}
