import OpenAI from "openai";
import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";

class PostmanDocsGenerator {
    constructor() {
        dotenv.config();
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: "https://openrouter.ai/api/v1",
        });
        
        this.outputDir = path.join(process.cwd(), 'docs');
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    async processPostmanCollection(postmanJsonPath) {
        const collection = JSON.parse(fs.readFileSync(postmanJsonPath, 'utf8'));
        const chunks = this.splitIntoChunks(collection);
        
        let finalDocumentation = [];
        
        for (const chunk of chunks) {
            const docSection = await this.generateDocumentationForChunk(chunk);
            finalDocumentation.push(docSection);
        }
        
        this.combineAndSaveDocumentation(finalDocumentation, collection.info?.name || 'API Documentation');
    }

    splitIntoChunks(collection) {
        const chunks = [];
        const items = collection.item || [];
        
        // Split into chunks of max 5 endpoints each
        for (let i = 0; i < items.length; i += 5) {
            chunks.push({
                info: collection.info,
                item: items.slice(i, i + 5)
            });
        }
        
        return chunks;
    }

    async generateDocumentationForChunk(chunk) {
        const prompt = `Create comprehensive API documentation for the following Postman collection chunk. 
        Include detailed descriptions, request/response examples, and any important notes.
        Format the output in Markdown. 
        The output should be in the following format:
        # API_NAME
        ## Overview
        ### Authentication
        ### Endpoints
        
        not
        # API_NAME

        \`\`\`markdown
        # API docs

        ## Overview

        Collection Data:
        ${JSON.stringify(chunk, null, 2)}`;

        const completion = await this.openai.chat.completions.create({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [
                { 
                    role: "system", 
                    content: "You are an API documentation expert. Create clear, well-structured, and detailed API documentation." 
                },
                { role: "user", content: prompt }
            ],
        });

        return completion.choices[0].message.content;
    }

    combineAndSaveDocumentation(docSections, collectionName) {
        const combinedDocs = `# ${collectionName}

${docSections.join('\n\n---\n\n')}`;

        const outputPath = path.join(this.outputDir, 'API_DOCUMENTATION.md');
        fs.writeFileSync(outputPath, combinedDocs);
        console.log(`Generated API documentation at '${outputPath}'`);
    }
}

export default PostmanDocsGenerator; 