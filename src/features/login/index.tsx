import { useEffect, useState } from "react";
import { Input } from "@/components/input";
import { _getUsers } from "@/server";
import { login } from "@/store/auth/auth.reducer";
import { User } from "@/@types";
import { useAppDispatch } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [userInputValue, setUserInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [users, setUsers] = useState<Awaited<
    ReturnType<typeof _getUsers>
  > | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const users = await _getUsers();
      setUsers(users);
    };
    fetchData();
  }, []);

  const dispatch = useAppDispatch();

  const resetFields = () => {
    setUserInputValue("");
    setPasswordInputValue("");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const users = await _getUsers();

    if (!users[userInputValue as keyof typeof users]) {
      alert("User not found");
      resetFields();
      return;
    }

    if (
      users[userInputValue as keyof typeof users].password !==
      passwordInputValue
    ) {
      alert("Invalid credentails");
      resetFields();
      return;
    }

    const user = users[userInputValue as keyof typeof users] as User;

    dispatch(login(user));
    navigate("/");
  };

  return (
    <section>
      <h1 className="text-center text-xl font-bold">Log In</h1>

      <form className="flex flex-col gap-4 text-center" onSubmit={onSubmit}>
        <div>
          <Input
            label="User"
            id="user"
            placeholder="User"
            value={userInputValue}
            onChange={(e) => setUserInputValue(e.target.value)}
            testid="user-field"
          />
        </div>

        <div>
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            value={passwordInputValue}
            onChange={(e) => setPasswordInputValue(e.target.value)}
            testid="password-field"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-neutral-900 w-fit text-white font-bold rounded-md mx-auto disabled:bg-neutral-500"
          disabled={!userInputValue || !passwordInputValue}
          data-testid={"submit-button"}
        >
          Submit
        </button>
      </form>
      {users &&
        Object.entries(users).map(([key, value]) => (
          <div key={key} className="mb-4">
            <p>User: {value.id}</p>
            <p>Password: {value.password}</p>
          </div>
        ))}
    </section>
  );
};
