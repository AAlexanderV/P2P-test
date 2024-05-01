const ICE_S_1 = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" },
  { urls: "stun:stun3.l.google.com:19302" },
  { urls: "stun:stun4.l.google.com:19302" },
  { url: "turn:turn.bistri.com:80", credential: "homeo", username: "homeo" },
  {
    url: "turn:turn.anyfirewall.com:443?transport=tcp",
    credential: "webrtc",
    username: "webrtc",
  },
];

const ICE_S_2 = [
  {
    url: "turn:numb.viagenie.ca",
    credential: "muazkh",
    username: "webrtc@live.com",
  },
  {
    url: "turn:192.158.29.39:3478?transport=udp",
    credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
    username: "28224511:1379330808",
  },
  {
    url: "turn:192.158.29.39:3478?transport=tcp",
    credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
    username: "28224511:1379330808",
  },
  {
    url: "turn:turn.bistri.com:80",
    credential: "homeo",
    username: "homeo",
  },
  {
    url: "turn:turn.anyfirewall.com:443?transport=tcp",
    credential: "webrtc",
    username: "webrtc",
  },
];

const p = new SimplePeer({
  initiator: location.hash === "#1",
  trickle: false,

  objectMode: true,
  config: {
    iceServers: [...ICE_S_1, ...ICE_S_2],
  },
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
