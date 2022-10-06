import http from "../../common/http";

export function getMenu(){
  return http.get('/api/menu/getMenu')
}
export function getAllMaterial(){
  return http.get('/api/material/getAllMaterial')
}
export function getAllMaterialByID(id){
  return http.get('/api/material/getAllMaterial/'+id)
}
export function addDeliveryDetailMaterial(params){
  return http.post('/api/delivery/addDeliveryDetailMaterial',params)
}
export function addMaterial(params){
  return http.post('/api/material/addMaterial',params)
}
export function getAllDelivery(){
  return http.get('/api/delivery/getAllDelivery')
}
export function getDeliveryDetailBy(params){
  return http.post('/api/delivery/getAllDeliveryBy',params)
}
export function addDelivery(params){
  return http.post('/api/delivery/addDelivery',params)
}
export function getAllDeliveryDetail(){
  return http.get('/api/delivery/getAllDeliveryDetail')
}
export function getAllSupplier(){
  return http.get('/api/supplier/getAllSupplier')
}
export function addSupplier(params){
  return http.post('/api/supplier/saveSupplier',params)
}
export function delDeliveryDetailNO(id){
  return http.get('/api/delivery/delDeliveryDetailNO/'+id)
}
