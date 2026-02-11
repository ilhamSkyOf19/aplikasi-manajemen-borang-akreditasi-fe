import { useQuery } from "@tanstack/react-query";
import { UserService } from "../../../services/user.service";

const userKelolaUser = () => {
  // use query
  const { data: dataKelolaUser, isLoading } = useQuery({
    queryKey: ["kelola-user"],
    queryFn: () => UserService.read({}),
    refetchOnWindowFocus: false,
  });

  return { dataKelolaUser, isLoading };
};

export default userKelolaUser;
