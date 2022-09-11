import http from "../../common/http";

export function getMenu(){
  return http.get('/api/menu/getMenu')
}
export function getAllMaterial(){
  return http.get('/api/material/getAllMaterial')
}
export function getAllDelivery(){
  return http.get('/api/delivery/getAllDelivery')
}
export function getAllDeliveryDetail(){
  return http.get('/api/delivery/getAllDeliveryDetail')
}
export function getAllSupplier(){
  return http.get('/api/supplier/getAllSupplier')
}
