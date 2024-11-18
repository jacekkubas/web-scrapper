type User = {
  id: number;
  username: string;
  role: "member" | "contributor" | "admin";
};

const users: User[] = [
  { id: 1, username: "john", role: "admin" },
  { id: 2, username: "Doe", role: "contributor" },
  { id: 3, username: "Albert", role: "member" },
];

const updateUser = (id: number, updates: Partial<User>) => {
  const user = users.find((el) => el.id === id);

  if (!user) return;

  Object.assign(user, updates);
  return user;
};

const addNewUser = (newUser: Omit<User, "id">): User => {
  const user: User = {
    id: users.length + 1,
    ...newUser,
  };

  users.push(user);

  return user;
};

updateUser(2, { username: "new_Doe" });
updateUser(1, { username: "new_johnny" });

addNewUser({ username: "Walo", role: "member" });
addNewUser({ username: "Zibi", role: "contributor" });
console.log(users);
