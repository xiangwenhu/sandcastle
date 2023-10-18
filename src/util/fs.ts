import fs from "fs";
import fsp from "fs/promises";
import path from "path";

export async function ensureDir(filePath: string) {
    // 确保目录存在
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        await fsp.mkdir(dir, { recursive: true })
    }
}