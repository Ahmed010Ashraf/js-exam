// handle the left navbar 
let header = document.querySelector(".header");
let lis = document.querySelectorAll(".left-side .inner-left ul li");
let icon = document.querySelector(".right-side .inner .open-close-icon");
icon.addEventListener("click",function(e) {
    icon.classList.toggle("fa-align-justify");
    icon.classList.toggle("fa-x");
    header.classList.toggle("header-transform");
    lis.forEach(function(li) {
        li.classList.toggle("move-top");
        li.classList.toggle("move-bottom");
    })
});
// take random meals from the api 
let load = document.querySelector(".loader");
let mealsRnadom = document.querySelector(".meals .container");
let cartona = ``;
let arr= [];
(async function(){
    

    if(localStorage.getItem("arr")){
        arr = JSON.parse(localStorage.getItem("arr"));
        for(let i=0; i<arr.length; i++){
            cartona += `
    <div class="box" id=${arr[i].idMeal}>
                <img src="${arr[i].strMealThumb}" alt="">
                <h3>${arr[i].strMeal}</h3>
            </div>
    `
        }
    }
    else {
        for(let i=0; i<20; i++){
            let api = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
            let response = await api.json();
            // console.log(response);
            let meal = response.meals[0];
            arr.push(meal)
            localStorage.setItem("arr",JSON.stringify(arr));
            cartona += `
            <div class="box" id="${response.meals[0].idMeal}">
                        <img src="${response.meals[0].strMealThumb}" alt="">
                        <h3>${response.meals[0].strMeal}</h3>
                    </div>
            `
            }
            // console.log(cartona);
            localStorage.setItem("arr",JSON.stringify(arr));
    }
    load.style.display = "none";
    mealsRnadom.innerHTML = cartona;
})()
// handle the search 
let cartonaofname = `` ;
async function searchByName (name){
    
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let response = await api.json();
    // console.log(response);
    if(response.meals == null){
        cartonaofname = ``
    }
    else {
        load.style.display = "block";
        for(let i = 0 ; i < response.meals.length; i++){
            cartonaofname +=`
        <div class="box" id=${response.meals[i].idMeal}>
                <img src="${response.meals[i].strMealThumb}" alt="">
                <h3>${response.meals[i].strMeal}</h3>
        </div>
        `
        }
    }
    // console.log(cartonaofname);;
    document.querySelector(".content-after-search").innerHTML =cartonaofname; 
    cartonaofname = ``
    load.style.display = "none";
}
let inputtosearchbyname = document.querySelector(".main .form .by-name")
inputtosearchbyname.addEventListener("input", function(){
    searchByName(inputtosearchbyname.value);
});
// move betwean the pages
// console.log(document.querySelector(".search"));
document.querySelector(".search").addEventListener("click", function(){
    document.querySelector(".main").style.display = "block";
    document.querySelector(".meals").style.display = "none";
    icon.classList.toggle("fa-align-justify");
    icon.classList.toggle("fa-x");
    header.classList.toggle("header-transform");
    lis.forEach(function(li) {
        li.classList.toggle("move-top");
        li.classList.toggle("move-bottom");
    })
})



