const video = document.getElementById("video");
const subtitlesButton = document.getElementById("subtitles");

// Create an array to store subtitle menu buttons
const subtitleMenuButtons = [];

// Function to create a subtitle menu item
function createMenuItem(id, lang, label) {
  const listItem = document.createElement("li");
  const button = listItem.appendChild(document.createElement("button"));
  button.setAttribute("id", id);
  button.className = "subtitles-button";
  if (lang.length > 0) button.setAttribute("lang", lang);
  button.value = label;
  button.setAttribute("data-state", "inactive");
  button.appendChild(document.createTextNode(label));
  button.addEventListener("click", (e) => {
    // Set all buttons to inactive
    subtitleMenuButtons.forEach((button) => {
      button.setAttribute("data-state", "inactive");
    });

    // Find the language to activate
    const lang = button.getAttribute("lang");
    for (let i = 0; i < video.textTracks.length; i++) {
      if (video.textTracks[i].language === lang) {
        video.textTracks[i].mode = "showing";
        button.setAttribute("data-state", "active");
      } else {
        video.textTracks[i].mode = "hidden";
      }
    }
  });
  subtitleMenuButtons.push(button);
  return listItem;
}

// Function to toggle the subtitles menu display
function toggleSubtitlesMenu() {
  if (subtitlesMenu) {
    subtitlesMenu.style.display =
      subtitlesMenu.style.display === "block" ? "none" : "block";
  }
}

// Add an event listener to the CC button to toggle the subtitles menu
subtitlesButton.addEventListener("click", toggleSubtitlesMenu);

let subtitlesMenu;

if (video.textTracks.length) {
  const df = document.createDocumentFragment();
  subtitlesMenu = df.appendChild(document.createElement("ul"));
  subtitlesMenu.className = "subtitles-menu";
  subtitlesMenu.appendChild(createMenuItem("subtitles-off", "", "Off"));
  for (let i = 0; i < video.textTracks.length; i++) {
    const track = video.textTracks[i];
    subtitlesMenu.appendChild(
      createMenuItem(`subtitles-${track.language}`, track.language, track.label)
    );
  }
}

// Append the subtitles menu to the document
document.body.appendChild(subtitlesMenu);
