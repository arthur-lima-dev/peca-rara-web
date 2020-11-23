import { useLocation } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().state);

export default useQuery