import { ResponseHandler } from "../utils/responseHandler"
import { Request, Response, NextFunction} from "express"

export function authorizeRole(role: string){
    return (req: Request, res: Response, next: NextFunction) => {
        if(req.user?.role !== role){
            return ResponseHandler.forbidden(res)
        }
        next()
    }
}