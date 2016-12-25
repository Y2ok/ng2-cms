import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'errors',
    pure: false
})
@Injectable()
export class ErrorPipe implements PipeTransform {
    transform(items: any[], field : string, value : string): any[] {  
        if (!items) return [];        
        return items.filter(item => item[field] == value);
    }
}