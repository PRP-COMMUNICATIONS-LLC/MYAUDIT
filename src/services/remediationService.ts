import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { storage, db } from '../firebase';

export const handleOneClickRepair = async (
  entryId: string, 
  file: File | null, 
  category?: string
) => {
  const entryRef = doc(db, 'ledger_entries', entryId);
  const updates: any = {};

  if (category) updates.category = category;

  if (file) {
    // 1. Upload to Singapore Storage Bucket
    const storageRef = ref(storage, `receipts/${entryId}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // 2. Add URL to supportingDocLinks array
    updates.supportingDocLinks = arrayUnion(downloadURL);
  }

  return await updateDoc(entryRef, updates);
};
