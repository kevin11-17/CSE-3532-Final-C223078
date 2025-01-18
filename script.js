function filterCards(category) {
    const cards = document.querySelectorAll('.video-card');
    const buttons = document.querySelectorAll('.filter-btn');
  
    buttons.forEach((btn) => btn.classList.remove('active'));
    document.querySelector(`.filter-btn[onclick="filterCards('${category}')"]`).classList.add('active');
  
    cards.forEach((card) => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  const filter_btns = document.querySelectorAll(".filter-btn");
  var active_tab;
  data = [
    {
      "category_id": "1000",
      "category": "All"
    },
    {
      "category_id": "1001",
      "category": "Music"
    },
    {
      "category_id": "1003",
      "category": "Comedy"
    },
    {
      "category_id": "1005",
      "category": "Drawing"
    }
  ];
  var current_tab_id;
  var video_grid_container;

  filter_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      active_tab = document.querySelector(".active").innerHTML;
      console.log(active_tab);

      data.forEach((cat)=> {
        if(cat.category == active_tab) {
          current_tab_id = cat.category_id;
          console.log(current_tab_id);
        }
      });

      getDataFromApi(current_tab_id);
    });
  });

  window.onload = (event) => {
    active_tab = "All";
    current_tab_id = 1000;

    video_grid_container = document.querySelector(".video-grid");

    getDataFromApi(current_tab_id);
  };

  // <div class="video-card" data-category="comedy">
  //     <img src="thumbnail1.jpg" alt="Thumbnail 1">
  //     <h3>Building a Winning UX Strategy Using the Kano Model</h3>
  //     <p>Awlad Hossain <span class="verified">✔</span> | 91K views</p>
  // </div>


  async function getDataFromApi(tab_id) {
    try {
      const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${tab_id}`);
      const data = await response.json();
      console.log(data);
      const video_info = data.data;
      console.log(video_info);
      video_info.forEach((vid) => {

        const video_container = document.createElement("div");
        video_container.classList.add("video-card");
        video_container.setAttribute("data-category", `${active_tab}`);
        const video_thumnail = document.createElement("img");
        video_thumnail.setAttribute("src", `${vid.thumbnail}`);
        const video_heading = document.createElement("h3");
        video_heading.innerHTML = `${vid.title}`;

        const author_thumnail = document.createElement("img");
        author_thumnail.setAttribute("src", `${vid.authors[0].profile_picture}`);
        const author_name = document.createElement("p");
        author_name.innerHTML = `${vid.authors[0].profile_name}`;
        const author_verified = document.createElement("img");
        author_verified.setAttribute("src", `${vid.authors[0].verified}`);

        video_container.append(video_thumnail);
        video_container.append(video_heading);
        video_container.append(author_thumnail);
        video_container.append(author_name);
        video_container.append(author_verified);
        

        video_grid_container.append(video_container);

      })
      
    } catch(error) {
        console.error(error);
    }
  }