import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export const resolveAuditGap = async (
  entryId: string, 
  updates: { category?: string; docUrl?: string }
) => {
  const entryRef = doc(db, 'ledger_entries', entryId);

  const finalUpdate: { [key: string]: any } = {};
  
  if (updates.category) {
    finalUpdate.category = updates.category;
  }
  
  if (updates.docUrl) {
    finalUpdate.supportingDocLinks = arrayUnion(updates.docUrl);
  }

  return await setDoc(entryRef, finalUpdate, { merge: true });
};

export const uploadReceiptAndUpdateLedger = async (
  entityId: string, 
  entryId: string, 
  file: File
) => {
  const storagePath = `receipts/${entityId}/${entryId}/${file.name}`;
  const storageRef = ref(storage, storagePath);
  const uploadResult = await uploadBytes(storageRef, file);
  
  const downloadURL = await getDownloadURL(uploadResult.ref);
  
  return await resolveAuditGap(entryId, { docUrl: downloadURL });
};