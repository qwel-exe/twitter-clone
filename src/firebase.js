import firebase, { firestore } from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import { useState, useEffect } from "react";
import { collectionData, docData } from "rxfire/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8Ww4oxjQ35wfRlNi8RLts-7v-elU1N9M",
  authDomain: "clone-5ce20.firebaseapp.com",
  databaseURL: "https://clone-5ce20-default-rtdb.firebaseio.com",
  projectId: "clone-5ce20",
  storageBucket: "clone-5ce20.appspot.com",
  messagingSenderId: "1070649130222",
  appId: "1:1070649130222:web:7239622193f834834407ff",
  measurementId: "G-HDSGZZC89E",
};

const initializeFirebase = () => {
  let app;
  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
  }
  const storage = firebase.storage(app);
  const firestore = firebase.firestore(app);
  const auth = firebase.auth(app);
  return { storage, firestore, app, firebase, auth };
};

export const useFirebase = () => {
  let [state, setState] = useState({
    firebase,
  });

  useEffect(() => {
    setState(initializeFirebase());
  }, []);

  return state;
};

export const useDoc = (path) => {
  let [data, setData] = useState({});
  let [loading, setLoading] = useState(true);
  let { firestore } = useFirebase();

  useEffect(() => {
    if (!firestore) {
      return;
    }

    let subscription = docData(firestore.doc(`${path}`), "uid").subscribe(
      (d) => {
        setData(d);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [firestore, path]);
  return { data, loading };
};

export const useCollection = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { firestore } = useFirebase();

  useEffect(() => {
    if (!firestore) {
      return;
    }
    const subscription = collectionData(
      firestore.collection(`${path}`),
      "id"
    ).subscribe((d) => {
      setData(d);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [firestore, path]);

  return { data, loading };
};

export const createRecord = (path, data) => {
  return firebase
    .firestore()
    .collection(`${path}`)
    .add({
      createdAt: firestore.FieldValue.serverTimestamp(),
      ...data,
    });
};

export const createDoc = (path, data) => {
  return firebase
    .firestore()
    .doc(`${path}`)
    .set({
      createdAt: firestore.FieldValue.serverTimestamp(),
      ...data,
    });
};

export const useStorage = (path) => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  let { storage } = useFirebase();

  const uploadFile = (file) => {
    const storageRef = storage.ref(`${path}/${file.name}`);

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const downloadUrl = await storageRef.getDownloadURL();
        setUrl(downloadUrl);
      }
    );
  };

  return { progress, url, error, uploadFile };
};
