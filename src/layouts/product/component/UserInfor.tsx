import { useEffect, useState } from "react";
import UserModel from "../../../models/User";
import { getUser } from "../../../api/User.API";

interface UserInforInterface {
  reviewId: number;
}
export const UserInfor: React.FC<UserInforInterface> = (props) => {
  const [user, setUser] = useState<UserModel>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUser(props.reviewId)
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, []);

  if (isLoading) {
    return <p>Loading user...</p>;
  }

  if (error) {
    return (
      <div className="container">
        <p>Error</p>
      </div>
    );
  }

  return (
    <div className="col">
      <p>User: {user?.username}</p>
    </div>
  );
};