// //////////////////////////////////////////////////////////////////////////
let cartonaofletter = `` ;
async function searchByletter (letter){
    
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let response = await api.json();
    // console.log(response);
    if(response.meals == null){
        cartonaofletter = ``
    }
    else {
        load.style.display = "block";
        for(let i = 0 ; i < response.meals.length; i++){
            cartonaofletter +=`
        <div class="box" id=${response.meals[i].idMeal}>
                <img src="${response.meals[i].strMealThumb}" alt="">
                <h3>${response.meals[i].strMeal}</h3>
        </div>
        `
        }
    }
    // console.log(cartonaofletter);;
    document.querySelector(".content-after-search").innerHTML =cartonaofletter; 
    cartonaofletter = ``
    load.style.display = "none";
}
let inputtosearchbyletter = document.querySelector(".main .form .by-first-litter")
inputtosearchbyletter.addEventListener("input", function(e){
    if(e.target.value.length >= 1){
        e.target.value = e.target.value[0];
        searchByletter(inputtosearchbyletter.value);
    }
});






    async function getDetails(id) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let response = await api.json();
        // console.log(response);
    
        let tags = response.meals[0].strTags;
        let arrtags = tags ? tags.split(",") : [];
        let cartonaofarrtags = arrtags.map(tag => `<p>${tag}</p>`).join("");
        // console.log(cartonaofarrtags);
        // console.log(arrtags);
        // console.log(tags);
        let measureValues = [];
        for (let i = 1; i <= 20; i++) {
            let measure = response.meals[0][`strMeasure${i}`];
            if (measure && measure != undefined && measure != null && measure != "") {
                measureValues.push(`<p>${measure}</p>`);
                console.log(measure);
            }
        }
    
        document.querySelector(".details").innerHTML = `
        <div class="image">
            <div class="image-box">
                <img src="${response.meals[0].strMealThumb}" alt="" />
            </div>
            <h2>${response.meals[0].strMeal}</h2>
        </div>
        <div class="cont">
            <h1>Introduction</h1>
            <p class="intro">${response.meals[0].strInstructions}</p>
            <p class="area">Area: <span>${response.meals[0].strArea}</span></p>
            <p class="Category">Category: <span>${response.meals[0].strCategory}</span></p>
            <p class="Recipes">Recipes:</p>
            <div class="rec">${measureValues.join('')}</div>
            <p class="tags">Tags:</p>
            <div class="tag">${cartonaofarrtags}</div>
            <span class="source" onclick="goto('${response.meals[0].strSource}')">Source</span>
            <span class="youtube" onclick="goto('${response.meals[0].strYoutube}')">YouTube</span>
        </div>
        `;
         
    }
    
    
    document.querySelector('body').addEventListener('click', function(e) {
        // delegation
        // Check if the target is .box or its child
        let boxElement = e.target.closest('.box');
        if (boxElement) {
            
            document.querySelector('.meals').style.display = 'none';
            document.querySelector('.main').style.display = 'none';
            document.querySelector(".main-contact-us").style.display = 'none';
            document.querySelector('.catigories-meals').style.display = 'none';
            document.querySelector('.areacont').style.display = 'none';
            document.querySelector(".ing").style.display = 'none';
            // document.querySelector(".area").style.display = 'none';
            document.querySelector(".ing-meals").style.display="none"
            document.querySelector(".catigories").style.display="none"
            document.querySelector(".catigories-meals").style.display="none"
            document.querySelector('.details').style.display = 'flex';
            getDetails(boxElement.id);
            console.log(boxElement.getAttribute('id'));
        }
   
    });
    
    
    function goto(link){
        window.open(link, '_blank');
    }


    // delegation 

    // document.querySelector('.container').addEventListener('click', function(e) {
    //     if (e.target && e.target.matches('.box')) {
    //         document.querySelector('.details').style.display = 'flex';
    //         document.querySelector('.meals').style.display = 'none';
    //         getDetails(e.target.id);
    //         console.log(e.target.getAttribute('id'));
    //     }
    // })

    //////////////////////////////////////////////////////////
    let catcartona = ``;
    async function getcatigories(){
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        let response = await api.json()
        console.log(response);
        console.log(response.categories[0].strCategoryThumb);
        for(let i = 0 ; i<response.categories.length ; i++){
            catcartona += `
        <div class="box-catt" onclick="displaybymealcat('${response.categories[i].strCategory}')" id="${response.categories[i].idCategory}">
        <img src="${response.categories[i].strCategoryThumb}" alt="">
        <div class="contofcat">
          <h3>${response.categories[i].strCategory}</h3>
          <p>${response.categories[i].strCategoryDescription.slice(0,80)}</p>
        </div>
      </div>
        `
        }
        document.querySelector(".catigories").innerHTML = catcartona;
    }
    document.querySelector(".Category").addEventListener('click', function(e) {
        document.querySelector(".meals").style.display = 'none';
        document.querySelector(".main").style.display = 'none';
        document.querySelector(".details").style.display = 'none';
        document.querySelector(".main-contact-us").style.display = 'none';
        document.querySelector('.catigories-meals').style.display = 'none';
            document.querySelector('.areacont').style.display = 'none';
            document.querySelector(".ing").style.display = 'none';
            document.querySelector(".ing-meals").style.display="none"
            document.querySelector(".area").style.display = 'none';
            document.querySelector(".main-contact-us").style.display = 'none';
        document.querySelector(".catigories").style.display = 'grid';
        getcatigories(); 
    });

    // filter by category
    let cartonaofmealscategory = ``;
    async function getMealsOfCategory(category) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        let req = await api.json();
        console.log(req.meals.length);
        for(let i = 0 ; i < req.meals.length ; i++){
            cartonaofmealscategory += `
            <div class="box" id="${req.meals[i].idMeal}">
        <img src="${req.meals[i].strMealThumb}" alt="">
        <h3>${req.meals[i].strMeal}</h3>
      </div>
            `
        }
        document.querySelector(".catigories-meals").innerHTML = cartonaofmealscategory;
    }
    function displaybymealcat(category){
        document.querySelector(".meals").style.display = 'none';
        document.querySelector(".main").style.display = 'none';
        document.querySelector(".details").style.display = 'none';
        document.querySelector(".main-contact-us").style.display = 'none';
        document.querySelector(".catigories").style.display = 'none';
        document.querySelector('.areacont').style.display = 'none';
        document.querySelector(".ing").style.display = 'none';
        document.querySelector(".ing-meals").style.display="none"
        document.querySelector(".area").style.display = 'none';
        document.querySelector(".catigories-meals").style.display = 'grid';

        getMealsOfCategory(category)
    }

    let areacartona = ``
    async function getareas(){
        areacartona = ``;
        let api = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        let res = await api.json();
        console.log(res);
        for(let i = 0; i < res.meals.length ; i++) {
            areacartona += `
            <div class="box-area" onclick="getmealofarea('${res.meals[i].strArea}')">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <p>${res.meals[i].strArea}</p>
        </div>
            `
        }
        document.querySelector(".area").style.display = 'grid';
        document.querySelector(".area").innerHTML = areacartona
    }
    document.querySelector(".Area1").addEventListener("click", function() {
        document.querySelector(".meals").style.display = 'none';
        document.querySelector(".main").style.display = 'none';
        document.querySelector(".details").style.display = 'none';
        document.querySelector(".main-contact-us").style.display = 'none';
        document.querySelector(".catigories").style.display = 'none';
        document.querySelector(".catigories-meals").style.display = 'none';
        document.querySelector(".ing").style.display = 'none';
        document.querySelector(".ing-meals").style.display = 'none';
        getareas();
    });

    let cartonanew = ``
    async function getmealofarea(area){
        document.querySelector(".meals").style.display = 'none';
        document.querySelector(".main").style.display = 'none';
        document.querySelector(".details").style.display = 'none';
        document.querySelector(".catigories").style.display = 'none';
        document.querySelector(".catigories-meals").style.display = 'none';
        document.querySelector(".area").style.display = 'none';
        document.querySelector(".ing").style.display = 'none';
        document.querySelector(".main-contact-us").style.display = 'none';
        document.querySelector(".ing-meals").style.display="none"
        
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        let res = await api.json()
        console.log(res);
        for(let i = 0 ; i < res.meals.length ; i++){
            cartonanew += `
            <div class="box" id="${res.meals[i].idMeal}">
        <img src="${res.meals[i].strMealThumb}" alt="">
        <h3>${res.meals[i].strMeal}</h3>
      </div>
            `

    }
    document.querySelector(".areacont").style.display = 'grid';
    document.querySelector(".areacont").innerHTML = cartonanew


    }


    // get ingredients 
    let ingcrtona = ``
    async function geting(){
        let api = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
        let res = await api.json()
        for(let i = 0 ; i<25; i++){
            ingcrtona += `
            <div class="ing-box" onclick="getmealbying('${res.meals[i].strIngredient}')">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h2>${res.meals[i].strIngredient}</h2>
        <p>
          ${res.meals[i].strDescription.slice(0,50)}
        </p>
      </div>
            `
        }
        console.log(res.meals[0].strDescription.slice(0,30));
        document.querySelector(".ing").innerHTML = ingcrtona
    }

    document.querySelector(".Ingredients").addEventListener("click",function(){
        document.querySelector(".meals").style.display = 'none';
        document.querySelector(".main").style.display = 'none';
        document.querySelector(".details").style.display = 'none';
        document.querySelector(".main-contact-us").style.display = 'none';
        document.querySelector(".catigories").style.display = 'none';
        document.querySelector(".catigories-meals").style.display = 'none';
        document.querySelector(".area").style.display = 'none';
        document.querySelector(".areacont").style.display = 'none';
        document.querySelector(".ing-meals").style.display="none"
        document.querySelector(".area").style.display = 'none';
        document.querySelector(".ing").style.display = 'grid';
        geting();

    })

    let ingcaronameal = ``
    async function getmealbying(ings){
        document.querySelector(".meals").style.display = 'none';
        document.querySelector(".main").style.display = 'none';
        document.querySelector(".details").style.display = 'none';
        document.querySelector(".catigories").style.display = 'none';
        document.querySelector(".catigories-meals").style.display = 'none';
        document.querySelector(".area").style.display = 'none';
        document.querySelector(".areacont").style.display = 'none';
        document.querySelector(".ing").style.display = 'none';
        document.querySelector(".area").style.display = 'none';
        document.querySelector(".main-contact-us").style.display = 'none';
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ings}`)
        let res = await api.json()
        console.log(res);
        for(let i = 0 ; i<res.meals.length; i++){
            ingcaronameal += `
            <div class="box" id="${res.meals[i].idMeal}">
        <img src="${res.meals[i].strMealThumb}" alt="">
        <h3>${res.meals[i].strMeal}</h3>
      </div>
            `
        }
        document.querySelector(".ing-meals").style.display="grid"
        document.querySelector(".ing-meals").innerHTML = ingcaronameal
    }

    document.querySelector(".Contact-Us").addEventListener("click",function(){
        document.querySelector(".meals").style.display = 'none';
        document.querySelector(".main").style.display = 'none';
        document.querySelector(".details").style.display = 'none';
        document.querySelector(".catigories").style.display = 'none';
        document.querySelector(".catigories-meals").style.display = 'none';
        document.querySelector(".area").style.display = 'none';
        document.querySelector(".areacont").style.display = 'none';
        document.querySelector(".ing").style.display = 'none';
        document.querySelector(".area").style.display = 'none';
        document.querySelector(".main-contact-us").style.display = 'none';
        document.querySelector(".ing-meals").style.display="none";
        document.querySelector(".main-contact-us").style.display = 'block';
    })