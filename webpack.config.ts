import {buildWebpackConfig} from "./config/build/buildWebpackConfig";
import {IBuildEnv, IBuildPaths} from "./config/build/types/config";
import path from "path";

export default (env: IBuildEnv) => {

    const PORT = env.port || 3000;
    const mode = env.mode || 'development';

    const isDev = mode === 'development';

    const paths: IBuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src')
    }

    return buildWebpackConfig({mode, paths, isDev, port: PORT});
};