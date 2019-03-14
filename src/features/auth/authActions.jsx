import {closeModal} from "../modals/ModalActions";
import {SubmissionError} from "redux-form";

export const login = creds => {
  return async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    try {
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal())
    } catch (e) {
      console.log(`Something went wrong:`,e);
      throw new SubmissionError({
        _error:e.message
      });
    }
  }
};

export const registerUser = user => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
    //  create the user in auth
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    //  update the auth profile
      await createdUser.updateProfile({
        displayName: user.displayName
      });
    //  create a new profile in firestore
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      };
      await firestore.set(`users/${createdUser.uid}`, {...newUser});
      dispatch(closeModal());
    } catch (e) {
      console.log(`e`,e);
      throw new SubmissionError({
        _error:e.message
      });
    }
  };
};

export const socialLogin = selectedProvider => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      dispatch(closeModal());
      let user = await firebase.login({
        provider: selectedProvider,
        type: 'popup'
      });
      if (user.additionalUserInfo.isNewUser){
        await firestore.set(`users/${user.user.uid}`,{
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
      }
    } catch (e) {
      console.log(`error`,e);
      throw new SubmissionError({
        _error: e.message
      });
    }
  }
};