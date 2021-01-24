(function(){

    const firebaseConfig = {
        apiKey: "AIzaSyDgGVftdqiiSgu5RlehQaLcW3rGWeg4Cho",
        authDomain: "twf-assessment.firebaseapp.com",
        projectId: "twf-assessment",
        storageBucket: "twf-assessment.appspot.com",
        messagingSenderId: "1066518469189",
        appId: "1:1066518469189:web:ec9d5934e7c284c397e12c",
        measurementId: "G-KQZX8EJZM6"
      };

      firebase.initializeApp(firebaseConfig);

      var db = firebase.firestore();

      //Get Elements
      const newmail=document.getElementById("newemail");
      const newpassword=document.getElementById("newpassword");
      const btnSignUp=document.getElementById("btnSignUp");
      const email=document.getElementById("email");
      const password=document.getElementById("password");
      const btnSignIn=document.getElementById("btnSignIn");
      const dob_submit=document.getElementById("dob_submit");
      const logout=document.getElementById("logout");

      //Signin Event
      if(btnSignIn){
      btnSignIn.addEventListener('click', e=>{
        firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(user => {
            // Sign in success
            const userRef = db.collection('users').doc(user.user.uid);
            var getDoc = userRef.get()
            .then(doc => {
            if (!doc.exists) {
              window.location.href="dob.html";
            } else {
              window.location.href="loggedin.html";
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
        }).catch(error => {
        alert(error);
        })
      });
    }

      //Signup Event
      if(btnSignUp){
      btnSignUp.addEventListener('click', e=>{
        firebase.auth().createUserWithEmailAndPassword(newmail.value, newpassword.value).then(user => {
            // Sign in success
            window.location.href="dob.html";
        }).catch(error => {
        alert(error);
        })
      });
    }
    if(logout)
      logout.addEventListener('click', signout);
    function signout(){
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href="index.html";
      }).catch((error) => {
        // An error happened.
      });      
    }
    if(dob_submit)
      dob_submit.addEventListener('click', add_dob);
    
    function add_dob(){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log(user);

            db.collection("users").doc(user.uid).set({
              dob:document.getElementById("dob").value
            })
          .then(() => {
              window.location.href="loggedin.html";
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
           
          
          } else {
            window.location.href="index.html";
          }
        });
    }

}());

