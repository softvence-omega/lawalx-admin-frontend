import SupportDashboard from "@/pages/Supporter/SupportDashboard";
import Supporter from "@/pages/Supporter/Supporter";
import { PieChart } from "lucide-react";

export const supporterRoute = [
    {
        icon:<PieChart/>,
        index:true,
        name:"Supporter",
        element:<Supporter/>  
    },
    {
        icon:<PieChart/>,
        path:"supporter-dashboard",
        name:"Supporter Dashboard",
        element:<SupportDashboard/>  
    }
]