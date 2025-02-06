import {
  get,
  set,
  push,
  ref,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';
import { db, auth } from '../config/firebase-config';

const getUserHandle = async (uid) => {
  const snapshot = await get(
    query(ref(db, 'users'), orderByChild('uid'), equalTo(uid))
  );
  if (!snapshot.exists()) throw new Error('User data not found');
  return Object.keys(snapshot.val())[0];
};

export const getUserByHandle = async (handle) => {
  const snapshot = await get(ref(db, `users/${handle}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
};

export const addTodo = async (taskText) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user logged in');

  const userHandle = await getUserHandle(user.uid);
  const newTodoRef = push(ref(db, `users/${userHandle}/todos`));

  const todo = {
    text: taskText,
    completed: false,
    createdOn: new Date().toISOString(),
  };

  await set(newTodoRef, todo);
  return todo;
};

export const getTodos = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user logged in');

  const userHandle = await getUserHandle(user.uid);
  const snapshot = await get(ref(db, `users/${userHandle}/todos`));

  if (snapshot.exists()) {
    return Object.entries(snapshot.val()).map(([id, task]) => ({
      id,
      text: task.text,
      completed: task.completed,
    }));
  }
  return [];
};

export const toggleTodoStatus = async (todoId, currentStatus) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user logged in');

  const userHandle = await getUserHandle(user.uid);
  const todoRef = ref(db, `users/${userHandle}/todos/${todoId}`);

  await update(todoRef, { completed: !currentStatus });

  return { id: todoId, completed: !currentStatus };
};

export const deleteTodo = async (todoId) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user logged in');

  const userHandle = await getUserHandle(user.uid);
  const todoRef = ref(db, `users/${userHandle}/todos/${todoId}`);

  await remove(todoRef);
};

export const createUserHandle = async (handle, uid, email) => {
  const user = {
    handle,
    uid,
    email,
    createdOn: new Date().toISOString(),
  };

  await set(ref(db, `users/${handle}`), user);
};

export const getUserData = async (uid) => {
  const snapshot = await get(
    query(ref(db, 'users'), orderByChild('uid'), equalTo(uid))
  );
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
};
