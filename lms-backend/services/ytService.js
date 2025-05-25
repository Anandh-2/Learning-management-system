const dotenv = require("dotenv");
dotenv.config();
const {google} = require("googleapis");
const fs = require("fs");
const RefreshToken = require('../models/RefreshToken')

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);


exports.uploadToTouTube = async (filePath, title = "My Uploaded Video") => {
    // if(!req.file){
    //     return res.status(400).send("No video uploaded");
    // }
    const storedToken = await RefreshToken.findOne();
    if(!storedToken)throw new Error ("No Youtube refresh token found")
    oauth2Client.setCredentials({refresh_token:storedToken.refreshToken});
    const youtube = google.youtube({version: "v3", auth: oauth2Client});

        const response = await youtube.videos.insert({
            part: "snippet, status",
            requestBody: {
                snippet: {
                    title,
                    description: "Uploaded via YouTube API",
                    tags: ["test", "API", "YouTube"],
                    categoryId: "22",
                },
                status: {privacyStatus: "public"},
            },
            media: {
                body: fs.createReadStream(filePath),
            },

        });

        fs.unlink(filePath, (err)=>{
            if(err){
                console.error('File cleanup failed: ', err);
            }
        });
        return response.data.id;

    
};

