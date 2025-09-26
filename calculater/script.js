function parseNumber(raw) {
  const s = String(raw).trim();
  if (s === "") return { ok: false };
  
  const good = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;
  if (!good.test(s)) return { ok: false };
  return { ok: true, n: Number(s) };
}

function calculate() {
  const num1El = document.getElementById("num1");
  const num2El = document.getElementById("num2");
  const num3El = document.getElementById("num3");
  const op = document.getElementById("operation").value;

  num1El.classList.remove("error");
  num2El.classList.remove("error");
  num3El.classList.remove("error");

  const a = parseNumber(num1El.value);
  const b = parseNumber(num2El.value);
  const c = parseNumber(num3El.value);

  if (!a.ok || !b.ok || (op === "add" && !c.ok) || (op === "subtract" && !c.ok) || (op === "multiply" && !c.ok)) {
    if (!a.ok) num1El.classList.add("error");
    if (!b.ok) num2El.classList.add("error");
    if (!c.ok && (op === "add" || op === "subtract" || op === "multiply")) num3El.classList.add("error");
    alert("Please enter valid numbers only (e.g. 12, -3.5, .75)!");
    document.getElementById("result").innerText = "Result: ";
    return;
  }

  if (op === "divide" && b.n === 0) {
    num2El.classList.add("error");
    alert("Cannot divide by zero!");
    document.getElementById("result").innerText = "Result: ";
    return;
  }

 let res;
switch (op) {
  case "add":       res = a.n + b.n + c.n; break;
  case "subtract":  res = a.n - b.n - c.n; break;
  case "multiply":  res = a.n * b.n * c.n; break;
  case "divide":    res = a.n / b.n; break;
}

  document.getElementById("result").innerText = "Result: " + res;
}
