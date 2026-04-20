const debounceInput = document.getElementById("debounce-input");
const debounceOutput = document.getElementById("debounce-output");
const tracker = document.getElementById("tracker");
const trackerDot = document.getElementById("tracker-dot");
const trackerCoords = document.getElementById("tracker-coords");

// Debounce
function debounce(callback, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const debouncedOutput = debounce((e) => {
  debounceOutput.textContent = e.target.value || "\u2014";
}, 200);

debounceInput.addEventListener("input", (e) => {
  debouncedOutput(e);
});

// Throttle
function throttle(callback, minTime) {
  let start = Date.now();
  return (...args) => {
    if (Date.now() - start >= minTime) {
      callback(...args);
      start = Date.now();
    }
  };
}

function track(e) {
  const rect = tracker.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  trackerDot.style.left = `${x}px`;
  trackerDot.style.top = `${y}px`;
  trackerCoords.textContent = `x: ${Math.round(x)}   y: ${Math.round(y)}`;
}

const throttledTrack = throttle(track, 400);

tracker.addEventListener("mousemove", throttledTrack);
