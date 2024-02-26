import request from "@/utils/request";
import type { AttrResponseDate, categoryResponseDate,Attr } from "./type";
enum API {
    C1_URL="/admin/product/getCategory1",
    C2_URL="/admin/product/getCategory2/",
    C3_URL="/admin/product/getCategory3/",
    ATTR_URL="/admin/product/attrInfoList/",
    ADDORUPDATEATTR_URL="/admin/product/saveAttrInfo/",
    DELETEATTR_URL="/admin/product/deleteAttr/"

}
export const reqC1 = () =>request.get<any,categoryResponseDate>(API.C1_URL)
export const reqC2 = (category1Id:number|string) =>request.get<any,categoryResponseDate>(API.C2_URL+category1Id)
export const reqC3 = (category2Id:number|string) =>request.get<any,categoryResponseDate>(API.C3_URL+category2Id)
export const reqAttr = (category1Id:number|string,category2Id:number|string,category3Id:number|string) =>request.get<any,AttrResponseDate>(API.ATTR_URL+`${category1Id}/${category2Id}/${category3Id}`)
export const reqAddOrUpdate = (data:Attr)=>request.post(API.ADDORUPDATEATTR_URL,data)
export const reqRemoveAttr = (attrId:number) =>request.delete<any,any>(API.DELETEATTR_URL+attrId)