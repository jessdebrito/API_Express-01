import { courseDatabase, generateId } from "../database/database";
import {
  ICourse,
  TCreateCourseData,
  TUpdateCourseData,
} from "../interfaces/course.interface";

// Etapa final
export class CourseService {
  create(data: TCreateCourseData) {
    const now = new Date();

    const newCourse: ICourse = {
      id: generateId(),
      ...data,
      createdAt: now,
    };

    courseDatabase.push(newCourse);

    return newCourse;
  }

  /* 
   Buscando tanto pelo título ou pela descrição 
*/ /* 
   Se eu tiver o termo de busca, estarei retornando resultados
   que contenham a chave de buca ou no título ou na descrição
   do contrário estarei retornando todos os resultados
*/

  /* 
   -> 5 cursos pro página

      1
      1 - 5

      2
      6 - 10

      3
      11 - 15

      Item primeiro (Página x Quantidade de itens) - 5
      Item Final = Página x Qualidade de Itens
      

      - Quero conseguir ordenar os resultados
      ou pelos mais antigos ou pelos mais recentes:
         > Crescente:
            Data de criação e utilizar como parâmetro de ordenamento (mais antigo para o mais novo)
         > Decrescente:
            Data de criação e utilizar como parâmetro de ordenamento (mais novo para o mais antigo)


*/

  getMany(search?: string, page = 1, orderBy: "ASC" | "DEC" = "ASC") {
    /* const filteredCourseList = courseDatabase.filter((course) =>
         search ? course.title.toLowerCase().includes(search.toLowerCase()) : true
      );

      return filteredCourseList; */

    const firstItem = page * 5 - 5;
    const lastItem = page * 5;
    const pageCount = Math.ceil(courseDatabase.length / 5);

    const filteredCourseList = search
      ? courseDatabase.filter(
          (course) =>
            course.title.toLowerCase().includes(search) ||
            course.description.toLowerCase().includes(search.toLowerCase())
        )
      : courseDatabase;

    return {
      pageCount,
      courses: filteredCourseList
        .sort((a, b) =>
          orderBy === "ASC"
            ? +a.createdAt - +b.createdAt
            : +b.createdAt - +a.createdAt
        )
        .slice(firstItem, lastItem),
    };

    /* if(search) {
         const filteredCourseList = courseDatabase.filter(course =>
             course.title.toLowerCase().includes(search) || 
             course.description.toLowerCase().includes(search.toLowerCase())
         );
         
         return  { pageCount, courses: filteredCourseList.slice(firstItem, lastItem) };

         } else {
            return { pageCount, courses: courseDatabase.slice(firstItem, lastItem) };
      }  */
  }

  getOne(course: ICourse) {
    return course;
  }

  update(currentCourse: ICourse, data: TUpdateCourseData) {
    const now = new Date();

    const updateCourse: ICourse = { ...currentCourse, ...data, updatedAt: now };

    const index = courseDatabase.findIndex(
      (course) => course.id === currentCourse.id
    );

    courseDatabase.splice(index, 1, updateCourse);

    return updateCourse;
  }

  delete(id: number) {
    const index = courseDatabase.findIndex((course) => course.id === id);

    courseDatabase.splice(index, 1);

    return { message: "Course successfully deleted." };
  }
}
