import fs, { PathLike } from "fs";
import fsp from "fs/promises";
import path from "path";

export async function ensureDir(filePath: string) {
    // 确保目录存在
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        await fsp.mkdir(dir, { recursive: true })
    }
}

export function isSubPath(subPath: string, baseDir: string) {
    // 确保两个路径都是绝对路径
    const absSubPath = path.resolve(subPath);
    const absBaseDir = path.resolve(baseDir);

    // 获取两个路径之间的相对路径
    const relativePath = path.relative(absBaseDir, absSubPath);

    // 如果相对路径以 '..' 开头，则表示不在该目录下
    if (relativePath.startsWith('..') || relativePath === '') {
        return false;
    }

    // 否则表示 subPath 是 baseDir 的子路径
    return true;
}


export function getWorkingDirectory(){
    return process.cwd();
}

export function isSubSafePath(subPath: string, safeDir: string = process.cwd()){
    console.log("safeDir:", safeDir)
    return isSubPath(subPath, safeDir)
}