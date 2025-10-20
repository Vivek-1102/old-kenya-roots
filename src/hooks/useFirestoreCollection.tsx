import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, Query, WhereFilterOp } from 'firebase/firestore';

type Filter = [string, WhereFilterOp, any];

export const useFirestoreCollection = (path: string, filters: Filter[] = []) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      let q: Query = collection(db, path);
      
      filters.forEach(([field, operator, value]) => {
        q = query(q, where(field, operator, value));
      });

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const documents = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(documents);
          setLoading(false);
        },
        (err) => {
          setError(err as Error);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [path, JSON.stringify(filters)]);

  return { data, loading, error };
};
