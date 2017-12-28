import { PipeTransform, Pipe } from '@angular/core';
import { IProject } from './project';

@Pipe({
    name : 'sortByProject'
})

export class ProjectSortPipe implements PipeTransform{
    transform(value: IProject[], sortBy : string) : IProject[]{
        value.sort( (a:IProject, b:IProject) => {
                  
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


