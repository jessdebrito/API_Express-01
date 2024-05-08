import { courseDataBase, generateId } from "../database/database";
import { ICourse, TCreateCourseData, TUpdateCourseData } from "../interfaces/course.interface";

class CourseService {
    create(data: TCreateCourseData) {
        const now = new Date();

        const newCourse: ICourse = {
            id: generateId(),
            ...data,
            createdAt: now
        };

        courseDataBase.push(newCourse);

        return newCourse;
    }

    getMany(search?: string) {
        const filteredCourseList = courseDataBase.filter((course) => search ? course.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : true
        );
        return filteredCourseList;
    };


    getOne(id: number) {
        const course = courseDataBase.find(course => course.id === id);

        if (!course) {
            throw new Error("Course not found.");
        }
        return course;
    };


    update(id: number, data: TUpdateCourseData) {
        const currentCourse = courseDataBase.find(course => course.id === id);

        if (!currentCourse) {
            throw new Error("Course not found.");
        }

        const now = new Date();

        const updateCourse: ICourse = { ...currentCourse, ...data, updatedAt: now };

        const index = courseDataBase.find(course => course.id === id);

        courseDataBase.splice(index, 1, updateCourse);

        return updateCourse;
    }
}
