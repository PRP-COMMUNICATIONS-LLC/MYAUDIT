import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, where, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';
import { LedgerEntry } from '../types';

export const useLedgerEntries = (yearId: string) => {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!yearId) return;

    const q = query(
      collection(db, 'ledger_entries'), 
      where('yearId', '==', yearId),
      orderBy('transactionId', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot) => {
      const data = snapshot.docs.map(doc => {
        const docData = doc.data() as DocumentData;
        return {
            id: doc.id,
            transactionId: docData.transactionId || '',
            yearId: docData.yearId || '',
            description: docData.description || '',
            debit: docData.debit || 0,
            credit: docData.credit || 0,
            category: docData.category || 'Uncategorized',
            status: docData.status || 'NEW',
            supportingDocLinks: docData.supportingDocLinks || [],
        } as LedgerEntry;
      });
      
      setEntries(data);
      setLoading(false);
    }, (err) => {
      console.error("Firestore Listen Error:", err);
      setError(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [yearId]);

  return { entries, loading, error };
};
