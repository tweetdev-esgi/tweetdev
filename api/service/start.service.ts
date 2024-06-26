import { Document, Types } from "mongoose"
import { Role, RoleModel, UserModel } from "../models"
import { SecurityUtils } from "../utils"

export class StartService{
    static userRoles = async () => {
        const countRoles = await RoleModel.count().exec()
        if(countRoles !== 0 ){
            return 
        }
    
        const rolesNames: string[] = ["admin", "guest"]
        const rolesRequest = rolesNames.map((name) => {
            RoleModel.create({
                name
            })
        })
        await Promise.all(rolesRequest)
    }

    static createUsers = async ():Promise<void> => {
        const countUsers = await UserModel.count().exec()
        if(countUsers !== 0 ){
            return 
        }
    
        const roles = await RoleModel.find().exec()
        
        const usersNames: string[] = ["admin@mail.com", "guest@mail.com"]

        
        const usersRequest = usersNames.map(async (login) => {
            
            let userRoles: (Document<unknown, {}, Role> & Omit<Role & {_id: string;}, never>)[] = [];
            const adminRole = roles.find((role) => role.name === "admin");
            const guestRole = roles.find((role) => role.name === "guest");

            if (login.includes("admin")) {
                if (adminRole && guestRole) {
                    userRoles = [adminRole, guestRole];
                }
            } else {
                if (guestRole) {
                    userRoles = [guestRole];
                }
            }
            UserModel.create({
                login,
                password: SecurityUtils.toSHA512("password"),
                username : "paschyz",
                roles: userRoles,
                posts: [],
                image: "IMAGE",
                languages : "Python (test)",
                aboutMe : "c'est moi (test)",
                joinDate : new Date(),
                follow: []
            })
        })
        await Promise.all(usersRequest)
    } 
}