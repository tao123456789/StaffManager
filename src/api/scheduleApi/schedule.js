import http from "../http.js";

export function getSchedule(params,data) {
  return http.get('/api/getSchedule',data)
}
