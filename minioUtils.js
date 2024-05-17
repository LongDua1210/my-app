const Minio = require('minio');

const minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKeyId: 'FKxi4cFql68k7oII593u',
    secretAccessKey: 'h22QtUg072BLUgzddQrFRSSApi8qBJNZl7M0pItk'
});

// async function uploadToMinIO(file, filename) {
//     try {
//         await minioClient.putObject('test', filename, file.buffer);
//         return 'https://play.min.io:9000/test/' + filename; // Assuming public access
//     } catch (error) {
//         console.error('Error uploading to MinIO: ', error);
//         throw error; // Re-throw for error handling
//     }
// }

async function uploadToMinIO(buff, filename) {
    try {
        await minioClient.putObject('test', filename, buff);
        return '127.0.0.1:9000/test/' + filename; // Assuming public access
    } catch (error) {
        console.error('Error uploading to MinIO: ', error);
        throw error; // Re-throw for error handling
    }
}

module.exports = { uploadToMinIO };