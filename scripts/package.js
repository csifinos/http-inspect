const tar = require('tar');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const buildFolder = path.resolve(__dirname, '../build');
const distFolder = path.resolve(__dirname, '../dist');

async function createTarGz(fileName) {
    const outputTarGz = path.join(distFolder, `${fileName}.tar.gz`);
    return tar.c(
        {
            gzip: true,
            file: outputTarGz,
            cwd: buildFolder
        },
        [fileName]
    );
}

async function generateSha256(filePath) {
    const hash = crypto.createHash('sha256');
    const fileStream = fs.createReadStream(filePath);

    return new Promise((resolve, reject) => {
        fileStream.on('data', (data) => hash.update(data));
        fileStream.on('end', () => {
            const sha256 = hash.digest('hex');
            resolve(sha256);
        });
        fileStream.on('error', (err) => reject(err));
    });
}

function createDistFolderIfNotExists() {
    if (!fs.existsSync(distFolder)) {
        fs.mkdirSync(distFolder);
    }
}

async function packageFile(fileName) {
    const filePath = path.join(buildFolder, fileName);
    if (fs.lstatSync(filePath).isFile()) {
        console.log(`Creating tar.gz archive for: ${fileName}`);
        await createTarGz(fileName);

        const outputTarGz = path.join(distFolder, `${fileName}.tar.gz`);
        console.log(`Generating SHA256 checksum for: ${outputTarGz}`);
        const sha256 = await generateSha256(outputTarGz);

        const checksumFile = path.join(distFolder, `${fileName}.sha256`);
        fs.writeFileSync(checksumFile, `${sha256}  ${fileName}.tar.gz\n`);
        console.log(`SHA256 checksum written to: ${checksumFile}`);
    }
}

try {
    createDistFolderIfNotExists();

    const files = fs.readdirSync(buildFolder);
    if (files.length === 0) {
        console.warn('No files found in the build folder.');
        return;
    }

    for (const fileName of files) {
        packageFile(fileName)
    }
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}
