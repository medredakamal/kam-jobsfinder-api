const app = document.getElementById("app");

var jobsData = [];
var searchData = [];
var searchTerm = "";

const fetchJobsAPI = async (url) => {
  let res = await fetch(url);
  let data = await res.json();
  populateData(jobsData, data);
};

const populateData = (getArray, getData) => {
  if (typeof getData !== "undefined") {
    getData.map((dataItem) => {
      getArray.push(dataItem);
    });
    renderJobs(getArray);
  }
};

const resetJobs = () => {
  const getJobsListItems = document.querySelectorAll("#jobs__list li");
  getJobsListItems.forEach((item, index) => item.remove());
};

const renderTitle = () => {
  const headerTitleDOM = document.createElement("div");
  headerTitleDOM.setAttribute("class", "jobs__header__title");
  headerTitleDOM.innerHTML =
    "<h1>Jobs Finder</h1><p>Created by Med Reda Kamal</p>";
  app.appendChild(headerTitleDOM);
};

const renderJobsContainer = () => {
  const jobsListDOM = document.createElement("ul");
  jobsListDOM.setAttribute("id", "jobs__list");
  jobsListDOM.setAttribute("class", "jobs__list");
  app.appendChild(jobsListDOM);
};

const renderSearchBox = () => {
  const searchBoxDOM = document.createElement("div");
  searchBoxDOM.setAttribute("class", "jobs__search__box");
  searchBoxDOM.innerHTML = `<input id="jobs__search__input" placeholder="Ex: React Developer..."/>`;
  app.appendChild(searchBoxDOM);

  searchBoxDOM.addEventListener("keyup", (e) => {
    searchData = [];
    searchTerm = e.target.value !== "" ? e.target.value : "empty";
    jobsData.filter((item) => {
      if (item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
        searchData.push(item);
      }
    });
    if (searchTerm !== "empty" || !searchData.length >= 1) {
      renderJobs(searchData);
    } else {
      renderJobs(jobsData);
    }
  });
};

const renderJobs = (data) => {
  const getJobsListDOM = document.getElementById("jobs__list");
  resetJobs();
  if (data.length === 0) {
    getJobsListDOM.innerHTML =
      "<p id='jobs__no__data'>No jobs found , try again !</p>";
  } else {
    const getJobsNoData = document.getElementById("jobs__no__data");
    if (getJobsNoData) {
      getJobsNoData.remove();
    }
    data.map((jobitem) => {
      const jobsListItemDOM = document.createElement("li");
      jobsListItemDOM.setAttribute("class", "job__list__item");
      jobsListItemDOM.innerHTML = `<div class="job__logo">
    <a href="#"><img src="${jobitem.logo}" alt="job" /></a>
  </div>
  <div class="job__description">
    <h5 class="job__title">
      <a href="#"
        >${jobitem.title}</a
      >
    </h5>
    <span class="job__location">
      <a href="#">
        <svg
          class="svg-inline--fa fa-map-marker-alt fa-w-12"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="map-marker-alt"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          data-fa-i2svg=""
        >
          <path
            fill="currentColor"
            d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
          ></path>
        </svg>
        ${jobitem.location}
      </a>
    </span>
    <span class="job__date"><a href="#">${jobitem.date}</a></span>
    <span class="job__budget">
    <a href="#" class="amount">$${jobitem.budget}</a></div>
    </span>
  </div>

  <div class="job__apply">
    <a href="#" class="job__apply__btn">Apply</a>
  </div>`;
      return getJobsListDOM.appendChild(jobsListItemDOM);
    });
  }
};

// init
renderTitle();
renderSearchBox();
renderJobsContainer();
fetchJobsAPI("jobs.json");
