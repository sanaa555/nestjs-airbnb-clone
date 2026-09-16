
  
export interface currentUserData{
    _id:string,
    name:string,
    email:string
}

export interface Iprincipal {
    user:currentUserData
    role:string

}