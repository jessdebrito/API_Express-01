// Middle - meio
// etapa
// etapas que se repetem

import { NextFunction, Request, Response } from "express";
import { courseDataBase } from "../database/database";

export class IsCourseIdValid{
    //static - metodo que nao precisa de isntancia para ser executado
    static execute(request: Request, response: Response, next: NextFunction){
        // Executar uma logica
        const isCourseIdValid = courseDataBase.some(course => course.id === Number(request.params.id))

        if(!isCourseIdValid){
            return response.status(404).json({ message: "Course not found."})
        }

        next(); // Prosseguir para a proxima etapa
    }
}