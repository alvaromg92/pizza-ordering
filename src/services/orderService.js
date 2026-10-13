import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore"

import { db } from "../firebase"

async function createOrder(order) {

  const orderData = {
    ...order,
    createdAt: serverTimestamp()
  }

  const orderRef = await addDoc(
    collection(db, "orders"),
    orderData
  )

  return orderRef.id
}

export default createOrder