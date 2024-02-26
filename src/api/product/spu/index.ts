import request from "@/utils/request";
import type { AllTradeMark, HasSaleAttrResponseData, HasSpuResponseDate, SaleAttrResponseData, SpuHasImg } from "./type";
enum API {
    HASSPU_URL = "/admin/product/",
    ALLTRAEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
    IMAGE_URL = "/admin/product/spuImageList/",
    SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
    //获取整个项目全部的销售属性[颜色、版本、尺码]
    ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
    //追加一个新的SPU
    ADDSPU_URL = '/admin/product/saveSpuInfo',
    //更新已有的SPU
    UPDATESPU_URL = '/admin/product/saveSpuInfo',
    //追加一个新增的SKU地址
    ADDSKU_URL='/admin/product/saveSkuInfo',
    //查看一个SKU下的sku
    SKUINFO_URL="/admin/product/findBySpuId/",
    //删除一个SPU
    REMOVESPU_URL="/admin/product/deleteSpu/"

}
export const reqHasSpu = (page: number, limit: number, category3Id: number | string) => request.get<any, HasSpuResponseDate>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)

export const reqAllTrademark = () => request.get<any, AllTradeMark>(API.ALLTRAEMARK_URL)

export const reqSpuImageList = (spuId: number) => request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)

export const reqSpuHasSaleAttr = (spuId: number) => request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)

export const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)

export const reqAddOrUpdateSpu = (data: any) => {
    //如果SPU对象拥有ID,更新已有的SPU
    if (data.id) {
        return request.post<any, any>(API.UPDATESPU_URL,data)
    }
    else {
        return request.post<any, any>(API.ADDSPU_URL,data)
    }
}

export const reqAddSku = (data:any)=>request.post<any, any>(API.ADDSKU_URL,data)

//获取sku的数据
export const reqSkuList =(spuId:number|string)=>request.get(API.SKUINFO_URL+spuId)

export const reqRemoveSpu =(spuId:number|string)=>request.delete(API.REMOVESPU_URL+spuId)

 
