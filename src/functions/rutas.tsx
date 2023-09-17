import { createBrowserRouter} from "react-router-dom" 
import Campeones from "../routers/Campeones/Campeones";
import Home from "../routers/Home/Home";
import Campeon from "../routers/campeoninfo/campeon";
import Roll from "../routers/Roll/roll";


const routerdata = [
    {path: "/", element: <Home /> , errorElement: <h1>tecleaste mal la ruta</h1>} ,
    {path: "/Campeones", element: <Campeones></Campeones>} ,
    {path: "/Campeones/:id", element:<Campeon></Campeon> } ,
    {path: "/Roll", element:<Roll></Roll> } ,



]

export const router = createBrowserRouter(routerdata);