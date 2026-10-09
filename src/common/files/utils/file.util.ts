import { fileType } from "../types/file.types";
import {lookup} from 'mime-types'


//['png','jpg]=> /png|jpg/
export const createFileTypeRegex=(fileTypes:fileType[]):RegExp =>{
   //input['png','gpg']
   //output['image/png,false]
   // return only [image/png]
   // implement logic here
 const mediaTypes=  fileTypes.map((type)=>lookup(type))
 .filter((type)=>type!=false)

   return  new RegExp(mediaTypes.join('|'))

}