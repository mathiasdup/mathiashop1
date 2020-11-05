import React from 'react';
import './App.css';
import interact from 'interactjs'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte

const notyf = new Notyf({
  types: [
    {
      type: 'info',
      background: '#38B76E',
      duration: 5000,
      dismissible: true
    }
  ]
});

class Mockup extends React.Component {
  
  componentDidMount() {
    const inpFile = document.getElementById('inpFile');
    const previewContainer = document.getElementById("imagePreview");
    const previewImage = previewContainer.querySelector(".image-visibility")
    //
    const realFileBtn = document.getElementById("inpFile")
    const customBtnImg = document.getElementById("custom-button-img")
    //
    const customBtnText = document.getElementById("custom-button-text")
    const messageVisible = document.getElementById("message")
    const frame = document.getElementById("frame")

    inpFile.addEventListener('change', function() {
      const file = this.files[0]
  
      if (file) {
        const reader = new FileReader();
        frame.style.display = "block"
        
        notyf.open({
          type: 'info',
          message: "Déplace l'image en cliquant dessus et redimensionne la en passant ta souris sur les bords de celle ci. L'image doit impérativement être contenue dans le cadre rouge."
        });
        
        previewImage.style.display = "block";
        
        reader.addEventListener("load", function() {
          previewImage.setAttribute("src", this.result);
        });
  
        reader.readAsDataURL(file);
      } else {
        previewImage.style.display = null;
        previewImage.setAttribute("src","")
      }
    })

    customBtnImg.addEventListener('click', () => {
      realFileBtn.click();
    })

    customBtnText.addEventListener('click', () => {
      messageVisible.classList.remove("textarea-visibility")
      frame.style.display = "block"
      notyf.open({
        type: 'info',
        message: "Ajoute ton texte à l'intérieur du cadre rouge. Tu peux sauter des lignes en appuyant sur la touche entrée."
      });
    })

    messageVisible.addEventListener('keyup',(e)=>messageVisible.parentNode.dataset.value = e.target.value)


    interact('.textarea-style')
    .draggable({
      onmove: dragMoveListener
    })

    interact('.image-visibility')
    .draggable({
      onmove: dragMoveListener
    })
    .resizable({
      preserveAspectRatio: false,
      edges: { left: true, right: true, bottom: true, top: true },
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: 'parent'
        }),
  
        interact.modifiers.aspectRatio({
          // make sure the width is always double the height
          ratio: 1}),
  
        // minimum size
        interact.modifiers.restrictSize({
          max: { width: 300, height: 300 },
          min: { width: 100, height: 100 }
        })
      ],
    })
    .on('resizemove', function (event) {
      var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);
  
      // update the element's style
      target.style.width  = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px';
  
      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;
  
      target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';
  
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      target.textContent = event.rect.width + '×' + event.rect.height;
    });
    
  
  function dragMoveListener (event) {
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  
      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';
  
      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }


    
}

  render() {
    return (
      <div className="container">
        <div className="navbar justify-content back"> 
          <ul className="justify-content">
            <li><a className="menu" href="#0">Prototype</a></li>
            <li><a className="menu" href="#0">Prototype</a></li>
            <li><a className="menu" href="#0">Prototype</a></li>
          </ul>
        </div>

        <div className="main">           
            <div id="imagePreview" className="image-preview bck-img tshirt-image white" >
            <div id="frame" className="valid-area"></div>
              <img className="image-visibility" src="" alt="tshirt"></img>
              <label className="input-sizer stacked">
              <textarea id="message" className="textarea-style textarea-visibility" placeholder="Votre texte ici" name="textarea"
       maxLength="50" autoComplete="off" rows="1" cols="15"></textarea></label>
                
            </div>        
        </div>

        <div className="sidebar"> 
            <button id="custom-button-text" className="btn" type="button">
              <svg className="center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30">
                <path d="M384.144 88.087H227.668a7.5 7.5 0 000 15h153.975v66.236h-17.231v-33.118a7.5 7.5 0 00-7.5-7.5h-60.844a7.5 7.5 0 00-7.5 7.5v156.127a7.5 7.5 0 0015.001 0V143.705h45.844v28.118c0 6.893 5.607 12.5 12.5 12.5h22.231c6.893 0 12.5-5.607 12.5-12.5v-71.236c0-6.893-5.607-12.5-12.5-12.5z"/><path d="M341.431 379.22h-37.863v-33.555a7.5 7.5 0 00-15 0v41.054a7.5 7.5 0 007.5 7.5h42.863v14.693H173.068V394.22h42.863a7.5 7.5 0 007.5-7.5V136.205a7.5 7.5 0 00-7.5-7.5h-60.844a7.5 7.5 0 00-7.5 7.5v33.118h-17.231v-66.236H175a7.5 7.5 0 000-15h-47.144c-6.893 0-12.5 5.607-12.5 12.5v71.236c0 6.893 5.607 12.5 12.5 12.5h22.231c6.893 0 12.5-5.607 12.5-12.5v-28.118h45.844V379.22h-37.863c-6.893 0-12.5 5.607-12.5 12.5v19.693c0 6.893 5.607 12.5 12.5 12.5h170.865c6.892 0 12.5-5.607 12.499-12.5V391.72c-.001-6.893-5.608-12.5-12.501-12.5zM54.553 0H22.182c-6.893 0-12.5 5.607-12.5 12.5v32.372c0 6.893 5.607 12.5 12.5 12.5h32.372c6.892 0 12.5-5.608 12.5-12.5V12.5C67.053 5.607 61.446 0 54.553 0zm-2.5 42.371H24.682V15h27.372v27.371zM489.818 0h-32.372c-6.893 0-12.5 5.607-12.5 12.5v8.686H422.2a7.5 7.5 0 000 15h22.747v8.686c0 6.893 5.607 12.5 12.5 12.5h8.686v22.5a7.5 7.5 0 0015 0v-22.5h8.686c6.893 0 12.5-5.607 12.5-12.5V12.5C502.318 5.607 496.71 0 489.818 0zm-2.5 42.371h-27.372V15h27.372v27.371zM489.818 454.629h-8.686v-29.764a7.5 7.5 0 00-15 0v29.764h-8.686c-6.893 0-12.5 5.607-12.5 12.5v8.686H422.2a7.5 7.5 0 000 15h22.747v8.686c0 6.893 5.607 12.5 12.5 12.5h32.372c6.893 0 12.5-5.607 12.5-12.5v-32.372c-.001-6.892-5.609-12.5-12.501-12.5zm-2.5 42.371h-27.372v-27.372h27.372V497zM38.368 192.369a7.5 7.5 0 00-7.5 7.5v30a7.5 7.5 0 0015 0v-30a7.501 7.501 0 00-7.5-7.5zM38.368 117.37a7.5 7.5 0 00-7.5 7.5v30a7.5 7.5 0 0015 0v-30a7.501 7.501 0 00-7.5-7.5zM38.368 267.368a7.5 7.5 0 00-7.5 7.5v30a7.5 7.5 0 0015 0v-30a7.501 7.501 0 00-7.5-7.5z"/><path d="M38.368 42.371a7.5 7.5 0 00-7.5 7.5v30a7.5 7.5 0 0015 0v-30a7.501 7.501 0 00-7.5-7.5zM38.368 342.367a7.5 7.5 0 00-7.5 7.5v30a7.5 7.5 0 0015 0v-30a7.501 7.501 0 00-7.5-7.5zM473.633 117.37a7.5 7.5 0 00-7.5 7.5v30a7.5 7.5 0 0015 0v-30a7.5 7.5 0 00-7.5-7.5zM473.633 267.368a7.5 7.5 0 00-7.5 7.5v30a7.5 7.5 0 0015 0v-30a7.5 7.5 0 00-7.5-7.5zM473.633 342.367a7.5 7.5 0 00-7.5 7.5v30a7.5 7.5 0 0015 0v-30a7.5 7.5 0 00-7.5-7.5zM473.633 192.369a7.5 7.5 0 00-7.5 7.5v30a7.5 7.5 0 0015 0v-30a7.5 7.5 0 00-7.5-7.5zM302.202 475.815h-30a7.5 7.5 0 000 15h30a7.5 7.5 0 000-15zM227.203 475.815h-30a7.5 7.5 0 000 15h30a7.5 7.5 0 000-15zM77.205 475.815H67.053v-8.686c0-6.893-5.607-12.5-12.5-12.5h-8.686v-29.764a7.5 7.5 0 00-15 0v29.764h-8.686c-6.893 0-12.5 5.607-12.5 12.5V499.5c0 6.893 5.607 12.5 12.5 12.5h32.372c6.893 0 12.5-5.607 12.5-12.5v-8.686h10.152a7.5 7.5 0 000-14.999zM52.053 497H24.682v-27.372h27.372V497zM152.204 475.815h-30a7.5 7.5 0 000 15h30a7.5 7.5 0 000-15zM377.201 475.815h-30a7.5 7.5 0 000 15h30a7.5 7.5 0 000-15zM377.201 21.186h-30a7.5 7.5 0 000 15h30a7.5 7.5 0 000-15zM227.203 21.186h-30a7.5 7.5 0 000 15h30a7.5 7.5 0 000-15zM302.202 21.186h-30a7.5 7.5 0 000 15h30a7.5 7.5 0 000-15zM152.204 21.186h-30a7.5 7.5 0 000 15h30a7.5 7.5 0 000-15zM77.205 21.186H61.374a7.5 7.5 0 000 15h15.831a7.5 7.5 0 000-15z"/>
              </svg>Ajouter <b>un texte</b>
            </button>
            <button id="custom-button-img" className="btn" type="button">
              <svg className="center" viewBox="0 0 512 512" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                <path d="M191.35 127.709V81.242c0-11.158 9.045-20.203 20.203-20.203h88.894c11.158 0 20.203 9.045 20.203 20.203v46.467z" fill="#818181"/><path d="M223.675 93.364h64.65v34.346h-64.65z" fill="#9dc6fb"/><path d="M118.618 127.709H49.927v-24.244c0-5.579 4.523-10.102 10.102-10.102h48.488c5.579 0 10.102 4.523 10.102 10.102v24.244z" fill="#818181"/><path d="M504.5 188.319v202.033H7.5V188.319z" fill="#f9f6f9"/><path d="M393.382 306.508c9.484 0 17.173-7.689 17.173-17.173s-7.689-17.173-17.173-17.173h-19.193v34.346zM118.618 306.508c-9.484 0-17.173-7.689-17.173-17.173s7.689-17.173 17.173-17.173h19.193v34.346z" fill="#454545"/><path d="M7.5 188.319v-50.508c0-5.579 4.523-10.102 10.102-10.102h476.797c5.579 0 10.102 4.523 10.102 10.102v50.508zM504.5 390.352v50.508c0 5.579-4.523 10.102-10.102 10.102H17.601c-5.579 0-10.102-4.523-10.102-10.102v-50.508z" fill="#eab14d"/><path d="M480.256 188.319H504.5v202.033h-24.244z" fill="#dfdde2"/><path d="M494.399 127.709h-24.244c5.579 0 10.102 4.523 10.102 10.102v50.508H504.5v-50.508c0-5.579-4.523-10.102-10.101-10.102zM480.256 390.352v50.508c0 5.579-4.523 10.102-10.102 10.102h24.244c5.579 0 10.102-4.523 10.102-10.102v-50.508z" fill="#e49542"/><circle cx="256" cy="289.335" fill="#818181" r="120.209"/><path d="M334.178 198.025c18.013 21.019 28.899 48.326 28.899 78.178 0 66.39-53.82 120.209-120.209 120.209-29.852 0-57.159-10.886-78.178-28.899 22.047 25.726 54.773 42.031 91.31 42.031 66.39 0 120.209-53.82 120.209-120.209 0-36.537-16.305-69.263-42.031-91.31z" fill="#595959"/><circle cx="256" cy="289.335" fill="#454545" r="87.884"/><circle cx="256" cy="289.335" fill="#9dc6fb" r="40.407"/><path d="M275.318 253.855a40.156 40.156 0 014.926 19.318c0 22.28-18.126 40.406-40.407 40.406a40.159 40.159 0 01-19.318-4.926c6.863 12.554 20.193 21.089 35.48 21.089 22.28 0 40.407-18.126 40.407-40.407.001-15.287-8.534-28.617-21.088-35.48z" fill="#80b4fb"/><circle cx="441.87" cy="188.319" fill="#e28086" r="26.264"/><path d="M494.398 120.209H328.15V81.242c0-15.275-12.428-27.703-27.703-27.703h-88.895c-15.275 0-27.703 12.428-27.703 27.703v38.968h-57.731v-16.744c0-9.706-7.896-17.602-17.602-17.602H60.028c-9.705 0-17.602 7.896-17.602 17.602v16.744H17.602C7.896 120.209 0 128.105 0 137.811v170.332c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5V195.819h154.126c-19.361 17.998-33.142 41.915-38.435 68.843h-12.074c-13.604 0-24.673 11.068-24.673 24.673s11.068 24.673 24.673 24.673h12.074c5.293 26.928 19.074 50.845 38.435 68.843H15v-39.66c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v97.668c0 9.706 7.896 17.602 17.602 17.602h476.797c9.705 0 17.602-7.896 17.602-17.602V261.798c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v121.054H342.874c19.361-17.998 33.142-41.915 38.435-68.843h12.074c13.604 0 24.673-11.068 24.673-24.673s-11.068-24.673-24.673-24.673h-12.074c-5.292-26.928-19.074-50.845-38.434-68.843h66.082c3.421 15.018 16.875 26.264 32.915 26.264 16.039 0 29.492-11.245 32.914-26.264H497v30.966c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-88.975c0-9.706-7.896-17.602-17.602-17.602zM198.85 81.242c0-7.004 5.698-12.703 12.703-12.703h88.895c7.005 0 12.703 5.699 12.703 12.703v38.968h-17.325V93.364a7.5 7.5 0 00-7.5-7.5h-64.65a7.5 7.5 0 00-7.5 7.5v26.846H198.85zm32.325 38.967v-19.346h49.65v19.346zM57.427 103.465a2.605 2.605 0 012.602-2.602h48.488a2.605 2.605 0 012.602 2.602v16.744H57.427zm61.191 195.543c-5.334 0-9.673-4.339-9.673-9.673s4.339-9.673 9.673-9.673h10.037a129.04 129.04 0 000 19.346zM497 397.852v43.008a2.605 2.605 0 01-2.602 2.602H17.602A2.605 2.605 0 0115 440.86v-43.008h173.743c19.545 12.158 42.593 19.193 67.257 19.193s47.712-7.035 67.257-19.193zM393.382 279.663c5.334 0 9.673 4.339 9.673 9.673s-4.339 9.673-9.673 9.673h-10.037a129.04 129.04 0 000-19.346zm-24.673 9.672c0 62.148-50.561 112.709-112.709 112.709s-112.709-50.561-112.709-112.709S193.852 176.626 256 176.626s112.709 50.561 112.709 112.709zm73.161-82.252c-10.33 0-18.736-8.391-18.762-18.716l.002-.048-.002-.049c.026-10.324 8.432-18.717 18.762-18.717 10.334 0 18.741 8.397 18.762 18.726l-.002.039.002.038c-.022 10.331-8.428 18.727-18.762 18.727zm32.914-26.263c-3.421-15.019-16.875-26.265-32.914-26.265-16.04 0-29.494 11.246-32.915 26.265h-85.698c-19.545-12.158-42.594-19.194-67.258-19.194s-47.712 7.035-67.257 19.193H15v-43.008a2.605 2.605 0 012.602-2.602h476.797a2.605 2.605 0 012.602 2.602v43.009z"/><path d="M303.906 289.335c0-26.416-21.49-47.907-47.906-47.907s-47.906 21.491-47.906 47.907 21.49 47.906 47.906 47.906 47.906-21.49 47.906-47.906zm-80.812 0c0-18.145 14.762-32.907 32.906-32.907s32.906 14.762 32.906 32.907-14.762 32.906-32.906 32.906-32.906-14.761-32.906-32.906z"/><path d="M256 193.951c-16 0-31.84 4.058-45.808 11.735a7.5 7.5 0 007.225 13.146c11.761-6.464 25.103-9.881 38.583-9.881 44.324 0 80.384 36.06 80.384 80.384S300.324 369.72 256 369.72s-80.384-36.06-80.384-80.384c0-18.233 5.978-35.435 17.286-49.745a7.5 7.5 0 00-11.769-9.3c-13.422 16.985-20.517 37.403-20.517 59.045 0 52.595 42.789 95.384 95.384 95.384s95.384-42.789 95.384-95.384-42.789-95.385-95.384-95.385z"/>
              </svg>Télécharger <b>image</b>
            </button>
            <input id="inpFile" hidden="hidden" type="file" name="inpFile" ></input>
            <button className="btn call-to-action" type="button">
            <svg className="center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30">
              <g fill="#455a64"><circle cx="394.667" cy="426.671" r="53.333"/><circle cx="181.333" cy="426.671" r="53.333"/></g><path d="M488 78.276a10.665 10.665 0 00-8-3.605H96c-5.891-.001-10.668 4.773-10.669 10.664 0 .717.072 1.433.216 2.136l42.667 213.333a10.667 10.667 0 0010.453 8.533c.469.031.939.031 1.408 0l320-42.667a10.666 10.666 0 009.173-9.259l21.333-170.667A10.661 10.661 0 00488 78.276z" fill="#ffc107"/><g fill="#fafafa"><path d="M181.333 266.671a10.666 10.666 0 01-10.517-8.917l-21.333-128c-.791-5.838 3.3-11.211 9.138-12.002a10.667 10.667 0 0111.897 8.504l21.333 128c.963 5.808-2.961 11.298-8.768 12.267-.578.099-1.163.149-1.75.148zM234.667 256.004A10.667 10.667 0 01224 246.297l-10.667-117.333c-.552-5.865 3.755-11.067 9.621-11.619l.086-.008c5.867-.531 11.053 3.796 11.584 9.663v.001l10.667 117.333c.53 5.867-3.796 11.053-9.663 11.584h-.001l-.96.086zM288 245.337c-5.891 0-10.667-4.776-10.667-10.667V128.004c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667v106.667c0 5.891-4.776 10.666-10.667 10.666zM341.333 234.671h-1.195c-5.858-.62-10.104-5.872-9.484-11.731l.012-.109 10.667-96c.692-5.867 5.963-10.093 11.84-9.493 5.855.648 10.077 5.919 9.43 11.775v.001l-10.667 96a10.667 10.667 0 01-10.603 9.557zM394.667 224.004a10.667 10.667 0 01-10.347-13.248l21.333-85.333c1.293-5.747 7.001-9.358 12.748-8.065 5.747 1.293 9.358 7.001 8.065 12.748a9.897 9.897 0 01-.12.48l-21.333 85.333a10.665 10.665 0 01-10.346 8.085z"/></g><path d="M437.333 352.004H191.125c-35.558-.082-66.155-25.16-73.216-60.011L65.92 32.004H10.667C4.776 32.004 0 27.228 0 21.337S4.776 10.67 10.667 10.67h64a10.666 10.666 0 0110.453 8.533l53.717 268.587c5.035 24.896 26.888 42.817 52.288 42.88h246.208c5.891 0 10.667 4.776 10.667 10.667s-4.776 10.667-10.667 10.667z" fill="#455a64"/>
            </svg>Ajouter <b>au panier</b>
            </button>
        </div>

        <div className="footer"> 
            <div className="form-selection">T-shirt <b>couleur</b></div>
              <button className="color-selection tshirt-color white" onClick={() => {document.getElementById("imagePreview").className = 'white tshirt-image image-preview bck-img'}}></button>
              <button className="color-selection tshirt-color red" onClick={() => {document.getElementById("imagePreview").className = 'red tshirt-image image-preview bck-img'}}></button>
              <button className="color-selection tshirt-color yellow" onClick={() => {document.getElementById("imagePreview").className = 'yellow tshirt-image image-preview bck-img'}}></button>
              <button className="color-selection tshirt-color blue" onClick={() => {document.getElementById("imagePreview").className = 'blue tshirt-image image-preview bck-img'}}></button>
              <button className="color-selection tshirt-color green" onClick={() => {document.getElementById("imagePreview").className = 'green tshirt-image image-preview bck-img'}}></button>
              <button className="color-selection tshirt-color pink" onClick={() => {document.getElementById("imagePreview").className = 'pink tshirt-image image-preview bck-img'}}></button>
            </div>
        </div>
        



)}








}

export default Mockup;


