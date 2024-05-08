import { ICourse } from "../interfaces/course.interface";

export const courseDataBase: ICourse[] = [];

let id = 0;

export function generateId(){
    id++;

    return id;
}