
const { uploadToMinIO } = require('./minioUtils'); // Assuming minioUtils.js is in the same folder

// Mongoose connection (replace with yours)
const mongoUri = 'mongodb://localhost:27017'; // Assuming your database name is 'test'

const collectionsToSync = ['products', 'users']; // Collections to synchronize

async function syncWithMinIO(mongoose) {
    try {
        var xx = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        for (const collectionName of collectionsToSync) {
            const collection = xx.connection.db.collection(collectionName);
            const docs = await collection.find().toArray();

            // console.log();

            // for (let doc of documents) {
            //     console.log({documents})
            //     // Upload data (including image URL if applicable) to MinIO
            //     // if (doc.imageUrl) { // Assuming an 'imageUrl' field for images
            //     //     await uploadToMinIO(doc.imageUrl, doc._id.toString()); // Replace with image data logic
            //     // }
            // }

            await uploadToMinIO(Buffer.from(JSON.stringify(docs, null, 2), 'utf8'), collectionName+ '.json');

            console.log(`Finished syncing collection: ${collectionName}`);
        }

        console.log('Initial synchronization complete.');

        // Optionally implement a mechanism to watch for changes (e.g., Mongoose Change Streams)
    } catch (error) {
        console.error('Error during synchronization:', error);
    } finally {
        await mongoose.disconnect(); // Close mongoose connection
    }
}
// syncWithMinIO(); // Call the sync function to start the process



module.exports = {
    syncWithMinIO
}