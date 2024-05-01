const p = new SimplePeer({
  initiator: location.hash === "#1",
  trickle: false,
});

const sendButton = document.querySelector("#sendButton");

p.on("error", (err) => console.log("error", err));

// триггерится сразу,еси initiator == true
p.on("signal", (data) => {
  console.log('p.on("signal"');

  console.log("SIGNAL", JSON.stringify(data));
  document.querySelector("#outgoing").textContent = JSON.stringify(data);
});

document.querySelector("form").addEventListener("submit", (ev) => {
  ev.preventDefault();
  console.log("form submitted");

  p.signal(JSON.parse(document.querySelector("#incoming").value));
});

p.on("connect", () => {
  const toSend = "whatever" + Math.random();
  console.log("CONNECT");
  console.log("Sent data", toSend);
  p.send(toSend);
});

p.on("data", (data) => {
  console.log("Received data: " + data);
});

// send some random number after CONNECT
sendButton.addEventListener("click", (e) => {
  e.preventDefault();

  const toSend = "from sendButton: " + Math.random();

  console.log("Sent: ", toSend);
  p.send(toSend);
});
