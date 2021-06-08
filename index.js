const getPutS3PresignedUrl = require('./getPutS3PresignedUrl')
const fetch = require("node-fetch")
const { createReadStream, statSync } = require("fs");
require('dotenv').config()

const main = async () => {
    console.log(process.env)
    const url = await getPutS3PresignedUrl(
        process.env.BUCKET_NAME,
        process.env.FILE_NAME
    )
    console.log(url)

    const filePath = process.env.FILE_PATH
    const payload = createReadStream(filePath)
    const response = await fetch(url, {
        method: "PUT",
        body: payload,
        headers: {
            "Content-Length": statSync(filePath).size
        }
    });

    console.log(response)

}

return main()