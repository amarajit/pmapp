import { PipeTransform, Pipe } from '@angular/core';
import { IUser } from './user';

@Pipe({
    name : 'sortByUser'
})

export class UserSortPipe implements PipeTransform{
    transform(value: IUser[], sortBy : string) : IUser[]{
        value.sort( (a:IUser, b:IUser) => {
            if(a[sortBy] < b[sortBy]){
                return -1;
            } else if (a[sortBy] > b[sortBy]){
                return 1;
            } else {
                return 0;
            }
        });
        return value;
    }
}


