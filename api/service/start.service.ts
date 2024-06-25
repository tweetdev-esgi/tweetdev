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
                profileImageUrl: "https://cdn.hero.page/0afb509c-1859-4ed9-a529-6c8ea2711b51-aesthetic-anime-and-manga-pfp-from-jujutsu-kaisen-chapter-233-page-3-pfp-3",
                backgroundImageUrl:"https://ca-times.brightspotcdn.com/dims4/default/7f5e489/2147483647/strip/true/crop/1645x740+0+0/resize/1200x540!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F5c%2Fc3%2Fc6a1006b4b7bb5fbb498ee182b4d%2Fjujutsukaisen02.jpg",
                languages : "Python (test)",
                aboutMe : "c'est moi (test)",
                joinDate : new Date(),
                follow: []
            })
        })
        await Promise.all(usersRequest)
    } 
}