// eslint-disable-next-line no-unused-vars
import {get, post} from './http'

export const getFlightByJudge = (params) => get(`Flight/getFlightByJudge`, params)

export const getCode = (phoneNumber) => get(`/phone/code?phoneNumber=${phoneNumber}`)

export const insertUser = (params) => post(`/User/insert`, params)

export const handlelogin = (params) => get(`User/login`, params)

export const getUserByPhone = (phone) => get(`/User/getUserByPhone?phone=${phone}`)

export const getTicketById = (id) =>get(`/Ticket/getById?id=${id}`)

export const getFlightById = (id) =>get(`/Flight/getById?id=${id}`)

export const insertPassenger = (params) =>get(`/Passenger/insert`,params)

export const insertOrder = (params)=>get(`/Orders/insert`,params)

export const updateNumber =(params)=>get(`Ticket/updateNumber`,params)

export const addOrdersToUser = (params) => get(`UserOrders/addOrdersToUser`,params)

export const getFlightChartByUserId =(id) => get(`UserOrders/getFlightChartByUserId?id=${id}`)

export const getFlightCount =(id)=>get(`UserOrders/getFlightCount?id=${id}`)

export const getCityCount =(id)=>get(`UserOrders/getCityCount?id=${id}`)

export const getTicketsByPushId = ()=>get(`getTicketsByPushId`)

export const getOrdersByUserId = (id)=>get(`Orders/getOrdersByUserId?id=${id}`)

export const getAllNotice=(id)=>get(`Notice/getNoticeByUserId?id=${id}`)

export const handleDeleteNotice=(id)=>get(`Notice/delete?id=${id}`)

export const getChart=()=>get(`chart/getChart`)

export const getResult = (id)=>get(`UserOrders/getResult?id=${id}`)
