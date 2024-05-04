import io from "socket.io-client";


const socket = io("ws://localhost:5055");


socket.on("connect", () => console.log("CONNECTED"));



// socket.on("update", resp => console.log(resp));

socket.on("multiplier", mult => console.log(mult));

socket.on("busted", bust => console.log("Busted @:", bust));




socket.on("disconnect", () => console.log("[DISCONECTED]"));


