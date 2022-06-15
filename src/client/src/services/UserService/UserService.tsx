import {RegisterRequest} from "generated/user/user_pb"
import {UserClient} from "generated/user/user_pb_service"

export default class UserService {
    userClient = new UserClient(process.env.SERVER_URL!);
    
    signUp(req: RegisterRequest) {
        this.userClient.register(req, (error, response) =>
        {
            
        });
        
        return req;
    }

    // static signIn(formData, options) {
    //     return request(
    //         {
    //             url: "/api/user/login",
    //             method: "POST",
    //             data: formData,
    //         },
    //         options
    //     );
    // }
}