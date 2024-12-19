import PostmanDocsGenerator from './src/PostmanDocsGenerator.js';

async function main() {
    if (process.argv.length < 3) {
        console.error('Usage: node index.js <path_to_postman_collection.json>');
        process.exit(1);
    }

    try {
        const generator = new PostmanDocsGenerator();
        await generator.processPostmanCollection(process.argv[2]);
    } catch (error) {
        console.error('Error processing Postman collection:', error);
        process.exit(1);
    }
}

main();