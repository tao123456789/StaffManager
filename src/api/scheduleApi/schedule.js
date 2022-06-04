import http from "../../common/http.js";

export function getSchedule(params) {
  return http.get('/api/DailySchedule/getScheduleList',params)
}
export function getScheduleTask() {
  return http.get('/api/DailySchedule/getScheduleTaskList')
}
export function addSchedule(params) {
  return http.post('/api/DailySchedule/addSchedule',params)
}
export function deleteSchedule(params) {
  return http.get('/api/DailySchedule/deleteSchedule',params)
}
export function deleteScheduleTask(params) {
  return http.get('/api/DailySchedule/deleteScheduleTask',params)
}
export function updateScheduleTaskStatus(id) {
  return http.get('/api/DailySchedule/updateScheduleTaskStatus/'+id)
}
