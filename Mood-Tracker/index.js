document.addEventListener("DOMContentLoaded", function () {
  const calendarGrid = document.querySelector(".calendar-grid");
  const monthYear = document.getElementById("month-year");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const moodButtons = document.querySelectorAll(".mood");
  const saveButton = document.getElementById("save");
  let selectedDate = null;
  let selectedMood = null;
  
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  
  function renderCalendar(year, month) {
      calendarGrid.innerHTML = "";
      monthYear.textContent = new Date(year, month).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
      });
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let i = 0; i < firstDay; i++) {
          const emptyDiv = document.createElement("div");
          emptyDiv.classList.add("day");
          emptyDiv.style.visibility = "hidden";
          calendarGrid.appendChild(emptyDiv);
      }

      for (let day = 1; day <= daysInMonth; day++) {
          const dayDiv = document.createElement("div");
          dayDiv.classList.add("day");
          dayDiv.textContent = day;
          dayDiv.dataset.date = `${year}-${month + 1}-${day}`;

          const storedMood = localStorage.getItem(dayDiv.dataset.date);
          if (storedMood) {
              const moodIcon = document.createElement("span");
              moodIcon.classList.add("mood-icon");
              moodIcon.textContent = storedMood;
              dayDiv.appendChild(moodIcon);
          }
          dayDiv.addEventListener("click", function () {
            document.querySelectorAll(".day").forEach(d => {
                d.classList.remove("selected");
                d.style.backgroundColor = "white";
                const mood = localStorage.getItem(d.dataset.date);
                if (mood) {
                    d.style.backgroundColor = "#f3f3f3";
                }
            });
            this.classList.add("selected");
            this.style.backgroundColor = "orange";
            selectedDate = this.dataset.date;
        });

          calendarGrid.appendChild(dayDiv);
      }
  }

  moodButtons.forEach(button => {
      button.addEventListener("click", function () {
          moodButtons.forEach(btn => btn.classList.remove("selected"));
          this.classList.add("selected");
          selectedMood = this.textContent;
      });
  });

  saveButton.addEventListener("click", function () {
      if (selectedDate && selectedMood) {
          localStorage.setItem(selectedDate, selectedMood);
          renderCalendar(currentYear, currentMonth);
      } else {
          alert("Please select a date and a mood!");
      }
  });

  prevMonthBtn.addEventListener("click", function () {
      currentMonth--;
      if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
      }
      renderCalendar(currentYear, currentMonth);
  });
  nextMonthBtn.addEventListener("click", function () {
      currentMonth++;
      if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
      }
      renderCalendar(currentYear, currentMonth);
  });

  renderCalendar(currentYear, currentMonth);
});
