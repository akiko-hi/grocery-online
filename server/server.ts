import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import path from "path";
import { getProducts, searchProducts, generateMoreProducts } from './products';
import { signIn, signOut, signUp, whoAmI, deleteUser } from './user';
import { confirmOrder, getOrderHistoty } from './order';
import { addFavoriteItem, removeFavoriteItem, getFavoriteItems } from "./favorite";
import { getCategories } from './categories';

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

function action(func: (req: Request) => Promise<any>) {
    return function (req: Request, res: Response) {
        func(req)
            .then(x => res.json(x))
            .catch(err => res.status(500).send(err.message))
    }
}

//server configuration
app.use(cookieSession({ secret: "Akiko123", sameSite: "lax" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")))


//categories
app.get('/api/categories/', action(getCategories));

//favorite
app.post('/api/addFavoriteItem', action(addFavoriteItem));
app.post('/api/removeFavoriteItem', action(removeFavoriteItem));
app.get('/api/getFavoriteItems', action(getFavoriteItems));

//order
app.post('/api/confirmOrder', action(confirmOrder));
app.get('/api/order_history/', action(getOrderHistoty));

//products
app.get('/api/products/', action(getProducts));
app.get('/api/search', action(searchProducts));
app.get('/api/generate', action(generateMoreProducts));

//user
app.post('/api/signIn', action(signIn));
app.post('/api/signOut', action(signOut));
app.post('/api/signUp', action(signUp));
app.get('/api/whoAmI', action(whoAmI));
app.post('/api/deleteUser', action(deleteUser));
