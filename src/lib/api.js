import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { generateUniqueId } from '../utils/generate-unique-id'

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

initializeApp(config);

const db = getFirestore();

export async function getBoards() {
  const querySnapshot = await getDocs(collection(db, "boards"))
  let result = {};
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    result[data.id] = {
      items: data.items,
      name: data.name
    }
  });
  return result
}

export async function updateBoardItem({todos, boardId, itemId}) {
  let newBoard = { ...todos[boardId] }

  newBoard.items[itemId].isCompleted = !newBoard.items[itemId].isCompleted
  todos[boardId] = newBoard

  const ref = doc(db, "boards", boardId);
  await updateDoc(ref, {
    items: {
      ...newBoard.items,
      [itemId]: newBoard.items[itemId]
    }
  });

  return todos;
}

export async function createBoardItem({todos, boardId, label}) {
  let newBoard = { ...todos[boardId] }
  const id = generateUniqueId()

  newBoard.items[id] = {
    id: id,
    label,
    isCompleted: false,
    createdAt: new Date()
  }

  const ref = doc(db, "boards", boardId);
  return await updateDoc(ref, {
    items: {
      ...newBoard.items
    }
  });
}