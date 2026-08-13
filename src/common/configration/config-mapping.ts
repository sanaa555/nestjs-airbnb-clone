import { developmentEnv } from "./environment-mode/development.env";
import { productionEnv } from "./environment-mode/production.env";
import { stagingEnv } from "./environment-mode/staging.env";
import { Environment } from "./environment.interface";

const environments:Record<string, () => Environment> = {
    development:developmentEnv,
    production:productionEnv,
    staging:stagingEnv
}

export default ():Environment=>{
    const nodeEnv = process.env.NODE_ENV || "development";
    const getEnvToLoad=environments[nodeEnv] || developmentEnv;

    console.log(`Loading ${nodeEnv} environment configuration`);
    return getEnvToLoad();


}