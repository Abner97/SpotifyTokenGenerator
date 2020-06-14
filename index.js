"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const qs = require('query-string');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
function getToken(clientId, clientSecret) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://accounts.spotify.com/api/token';
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        const promise = yield axios.post(url, qs.stringify({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret
        }), config)
            .then((res) => {
            console.log(res.data);
            return res.data;
        })
            .catch((error) => {
            console.log(error);
            return error;
        });
        return promise;
    });
}
app.post('/token/:clientid/:clientsecret', (req, res) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        res.send(yield getToken(req.params.clientid, req.params.clientsecret));
    }))();
});
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
