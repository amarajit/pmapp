import { PipeTransform, Pipe } from '@angular/core';
import { ITask } from './task';

@Pipe({
    name : 'taskFilter'
})

export class TaskFilterPipe implements PipeTransform{
    transform(value: ITask[], filterBy : string) : ITask[]{
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((task: ITask)=>
                task.task.toLocaleLowerCase().indexOf(filterBy) !== -1): value;
    }
}


