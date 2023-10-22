let generateGif = () => {
    let loader = document.querySelector(".loader");
    loader.style.display = "grid";
    document.querySelector(".wrapper").style.display = "none";
  
    let q = document.getElementById("search").value;
    let gifCount = 10;
    let finalURL = `https://tenor.googleapis.com/v2/search?q=${q}&key=${apiKey}&client_key=my_test_app&limit=${gifCount}`;
  
    document.querySelector(".wrapper").innerHTML = "";
  
    fetch(finalURL)
      .then((resp) => resp.json())
      .then((info) => {
        console.log(info.results);
  
        if (info.results && info.results.length > 0) {
          let gifsData = info.results;
          gifsData.forEach((gif) => {
            let container = document.createElement("div");
            container.classList.add("container");
            let img = document.createElement("img");
            img.src = gif.media_formats.gif.url;
            container.appendChild(img);
            document.querySelector(".wrapper").appendChild(container);
  
            let copyBtn = document.createElement("button");
            copyBtn.innerText = "Copy Link";
            copyBtn.onclick = () => {
              let copyLink = `https://media4.tenor.googleapis.com/media${gif.id}/tenor.mp4`;
  
              navigator.clipboard.writeText(copyLink)
                .then(() => {
                  alert("GIF copied to clipboard");
                })
                .catch(() => {
                  alert("GIF not copied to clipboard");
  
                  let hiddenInput = document.createElement("input");
                  hiddenInput.setAttribute("type", "text");
                  document.body.appendChild(hiddenInput);
  
                  hiddenInput.value = copyLink;
                  hiddenInput.select();
                  document.execCommand("copy");
                  document.body.removeChild(hiddenInput);
                });
            };
            container.appendChild(copyBtn);
          });
        } else {
          console.log("No GIFs found in the response.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      })
      .finally(() => {
        loader.style.display = "none";
        document.querySelector(".wrapper").style.display = "grid";
      });
  };
  
  let submitBtn = document.getElementById("submit-btn");
  submitBtn.addEventListener("click", generateGif);
  window.addEventListener("load", generateGif);
  