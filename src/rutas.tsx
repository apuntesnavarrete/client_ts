import { createBrowserRouter} from "react-router-dom" 
import Campeones from "./routers/Campeones";
import Home from "./routers/Home";
import Campeon from "./routers/campeon";


const routerdata = [
    {path: "/", element: <Home /> , errorElement: <h1>tecleaste mal la ruta</h1>} ,
    {path: "/Campeones", element: <Campeones></Campeones>} ,
    {path: "/Campeones/:id", element:<Campeon></Campeon> } ,
    

]

export const router = createBrowserRouter(routerdata);