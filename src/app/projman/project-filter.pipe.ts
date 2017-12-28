import { PipeTransform, Pipe } from '@angular/core';
import { IProject } from './project';

@Pipe({
    name : 'projectFilter'
})

export class ProjectFilterPipe implements PipeTransform{
    transform(value: IProject[], filterBy : string) : IProject[]{
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((project: IProject)=>
                project.project.toLocaleLowerCase().indexOf(filterBy) !== -1): value;
    }
}


