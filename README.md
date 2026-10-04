# 20 Vanilla JavaScript Projects
**A hands-on collection of interactive web applications built with vanilla JavaScript, HTML5, and CSS3.**

**[Live Demo](https://shalabycode.dev/20-JS-Vanilla-Projects/)** · **[Source](https://github.com/Shalabyelectronics/20-JS-Vanilla-Projects)**

## About
This repository contains mini-applications built following Brad Traversy's "20 Web Projects With Vanilla JavaScript" course. Designed to strengthen fundamental front-end skills without frameworks, it focuses on real-world DOM manipulation, browser APIs, and asynchronous data fetching. Currently, 5 projects are completed and live, with the remaining 15 projects actively in progress.

## Features
- **Form Validator**: Validates username, password length, password matching, and email syntax using regular expressions with dynamic visual feedback.
- **Movie Seat Booking**: Interactive cinema layout with 3D screen perspective, dynamic pricing calculation based on movie selection, and persistent seat reservation using `localStorage`.
- **Custom Video Player**: Custom-styled playback controls, stop button, elapsed timecode calculation, range scrubber, and an Arabic UI layout.
- **Exchange Rate Calculator**: Live currency conversion querying the ExchangeRate-API, instant currency swapping, and an RTL Arabic UI interface.
- **Wealth Users App**: Generates user profiles via the Random User API and performs real-time data operations using JavaScript array methods (`filter`, `sort`, `reduce`, `forEach`).

## Built With
- **Vanilla JavaScript (ES6+)**: Classes, DOM APIs, Higher-Order Array Methods, Promises
- **HTML5 & CSS3**: Semantic markup, Flexbox, CSS Grid, 3D perspective transforms, custom range sliders
- **Browser APIs**: `localStorage`, HTML5 `<video>` API
- **External REST APIs**: [ExchangeRate-API](https://www.exchangerate-api.com/), [Random User API](https://randomuser.me/)

## What I Learned
- Structuring modular, stateful front-end logic using ES6 classes and separation of concerns.
- Persisting and populating UI state across browser sessions using `localStorage` and `JSON` serialization.
- Managing asynchronous data flows with the `fetch` API, including handling loading indicators and error states.
- Utilizing higher-order methods (`map`, `filter`, `sort`, `reduce`) to manipulate API datasets dynamically before updating the DOM.
- Building custom media controls by synchronizing `<input type="range">` elements with video playback events (`timeupdate`).

## Getting Started
To run this project locally without any dependencies or build steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Shalabyelectronics/20-JS-Vanilla-Projects.git
   cd 20-JS-Vanilla-Projects
   ```
2. Open `index.html` in your web browser, or launch it with the VS Code Live Server extension.

## Project Structure
```text
20-JS-Vanilla-Projects/
├── index.html
├── custome-video-player/
│   ├── app.js
│   ├── index.html
│   └── css/ (style.css, progress.css)
├── exchange-rate-my-try/
│   ├── script/app.js
│   ├── css/style.css
│   └── index.html
├── form-vaidator/
│   ├── app.js
│   ├── style.css
│   └── index.html
├── movie-seat-booking/
│   ├── app.js
│   ├── style.css
│   └── index.html
└── practicing-array-methods/
    ├── app.js
    ├── style.css
    └── index.html
```

## Roadmap
- [ ] Complete the remaining 15 projects from the 20-project curriculum.
- [ ] Refactor API calls from Promise chaining to `async`/`await` syntax with structured error boundaries.
- [ ] Improve keyboard accessibility and ARIA attribute support across form inputs and custom controls.

## Author
Mohamed Shalaby
- Website: [shalabycode.dev](https://shalabycode.dev)
- GitHub: [@Shalabyelectronics](https://github.com/Shalabyelectronics)
- LinkedIn: [Mohamed Shalaby](https://www.linkedin.com/in/mhdshalaby/)
