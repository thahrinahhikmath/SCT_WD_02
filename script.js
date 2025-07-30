const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn,.operator");
const historyList = document.getElementById("history-list");

let history = [];

function updateHistory(expression, result) {
  history.unshift(`${expression} = ${result}`);
  if (history.length > 3) history.pop();

  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    switch (value) {
  case "C":
    display.value = "";
    break;
  case "=":
  try {
    const expression = convertPercent(display.value); 
    const result = eval(expression);
    updateHistory(display.value, result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
  break;
  
  case "←":
    display.value = display.value.slice(0, -1);
    break;
  case "%":
    display.value += "%";
    break;
  default:
    display.value += value;
}

  });
});

document.addEventListener("keydown", e => {
  if ("0123456789+-*/().".includes(e.key)) {
    display.value += e.key;
  } else if (e.key === "Enter") {
    try {
      const result = eval(display.value);
      updateHistory(display.value, result);
      display.value = result;
    } catch {
      display.value = "Error";
    }
  } else if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (e.key.toLowerCase() === "c") {
    display.value = "";
  }
});

const toggleBtn = document.getElementById("toggle-history");
const historySection = document.getElementById("history-section");

toggleBtn.addEventListener("click", () => {
  if (historySection.style.display === "none") {
    historySection.style.display = "block";
    toggleBtn.textContent = "Hide History";
  } else {
    historySection.style.display = "none";
    toggleBtn.textContent = "History";
  }
});
function convertPercent(expr) {
  return expr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
}

document.getElementById("erase").addEventListener("click", () => {
  display.value = display.value.slice(0, -1);
});