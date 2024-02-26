import request from "@/utils/request";
enum API{
    SKU_URL="/admin/product/list/",
    //上架
    SALE_URL='/admin/product/onSale/',
    //下架
    CANCELSALE_URL='/admin/product/cancelSale/',
    //获取商品信息
    SKUINFO_URL='/admin/product/getSkuInfo/',
    //删除SKU
    DELETESKU_URL='/admin/product/deleteSku/',

}
export const reqSkuList =(page:number,limit:number)=>request.get(API.SKU_URL+`${page}/${limit}`)
//上架
export const reqSaleSku =(skuId:number)=>request.get(API.SALE_URL+skuId)
//下架
export const reqCancelSku =(skuId:number)=>request.get(API.CANCELSALE_URL+skuId)
//获取商品详情
export const reqSkuInfo =(skuId:number)=>request.get(API.SKUINFO_URL+skuId)
//删除SKU
export const reqRemoveSku =(skuId:number)=>request.delete(API.DELETESKU_URL+skuId)
