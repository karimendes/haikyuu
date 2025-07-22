// header
document.addEventListener("DOMContentLoaded", () => {
  fetch("components/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data

// dark mode
    const toggleBtn = document.getElementById("dark-mode-toggle")
    const moonIcon = document.getElementById("moon-icon")
    const sunIcon = document.getElementById("sun-icon")

    const enableDarkmode = () => {
      document.body.classList.add("dark-mode")
      moonIcon.style.display = "none"
      sunIcon.style.display = "inline"
      localStorage.setItem("darkmode", "active")
    }

    const disableDarkmode = () => {
      document.body.classList.remove("dark-mode")
      moonIcon.style.display = "inline"
      sunIcon.style.display = "none"
      localStorage.setItem("darkmode", "inactive")
    }

    if (localStorage.getItem("darkmode") === "active") {
      enableDarkmode()
    } else {
      disableDarkmode()
    }

    toggleBtn.addEventListener("click", () => {
      if (document.body.classList.contains("dark-mode")) {
        disableDarkmode()
      } else {
        enableDarkmode()
      }
    })

// show mobile menu
    const showMenu = (toggleId, navId) => {
      const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

        toggle.addEventListener("click", () => {
          nav.classList.toggle("show-menu")
          toggle.classList.toggle("show-icon")
        })
      }
      showMenu("nav-toggle", "nav-menu")

// Dropdowns mobile
    const dropdownItems = document.querySelectorAll(".dropdown__item")

    dropdownItems.forEach((item) => {
      const link = item.querySelector(".nav__link")

      link.addEventListener("click", () => {
        dropdownItems.forEach((i) => {
          if (i !== item) i.classList.remove("dropdown-open")
        })

        item.classList.toggle("dropdown-open")
      })
    })
  })

// players section
  const school = document.body.dataset.school
  const players = playerData[school]

  if (!players) {
    console.warn("School not found.")
    return
  }

  const playerKeys = Object.keys(players)
  let currentIndex = 0

  const indicatorContainer = document.getElementById("player-indicators")
  const playerImg = document.getElementById("player-img")
  const playerInfo = document.getElementById("player-info")
  const playerNumber = document.getElementById("player-number")

  const updatePlayer = (index) => {
    const key = playerKeys[index]
    const player = players[key]

    playerImg.src = player.img
    playerImg.alt = player.name

    playerInfo.innerHTML = `
      <h2>${player.name}</h2>
      <p><strong>Grade:</strong> ${player.grade}</p>
      <p><strong>Position:</strong> ${player.position}</p>
      <p><strong>Height:</strong> ${player.height}</p>
      <p><strong>Birthday:</strong> ${player.birthday}</p>
    `

    playerNumber.textContent = player.number.toString().padStart(2, "0")

    document.querySelectorAll(".indicator").forEach((el, i) => {
      el.classList.toggle("active", i === index)
    })
  }

  const renderIndicators = () => {
    indicatorContainer.innerHTML = playerKeys
      .map(
        (key, i) => `
      <img 
        src="${players[key].thumbnail || players[key].img}" 
        alt="${players[key].name}" 
        class="indicator ${i === currentIndex ? "active" : ""}" 
        data-index="${i}"
      />
    `
      )
      .join("")
  }

  indicatorContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("indicator")) {
      currentIndex = parseInt(e.target.dataset.index)
      updatePlayer(currentIndex)
      renderIndicators()
    }
  })

  document.getElementById("prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + playerKeys.length) % playerKeys.length
    updatePlayer(currentIndex)
    renderIndicators()
  })

  document.getElementById("next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % playerKeys.length
    updatePlayer(currentIndex)
    renderIndicators()
  })

  updatePlayer(currentIndex)
  renderIndicators()
})