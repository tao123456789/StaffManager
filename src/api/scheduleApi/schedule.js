import http from "../../common/http.js";

export function getSchedule(url,params,data) {
  return http.get('/api/getSchedule',data)
}
