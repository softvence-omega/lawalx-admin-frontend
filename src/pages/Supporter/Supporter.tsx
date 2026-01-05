import { useGetAllSupporterTicketsQuery } from "@/store/Api/SupportersApi/SupportersApi";

const Supporter = () => {
    const {data , isLoading} = useGetAllSupporterTicketsQuery({})
    console.log(data,"data")
    return (
        <div className="">
            
        </div>
    );
};

export default Supporter;
