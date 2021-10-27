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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const query_string_1 = require("query-string");
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
function getToken(clientId, clientSecret) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://accounts.spotify.com/api/token";
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        const promise = yield axios_1.default
            .post(url, (0, query_string_1.stringify)({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
        }), config)
            .then((res) => {
            //console.log(res.data);
            return res.data;
        })
            .catch((error) => {
            console.log(error);
            return error;
        });
        return promise;
    });
}
app.post("/token/:clientid/:clientsecret", (req, res) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        res.send(yield getToken(req.params.clientid, req.params.clientsecret));
    }))();
});
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
