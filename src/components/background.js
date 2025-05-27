// const applyBackground = () => {
//   document.body.style.backgroundImage = "linear-gradient(to right,rgb(208, 239, 127),rgb(111, 204, 108))";
//   document.body.style.backgroundRepeat = "no-repeat";
//   document.body.style.backgroundSize = "cover";
//   document.body.style.backgroundAttachment = "fixed";
//   document.body.style.margin = "0";
//   document.body.style.fontFamily = "Arial, sans-serif";
// };

// export default applyBackground;
const applyBackground = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    body {
      margin: 0;
      font-family: 'Arial', sans-serif;
      background: linear-gradient(-45deg, #a1c4fd, #c2e9fb, #d4fc79, #96e6a1);
      background-size: 400% 400%;
      animation: gradientBG 15s ease infinite;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  document.head.appendChild(style);
};

export default applyBackground;
