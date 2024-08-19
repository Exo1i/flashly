import {addCards} from "@/app/learn/Components/cardDatabaseHelper";

export async function novaAddCards(response, userId) {
    try {
        // let response = "Hello! I'm Nova, the Flashly AI tutor. It seems like you're interested in creating some flashcards about SQL definitions. Here are five new flashcards in valid JSON format to get you started:\n" + "\n" + "[\n" + "  {\n" + "    \"question\": \"What does SQL stand for?\",\n" + "    \"answer\": \"Structured Query Language\",\n" + "    \"type\": \"definition\"\n" + "  },\n" + "  {\n" + "    \"question\": \"What is the purpose of the SELECT statement in SQL?\",\n" + "    \"answer\": \"To retrieve data from a database table\",\n" + "    \"type\": \"definition\"\n" + "  },\n" + "  {\n" + "    \"question\": \"What is the difference between INNER JOIN and LEFT JOIN in SQL?\",\n" + "    \"answer\": \"INNER JOIN returns only the rows that have a match in both tables, while LEFT JOIN returns all the rows from the left table and the matching rows from the right table\",\n" + "    \"type\": \"definition\"\n" + "  },\n" + "  {\n" + "    \"question\": \"What is the purpose of the WHERE clause in SQL?\",\n" + "    \"answer\": \"To filter data based on conditions\",\n" + "    \"type\": \"definition\"\n" + "  },\n" + "  {\n" + "    \"question\": \"What is the purpose of the GROUP BY clause in SQL?\",\n" + "    \"answer\": \"To group data by one or more columns\",\n" + "    \"type\": \"definition\"\n" + "  }\n" + "]\n" + "\n" + "Feel free to modify or add to these flashcards as you see fit! If you have any specific requests or topics you'd like to focus on, just let me know. I'm here to help you learn and master SQL definitions."
        // Extract the JSON array from the response
        const jsonRegex = /\[[\s\S]*\]/;
        const match = response.match(jsonRegex);

        if (!match) {
            throw new Error("No JSON array found in the response");
        }

        const jsonString = match[0];

        // Parse the JSON string into an array of objects
        const cardsArr = JSON.parse(jsonString);


        // Add the parsed cards to the Firebase database
        await addCards(cardsArr, userId);

        return "Flashcards added successfully!";
    } catch (error) {
        console.error("Error parsing or adding flashcards:", error);
        throw new Error(`Failed to process flashcards: ${error.message}`);
    }
}