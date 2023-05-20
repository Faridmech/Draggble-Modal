const showModalBtn = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = document.querySelector(".sheet-overlay");
const sheetContent = bottomSheet.querySelector(".content");

const dragicon = document.querySelector(".drag-icon");

let isDragging = false, startY, sratHeight;


const showBottomSheet = () =>{
  bottomSheet.classList.add("show");
  document.body.style.overflowY = "hidden"
  updateSheetHeight(50)

  
}

const removeBottomSheet = () =>{
  bottomSheet.classList.remove("show")
  document.body.style.overflowY = "auto"
}

const updateSheetHeight = (height)=>{
  sheetContent.style.height = `${height}vh`;
  bottomSheet.classList.toggle("fullscreen", height ===100)
  
}


const dragStart = (e) =>{
  isDragging = true
  startY = e.pageY || e.touches?.[0].pageY;
  sratHeight = parseInt(sheetContent.style.height);
  bottomSheet.classList.add("dragging")
}
const dragging = (e)=>{
  if(!isDragging) return
  const delta = startY - (e.pageY || e.touches?.[0].pageY);
  

  const newHeight = sratHeight + delta / window.innerHeight * 100
  updateSheetHeight(newHeight);
}
const dragStop = ()=>{
  isDragging = false
  bottomSheet.classList.remove("dragging")
  const sheetHeight = parseInt(sheetContent.style.height);
  sheetHeight < 25 ? removeBottomSheet(): sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
}


document.addEventListener("mouseup", dragStop)
dragicon.addEventListener("mousedown", dragStart)
document.addEventListener("mousemove", dragging)

document.addEventListener("touchend", dragStop)
dragicon.addEventListener("touchstart", dragStart)
document.addEventListener("touchemove", dragging)


showModalBtn.addEventListener("click", showBottomSheet)
sheetOverlay.addEventListener("click", removeBottomSheet)