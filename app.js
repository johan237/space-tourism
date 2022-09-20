console.log("Hello")
const hamburger = document.querySelector('.hamburger')
const nav = document.querySelector('nav')
hamburger.addEventListener('click', ()=>{
  nav.classList.toggle('burgerActive')
  console.log(hamburger)
  if(nav.classList.contains('burgerActive')){
 hamburger.src = "../starter-code/assets/shared/icon-close.svg"
  }else{
          hamburger.src = `../starter-code/assets/shared/icon-hamburger.svg`
  }
})

// destination file


const navs = Array.from(document.querySelectorAll('.navigation ul li a')
)
console.log(navs)
const radioButtons = Array.from(document.querySelectorAll('main .main-left div .radio-buttons span'))

console.log( radioButtons)

const image = document.querySelector('main .main-left div img')

const title = document.querySelector('main .main-right h1')

const p = document.querySelector('main .main-right p')

const distance = document.querySelector('.main-right .estimation .distance h1')
const travel = document.querySelector('.main-right .estimation .time h1')
const linkSrc = "../starter-code"

navs.forEach(nav=> nav.addEventListener('click',()=>{
  window.event.preventDefault();
  navs.forEach(nav=> nav.classList.contains("active") ? nav.classList.remove('active') : false )
   const index = navs.indexOf(nav)   
   fetch('data.json')
       .then(response => response.json())
          .then(data =>{
            console.log(data)
            nav.classList.toggle('active')
            const  location = data.destinations[index]
            image.src = location.images.png
            p.textContent = location.description
            title.textContent = location.name
            distance.textContent = location.distance
            travel.textContent = location.travel

             
          })
      }
  ))


async function fetchExam() {
  try {
      const response = await fetch(`data.json`, {
          method: 'GET',
          credentials: 'same-origin'
      });
      const exam = await response.json();
      return exam;
  } catch (error) {
      console.error(error);
  }
}

 async function renderExam(item, index) {
  const exam = await fetchExam();
  const result = exam[item]
  const finalResult = result[index]
  return finalResult
 }

radioButtons.forEach(button => button.addEventListener('click', ()=>{
  console.log("clicked"+ radioButtons.indexOf(button))

  var index = radioButtons.indexOf(button)

 const answer =  renderExam("crew", index)
 
 answer.then(function(result) {
   console.log(result)
  document.querySelector('main .main-left div h3').textContent = result.role
  document.querySelector('main .main-left div h2').textContent = result.name
  document.querySelector('main .main-left div p').textContent = result.bio
  document.querySelector('main .main-right div img').src = result.images.png

  radioButtons.forEach(button => button.classList.remove('span-active'))
  button.classList.add('span-active')


});
   
}))

const stacks = Array.from(document.querySelectorAll('main .main-left .stacks span')) 
stacks.forEach(stack => stack.addEventListener('click',()=>{
  var index = stacks.indexOf(stack)

  const answer =  renderExam("technology", index)
  
  console.log(answer)

  answer.then(function(result){
    document.querySelector('main .main-left .main-left-content div h2').textContent = result.name
    document.querySelector('main .main-left .main-left-content div p').textContent = result.description

    document.querySelector('main .main-right div img').src  = result.images.landscape
  

    stacks.forEach(button => button.classList.remove('stack-active'))
  stack.classList.add('stack-active')
  })


}))
// stacks.for
