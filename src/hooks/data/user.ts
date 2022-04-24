import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Role } from "../AuthProvider";

export type User = {
  id: string;
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
      setUsers(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as User))
      )
    );
  }, []);

  return { users };
};

export const addUser = async (user: User) => {
  return await addDoc(collection(db, COL_NAME), user);
};

export const updateUser = async (user: User, id: string) => {
  const docRef = doc(db, COL_NAME, id);
  return await setDoc(docRef, user);
};

export const useUser = (id: string) => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    relationship: "",
    dateCreated: "",
  });
  useEffect(() => {
    return onSnapshot(doc(db, COL_NAME, id), (doc) =>
      setUser({ ...doc.data(), id: doc.id } as User)
    );
  }, []);
  return { user };
};
