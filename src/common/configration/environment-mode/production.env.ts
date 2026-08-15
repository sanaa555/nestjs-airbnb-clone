import { Environment } from "../environment.interface";
import { defaultEnv } from "./default.env";


export const productionEnv=():Environment=>({
 ...defaultEnv(),
 // Add  production-specific environment ,overrides defaultEnv
//  port:5000
}
)

