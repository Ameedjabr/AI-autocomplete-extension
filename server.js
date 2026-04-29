const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/complete", (req, res) => {
  const { text } = req.body;

  const lowerText = text.toLowerCase().trim();

  let suggestion = "";

  if (!lowerText) {
    suggestion = "";
  } else if (lowerText.endsWith("hello") || lowerText.endsWith("hi")) {
    suggestion = " how are you today?";
  } else if (lowerText.includes("my name is")) {
    suggestion = " and I am filling out this form.";
  } else if (lowerText.includes("i am writing")) {
    suggestion = " to share my thoughts and explain the main idea clearly.";
  } else if (lowerText.includes("this blog is about")) {
    suggestion = " the impact of technology on our daily lives.";
  } else if (lowerText.includes("the purpose of this")) {
    suggestion = " project is to provide smart autocomplete suggestions while users type.";
  } else if (lowerText.includes("i would like to")) {
    suggestion = " learn more about this topic and improve my skills.";
  } else if (lowerText.includes("please")) {
    suggestion = " let me know if you need any additional information.";
  } else if (lowerText.includes("thank you")) {
    suggestion = " for your time and support.";
  } else if (lowerText.includes("ai")) {
    suggestion = " can help users write faster and more efficiently.";
  } else if (lowerText.includes("chrome extension")) {
    suggestion = " that works across different websites without breaking existing functionality.";
  } else if (lowerText.includes("project")) {
    suggestion = " demonstrates autocomplete, tab completion, and local AI-style suggestions.";
  } else {
    suggestion = " and continue writing with a clear and helpful completion.";
  }

  res.json({ suggestion });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});