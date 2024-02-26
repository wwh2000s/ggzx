import request from '@/utils/request'
import type { TradeMark, TradeMarkResponseData } from './type';

enum API{
    TRADEMARK_URL="/admin/product/baseTrademark/",
    ADDTRADEMARK_URL="/admin/product/baseTrademark/save",
    UPDATEMARK_URL="/admin/product/baseTrademark/update",
    DELETEMARK_URL="/admin/product/baseTrademark/remove/"
}
export const reqHasTrademark = (page:number,limit:number)=>request.get<any,TradeMarkResponseData>(API.TRADEMARK_URL+`${page}/${limit}`);

export const reqAddOrUpdateTrademark = (data:TradeMark) =>{
    if(data.id){
        return request.put<any,any>(API.UPDATEMARK_URL,data)
    }else{
        return request.post<any,any>(API.ADDTRADEMARK_URL,data)
    }
}
export const reqDeleteTrademark = (id:number)=>request.delete<any,any>(API.DELETEMARK_URL+`${id}`)