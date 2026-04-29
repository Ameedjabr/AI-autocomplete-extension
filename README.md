# 🧠 AI Autocomplete Chrome Extension (Local)

A Chrome Extension that provides AI-style autocomplete suggestions for text fields across websites — similar to how Cursor assists with code, but for general text input.

---

## 🚀 Overview

This project implements a lightweight AI-powered autocomplete system that works inside standard text inputs and textareas on any website.

As users type, the extension:
- Sends the current text to a local AI server
- Displays inline suggestions
- Allows accepting suggestions using the Tab key

The goal is to simulate a real-time writing assistant that enhances productivity when filling forms, writing blogs, or entering text online.

---

## ✨ Features

- Inline suggestions while typing
- Press Tab to accept completion
- Works across websites (textarea & input fields)
- Accurate cursor-based positioning
- Debounced requests for low latency
- Local AI-like backend (Node.js)
- Handles:
  - scrolling
  - resizing
  - focus/blur
  - text selection

---

## 🛠️ Tech Stack

- JavaScript (Vanilla)
- Chrome Extension (Manifest V3)
- Node.js
- Express.js
- HTML / CSS
- DOM Manipulation
- REST API

---

## 📁 Project Structure

ai-autocomplete-extension/

- manifest.json        # Chrome extension configuration
- content.js           # Main logic (autocomplete + UI)
- content.css          # Styling for suggestions
- background.js        # Background service worker (reserved)
- test.html            # Local testing page
- server.js            # Local AI backend (Express)
- package.json
- node_modules/

---

## ⚙️ Installation & Setup

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/ai-autocomplete-extension.git  
cd ai-autocomplete-extension

2. Install dependencies

npm install

3. Run the local AI server

npm start

Server will run on:
http://localhost:3000

4. Load the Chrome Extension

- Open Chrome
- Go to chrome://extensions
- Enable Developer Mode
- Click Load unpacked
- Select the project folder

---

## 🧪 Usage

Start typing in any supported field.

Example:

I am writing

You will see a suggestion appear inline.  
Press Tab to accept it.

---

## 🌍 Where it works

- Textareas  
- Input fields (text, search, email, url)  
- Forms on most websites  

---

## ⚠️ Limitations

- Does not fully support contenteditable editors (e.g., Google Docs, Gmail)
- Suggestions are generated using mock AI logic (rule-based)
- Undo/Redo depends on browser behavior

---

## 🔮 Future Improvements

- Integrate real AI models (OpenAI or local LLM)
- Support contenteditable editors
- Improve suggestion quality
- Add customization options
- Store user preferences

---

## 🎥 Demo

(Add your video link here)

---

## 💡 Key Concepts Demonstrated

- Chrome Extension development (Manifest V3)
- DOM event handling
- Caret position calculation
- Debouncing for performance
- REST API communication
- UI overlay rendering

---

## 📌 Conclusion

This project demonstrates how AI-like behavior can be integrated into everyday web interactions using browser extensions, providing users with a seamless autocomplete experience across websites.

---

## 👤 Author

Ameed Jabr
