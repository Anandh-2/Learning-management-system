const dotenv = require("dotenv");
dotenv.config();
const {google} = require("googleapis");
const fs = require("fs");

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

exports.ytOauth = (req, res)=>{
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/youtube.upload"],
    });
    res.redirect(authUrl);
};

exports.ytOauthCallback = async(req, res) => {
    const code = req.query.code;
    if(!code){
        return res.send("No auth code provided");
    }

    try{
        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        res.json({message: "Authentication successful", tokens});
    } catch (err){
        console.error("Error authenticating", err);
        res.status(500).send("Authentication failed");
    }
};

exports.uploadVid = async (req, res) => {
    if(!req.file){
        return res.status(400).send("No video uploaded");
    }

    const youtube = google.youtube({version: "v3", auth: oauth2Client});

    try{
        const response = await youtube.videos.insert({
            part: "snippet, status",
            requestBody: {
                snippet: {
                    title: "My Uploaded Video",
                    description: "Uploaded via YouTube API",
                    tags: ["test", "API", "YouTube"],
                    categoryId: "22",
                },
                status: {privacyStatus: "public"},
            },
            media: {
                body: fs.createReadStream(req.file.path),
            },

        });

        fs.unlinkSync(req.file.path);

        res.json({ message: "Video uploaded", videoId: response.data.id });
    } catch (err) {
        console.error("Error uploading video: ", err);
        res.status(500).send("Upload failed");
    }
};