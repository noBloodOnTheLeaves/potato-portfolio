import cloudinary from "./cloudinary";

let cachedResults;
let cachedModelName

export default async function getResults(modelName) {
    if (!cachedResults || cachedModelName !== modelName) {
        cachedModelName = modelName
        cachedResults = await cloudinary.v2.search
            .expression(`folder:${modelName}/*`)
            .sort_by("public_id", "desc")
            .max_results(400)
            .execute();
    }

    return cachedResults;
}
