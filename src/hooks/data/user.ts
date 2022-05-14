import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Role } from "../AuthProvider";

export type User = {
  email: string;
  name: string;
  relationship: string;
  dateCreated: string;
  role?: Role;
};

const COL_NAME = "users";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    return onSnapshot(collection(db, COL_NAME), (snapshot) =>
      setUsers(snapshot.docs.map((doc) => doc.data() as User))
    );
  }, []);

  return { users };
};

export const addUser = async (user: User) => {
  return await setDoc(doc(db, COL_NAME, user.email), user);
};

export const updateUser = async (user: User, email: string) => {
  const docRef = doc(db, COL_NAME, email);
  return await setDoc(docRef, user);
};

export const useUser = (email: string) => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    relationship: "",
    dateCreated: "",
  });
  useEffect(() => {
    return onSnapshot(doc(db, COL_NAME, email), (doc) =>
      setUser(doc.data() as User)
    );
  }, []);
  return { user };
};
