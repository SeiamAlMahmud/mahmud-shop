import { createContext, useEffect, useState } from 'react'
import UseFetch from '../hooks/UseFetch';
import { auth } from '../firebase/firebase.config';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const MyContext = createContext(null);
function MyArrayContext({ children }) {
  const [pdArray, setPdArray] = useState([]);
  const [unique, setUnique] = useState(null);
  const [sumPrice, setSumPrice] = useState(0)
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)
  const [isActive, setIsActive] = useState(false)

  // Authentication 
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // console.log('name', userName)
  // console.log('email', email)
  const products = UseFetch()

  const storeProduct = (newProduct) => {
    setPdArray((prevProducts) => [...prevProducts, newProduct]);
    console.log(pdArray);
  };

  const removeToArray = (productsCard) => {
    const removeArray = pdArray.filter((elements => elements.id !== productsCard.id))
    setPdArray([...removeArray]);
    console.log(pdArray);
  }
  // Function to find unique elements (considering object properties)
  const findUnique = () => {
    return new Set(pdArray.map((obj) => JSON.stringify(obj))); // Unique Set based on object stringification
  };
  const uniqueSet = findUnique();
  const uniqueArray = Array.from(uniqueSet).map((str) => JSON.parse(str));
  const decreaseArray = (_, idx) => {
    const clickIdx = pdArray.filter((_, index) => idx !== index);
    setPdArray(clickIdx);
    console.log(pdArray);

  }

  const selectedPrice = pdArray.reduce((prev, last) => {
    return prev = prev + last.price
  }, 0)

  let shipping;
  if (selectedPrice < 75) {
    shipping = 19.99
  } else if (selectedPrice == 75 || selectedPrice > 75) {
    shipping = 40
  }

  const vat = selectedPrice / 5;
  const vatVal = Number(vat.toFixed(2))
  const grandTotal = Number((vatVal + selectedPrice + shipping).toFixed(2));


  // Sign up

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('first')
   
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const userDetails = userCredential.user;
    setUser(userDetails)
   
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
 
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   setIsActive(true)
    setUser(user)
   console.log(user)
  
  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  
  }

  const handleLogOut = () => {
    signOut(auth).then(() => {
     console.log("Sign-out successful.")
     setIsActive(false)
     setUser(null)
    }).catch((error) => {
      // An error happened.
    });
  }
  useEffect(()=> {
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
      const uid = userDetails.uid;
      console.log(userDetails)
      setIsActive(true)
    setUser(userDetails)
        console.log('create')
        if (user) {
          const updateUser = {
          
            email: user.email,
            createdID: Date.now(),
            metadata: user.metadata,
            uid: uid,
          }
          fetch('http://127.0.0.1:3000/addUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateUser)
          }).then(res => res.json())
            .then(data => console.log(data))
        }
        
       
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  },[isActive])
 




  const info = { products, setPdArray, pdArray, storeProduct, removeToArray, uniqueArray, selectedPrice, vatVal, grandTotal, shipping, decreaseArray, count, setCount, setUserName, setEmail, setPassword ,handleSignUp, handleSignIn, user,handleLogOut,isActive}
  return (
    <MyContext.Provider value={info}>
      {children}
    </MyContext.Provider>
  )
}

export default MyArrayContext

