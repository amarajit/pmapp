import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from "./task";

@Pipe({
  name: 'sortByTask'
})
export class TaskSortPipe implements PipeTransform {

  transform(value: ITask[], sortBy : string) : ITask[]{
    value.sort( (a:ITask, b:ITask) => {
              
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
