import { Roles } from "src/common/constants"

  
export interface currentUserData{
    _id:string,
    name:string,
    email:string
}

export interface Iprincipal {
    user:currentUserData
    role:Roles

}