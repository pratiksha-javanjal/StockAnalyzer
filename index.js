const http = require("http");
const fs = require("fs");
const path = require("path");
const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://admin:admin@cluster0.j9ukfxj.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri);
``
const connectDb = async () => {
    try {
        // MongoDB cluster connection
        await client.connect();
        console.log(" Connection Successfull!")        
    
    } catch (e) {
        console.error(e);
    } 
    

}

connectDb();







const server = http.createServer (async (req, res) => {

    const header = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    };

    if (req.url === '/') {
        // read public.html file from public folder
        
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
            (err, content) => {

                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );
      
    }

    else if (req.url === '/api') {
        const cursors = client.db("stockDB").collection("stockInfo").find({});
        const results = await cursors.toArray();
        //console.log(results);
        
        const json= (JSON.stringify(results));
        console.log(json);
        res.writeHead(200, header);
        res.end(json);
        
    }
    

    
});

const PORT = process.env.PORT || 6959;

server.listen(PORT, () => console.log(`Server is running on port ${PORT} `));