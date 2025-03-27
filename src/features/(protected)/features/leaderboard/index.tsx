import { User } from "@/@types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/users/users.reducer";
import { useEffect } from "react";

export const LeaderBoardPage = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return <section>Loading...</section>;
  }

  if (error) {
    return <section>{error}</section>;
  }

  return (
    <section>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-lg border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Users
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Answered
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user: User) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user?.avatarURL && (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatarURL}
                        alt="avatar"
                      />
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {Object.entries(user.answers).length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.questions.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
