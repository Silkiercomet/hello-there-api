document.addEventListener("click", e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return
  
    let currentDropdown
    if (isDropdownButton) {
      currentDropdown = e.target.closest("[data-dropdown]")
      currentDropdown.classList.toggle("active")
    }
  
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
      if (dropdown === currentDropdown) return
      dropdown.classList.remove("active")
    })
  })
  //*********************************************************************************************** api */


const compose = (f,g) => (data) => f(g(data))

async function fetchIp() {
    let response = await fetch("http://ip-api.com/json/")
    .then(e => e.json())
    .catch(err => console.log(err))
    return response
}

async function fetchGreeting(x){
    x.then( async ip =>{
        let locationIp = ip.query, user = document.querySelector("#email");
        let response = await fetch(`https://fourtonfish.com/hellosalut/?ip=${locationIp}`)
        //let response = await fetch(`https://fourtonfish.com/hellosalut/?lang=dz`)
        .then(x => x.json())
        document.querySelector(".greeting").textContent = response.hello;
        (user.value == "")? document.querySelector(".username").textContent = "Stranger" : document.querySelector(".username").textContent = user.value
        return response
    })
}

let see = compose(fetchGreeting,fetchIp)
see()

document.querySelector(".input__submit").addEventListener("click",(e) => {
    e.preventDefault()
    see()
})
