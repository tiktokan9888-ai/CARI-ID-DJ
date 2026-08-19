import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
  getDatabase,
  ref,
  get
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyDH51y1lUv7eIWvZNNG-JDWrkqglii55R4",
  authDomain: "sebar-id-dj.firebaseapp.com",
  databaseURL: "https://sebar-id-dj-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sebar-id-dj",
  storageBucket: "sebar-id-dj.firebasestorage.app",
  messagingSenderId: "423756123443",
  appId: "1:423756123443:web:d178033f33c6846e52c246"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


window.cariDJ = async function() {

  const kata = document
    .getElementById("cari")
    .value
    .trim()
    .toLowerCase();

  const hasil = document.getElementById("hasil");


  if (kata === "") {
    hasil.innerHTML = "Masukkan nama DJ atau ID dulu!";
    return;
  }


  hasil.innerHTML = "Sedang mencari...";


  try {

    const snapshot = await get(ref(db));


    if (!snapshot.exists()) {
      hasil.innerHTML = "Belum ada ID DJ yang disebar.";
      return;
    }


    let ditemukan = false;

    hasil.innerHTML = "";


    snapshot.forEach((data) => {

      const nama = String(data.key || "").toLowerCase();
      const id = String(data.val() || "").toLowerCase();


      if (nama.includes(kata) || id.includes(kata)) {

        ditemukan = true;


        hasil.innerHTML += `
          <div>
            <h3>${data.key}</h3>
            <p>ID DJ: ${data.val()}</p>
            <hr>
          </div>
        `;

      }

    });


    if (!ditemukan) {
      hasil.innerHTML = "ID DJ tidak ditemukan.";
    }


  } catch (error) {

    hasil.innerHTML =
      "Gagal mengambil data: " + error.message;

  }

};