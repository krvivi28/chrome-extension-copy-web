const pickbtn = document.querySelector("#pickbtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");
const colorMsg = document.querySelector(".colorMsg");
const errMsg = document.querySelector(".errMsg");
pickbtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (injectResult) => {
      const [data] = injectResult;
      // const hexColor = data.result.sRGBHex;
      // colorGrid.style.backgroundColor = hexColor;
      // colorValue.innerHTML = hexColor;
      console.log(data.result);
      if (data.result) {
        colorMsg.innerHTML =
          "whole content of page is copied to clipboard &check;";
      } else {
        errMsg.innerHTML = "nothing to copy from this web page 	&#10060;";
      }
      try {
        await navigator.clipboard.writeText(data.result);
      } catch (error) {
        errMsg.innerHTML = "nothing to copy from this web page 	&#10060;";
      }
    }
  );
});
async function pickColor() {
  try {
    // const eyeDropper = new EyeDropper();
    // const pickColor = await eyeDropper.open();
    // return pickColor;
    const data = document.documentElement.outerHTML;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// window.addEventListener("load", () => {
//   getData();
// });
// const getData = async () => {
//   try {
//     const res = await fetch("https://api.chucknorris.io/jokes/random");
//     const data = await res.json();
//     document.getElementById("copy").innerHTML = data.value;
//   } catch (error) {}
// };
