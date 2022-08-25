<script setup lang="ts">
import Parse from "parse/dist/parse.min.js";

const soccerPlayer = new Parse.Object("SoccerPlayer");
const userId = Parse.User.current();
if (userId) {
  alert(
    "You are not connected. It will fail if you follow https://docs.parseplatform.org/js/guide/#pointer-permissions"
  );
}

soccerPlayer.set("playerName", "A. Wed");
soccerPlayer.set("yearOfBirth", 1997);
soccerPlayer.set("emailContact", "a.wed@email.io");
soccerPlayer.set("attributes", ["fast", "good conditioning"]);
soccerPlayer.set("owner", Parse.User.current());
soccerPlayer
  .save()
  .then((result) => {
    alert("New object created with objectId: " + result.id);
  })
  .catch((error) => {
    // TODO
    // If unauthorized or forbidden, you should logout
    alert("Failed to create new object: " + error.message);
  });
</script>

<template>
  <section>Coucou</section>
</template>
