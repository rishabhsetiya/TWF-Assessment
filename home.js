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

      firebase.auth().onAuthStateChanged(function(user) {
        if(user){
             const userRef = db.collection('users').doc(user.uid);
            var getDoc = userRef.get()
            .then(doc => {
            if (!doc.exists) {
                document.getElementById("user_dob").innerHTML="ERROR";
            } else {
            document.getElementById("user_dob").innerHTML=doc.data().dob;
            }
            })
            .catch(err => {
            console.log('Error getting document', err);
            });
        }
        else console.log("No user found");
      })

    logout.addEventListener('click', signout);
    function signout(){
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href="index.html";
      }).catch((error) => {
        // An error happened.
      });      
    }
    
}());