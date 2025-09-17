
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyD4tBp2gwBYARELofNX7It4Bh1sJkA6b30",
      authDomain: "whiteboard-84fec.firebaseapp.com",
      databaseURL: "https://whiteboard-84fec-default-rtdb.firebaseio.com",
      projectId: "whiteboard-84fec",
      storageBucket: "whiteboard-84fec.firebasestorage.app",
      messagingSenderId: "96925150406",
      appId: "1:96925150406:web:74a9a3730699ab88dbfbc7",
      measurementId: "G-FQ36R4DQR6"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const strokesRef = ref(db, "strokes");

    const canvas = document.getElementById("board");
    const ctx = canvas.getContext("2d");

    const colorPicker = document.getElementById("colorPicker");
    const thicknessRange = document.getElementById("thicknessRange");
    const clearBtn = document.getElementById("clearBtn");

    let drawing = false;
    let currentColor = colorPicker.value;
    let currentThickness = thicknessRange.value;

    ctx.lineCap = "round";

    colorPicker.addEventListener("input", () => {
      currentColor = colorPicker.value;
    });

        thicknessRange.addEventListener("input", () => {
        currentThickness = thicknessRange.value;
        });

    let currentStroke = [];

    canvas.addEventListener("mousedown", (e) => {
      drawing = true;
      currentStroke = [];
      // Add first point of stroke
      currentStroke.push({ x: e.offsetX, y: e.offsetY, color: currentColor, thickness: currentThickness });
      drawPoint(e.offsetX, e.offsetY, currentColor, currentThickness, true);
    });

    canvas.addEventListener("mouseup", () => {
      drawing = false;
      // Push whole stroke at once
      if (currentStroke.length > 0) {
        push(strokesRef, currentStroke);
        currentStroke = [];
      }
    });

    // canvas.addEventListener("mouseleave", () => {
    //   if (drawing) {
    //     drawing = false;
    //     if (currentStroke.length > 0) {
    //       push(strokesRef, currentStroke);
    //       currentStroke = [];
    //     }
    //   }
    // });

    // canvas.addEventListener("mousemove", (e) => {
    //   if (!drawing) return;
    //   currentStroke.push({ x: e.offsetX, y: e.offsetY, color: currentColor, thickness: currentThickness });
    //   drawPoint(e.offsetX, e.offsetY, currentColor, currentThickness, false);
    // });

    // function drawPoint(x, y, color, thickness, moveToStart) {
    //   ctx.strokeStyle = color;
    //   ctx.lineWidth = thickness;
    //   if (moveToStart) {
    //     ctx.beginPath();
    //     ctx.moveTo(x, y);
    //   } else {
    //     ctx.lineTo(x, y);
    //     ctx.stroke();
    //   }
    // }

    // // Draw all strokes from DB
    // onValue(strokesRef, (snapshot) => {
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   const strokes = snapshot.val();
    //   if (strokes) {
    //     for (const key in strokes) {
    //       const stroke = strokes[key];
    //       if (stroke.length > 0) {
    //         ctx.beginPath();
    //         for (let i = 0; i < stroke.length; i++) {
    //           const p = stroke[i];
    //           ctx.strokeStyle = p.color;
    //           ctx.lineWidth = p.thickness;
    //           if (i === 0) {
    //             ctx.moveTo(p.x, p.y);
    //           } else {
    //             ctx.lineTo(p.x, p.y);
    //             ctx.stroke();
    //           }
    //         }
    //       }
    //     }
    //   }
    // });

    // clearBtn.addEventListener("click", () => {
    //   remove(strokesRef)
    //     .then(() => {
    //       ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     })
    //     .catch((error) => {
    //       console.error("Error clearing database:", error);
    //     });
    // });