import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
const qs = require('query-string');
const axios = require('axios')


const app: express.Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function getToken(clientId: string, clientSecret: string) {
    
    
    const url = 'https://accounts.spotify.com/api/token'
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    const promise= await axios.post(url, qs.stringify({
        
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret
        
    }),config)
        .then((res: any) => {
            console.log(res.data);
            return res.data;

        })
        .catch((error: any) => {
            console.log(error);
            return error;

        })
    
    return promise;
        

}

app.post('/token/:clientid/:clientsecret', (req: any, res: any) => {
    (async () => {
        res.send(await getToken(req.params.clientid, req.params.clientsecret));
    })()
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));