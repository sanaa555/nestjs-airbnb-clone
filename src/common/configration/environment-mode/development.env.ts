import { Environment } from "../environment.interface";
import { defaultEnv } from "./default.env";


export const developmentEnv=():Environment=>({
 ...defaultEnv(),
 // Add  development-specific environment ,overrides defaultEnv
//  port:4000
}
)

