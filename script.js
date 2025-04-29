const PASSWORD = "frontier123";  // Change to your own password
let students = JSON.parse(localStorage.getItem("students")) || [];

function addPoints() {
  const name = document.getElementById("name").value.trim();
  const grade = document.getElementById("grade").value.trim();
  const reason = document.getElementById("reason").value;
  const points = parseInt(document.getElementById("points").value);
  const staff = document.getElementById("staff").value.trim();
  const password = document.getElementById("password").value;

  if (password !== PASSWORD) {
    alert("❌ Incorrect password");
    return;
  }

  if (!name || !grade || isNaN(points)) {
    alert("Please fill out all fields correctly.");
    return;
  }

  let student = students.find(s => s.name === name && s.grade === grade);
  if (!student) {
    student = { name, grade, points: 0, history: [] };
    students.push(student);
  }

  student.points += points;
  student.history.push({ reason, points, staff, date: new Date().toLocaleString() });

  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

function displayStudents() {
  const div = document.getElementById("students");
  div.innerHTML = "";

  students.forEach(s => {
    const history = s.history.map(h => `<li>${h.date}: ${h.reason} (${h.points}) - ${h.staff}</li>`).join("");
    div.innerHTML += `
      <div class="student">
        <strong>${s.name} (Grade ${s.grade})</strong><br/>
        Points: ${s.points}
        <ul>${history}</ul>
      </div>`;
  });
}

displayStudents();
