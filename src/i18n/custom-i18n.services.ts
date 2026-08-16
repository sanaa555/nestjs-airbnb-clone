import { Injectable} from '@nestjs/common';
import {I18nService,I18nContext} from 'nestjs-i18n';


@Injectable()
export class CustomI18nService {

    constructor (private i18n: I18nService) {}

    translate(key:string,options?:any):string{
       const lang=I18nContext.current()?.lang;
        return this.i18n.t(key,{lang,...options});
    }
}