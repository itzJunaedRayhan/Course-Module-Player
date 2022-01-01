const milestonesData = JSON.parse(data).data;
//  load Course milestones data
function loadMilestones() {
  const milestone = document.querySelector(".milestones");
  milestone.innerHTML = `${milestonesData
    .map((milestone) => {
      return `<div class="milestone border-b" id="${milestone._id}">
        <div class="flex">
          <div class="checkbox"><input type="checkbox" onclick= "markMileStone(this, ${
            milestone._id
          })" /></div>
          <div onclick="openMilestone(this, ${milestone._id})">
            <p>
              ${milestone.name}
              <span><i class="fas fa-chevron-down"></i></span>
            </p>
          </div>
        </div>
        <div class="hidden_panel">
          ${milestone.modules
            .map((module) => {
              return `<div class="module border-b">
            <p>${module.name}</p>
          </div>`;
            })
            .join("")}
        </div>
      </div>`;
    })
    .join("")}`;
}

//  open milestone
function openMilestone(milestoneElement, id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const shownPanel = document.querySelector(".show");
  const active = document.querySelector(".active");
  // first hide previous panel if open [other than the clicked element]
  if (!currentPanel.classList.contains("show") && shownPanel) {
    shownPanel.classList.remove("show");
  }
  // toggle current element
  currentPanel.classList.toggle("show");

  // first remove previous active class if any [other than the clicked one]
  if (!milestoneElement.classList.contains("active") && active) {
    active.classList.remove("active");
  }
  //  toggle current element
  milestoneElement.classList.toggle("active");

  showMilestone(id);
}

function showMilestone(id) {
  const milestoneImage = document.querySelector(".milestoneImage");
  const name = document.querySelector(".title");
  const details = document.querySelector(".details");

  milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesData[id].image;
  name.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;
}

//    listen for hero image load
const milestoneImage = document.querySelector(".milestoneImage");
  milestoneImage.onload = function () {
    this.style.opacity = "1";
};

//    mark MileStone
function markMileStone(checkbox, id) {
  const doneList = document.querySelector(".doneList");
  const milestonesList = document.querySelector(".milestones");
  const item = document.getElementById(id);

  if (checkbox.checked) {
    milestonesList.removeChild(item);
    doneList.appendChild(item);
  } else {
    // back to main list
    const num = parseInt(item.id);
    for (i = 0; i < 14; i++) {
      const children = milestonesList.childNodes;
      const childArr = [...children];
      const EachChildId = childArr.map((elm) => parseInt(elm.id));

      if (EachChildId.includes(num + i)) {
        const nextElement = childArr.find((child) => child.id - i == num);
        //const nextMilestone = milestonesList.childNodes[childArr.indexOf(nextElement)];
        milestonesList.insertBefore(item, nextElement);
        break;

      } else if (i === 13 && !EachChildId.includes(num + i)) {
        milestonesList.appendChild(item);

      } else if (i !== 14 && !EachChildId.includes(num + i)) {
        continue;
      }
    }
  }
}
loadMilestones();
