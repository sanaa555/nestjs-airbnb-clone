import { Environment } from "../environment.interface";
import { defaultEnv } from "./default.env";


export const stagingEnv=():Environment=>({
 ...defaultEnv(),
 // Add  staging-specific environment ,overrides defaultEnv
 port:6000
}
)

