const moodBtns = document.querySelectorAll(".mood"); 
const saveBtn = document.getElementById("save");
const moodTimeline = document.getElementById("mood-timeline");
const calendar = document.getElementById("mood-timeline");


let moodSelected = null;

const currDate  = new Date().toLocaleDateString();

let myMoods = {};

moodBtns.forEach( btn =>{
    btn.addEventListener('click', () =>{
        moodSelected = btn.textContent;
        console.log(moodSelected)
        moodBtns.forEach( mood => {
            mood.classList.remove('selected')
        })
        btn.classList.add('selected')
    })
})


saveBtn.addEventListener('click', () =>{
    if(moodSelected){
        myMoods.currDate = currDate;
        myMoods.emoji = moodSelected;
        // console.log(myMoods)
        // console.log(moodSelected)

        // local storage mai daal de 
        
    }else[
        alert('please select mood')
    ]
})

