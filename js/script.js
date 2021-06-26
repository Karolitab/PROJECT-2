/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/**
 * Global functions
 */

const itemsPerPage = 10;
let studentList = document.querySelector('.student-list'); /** This variable contains the ul where the students items are displayed*/
let linkList = document.querySelector(".link-list"); /** This variable contains the ul where the students items are displayed*/
const header = document.querySelector('.header');


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students

*/

function showPage(list,page){
/**The list parameter constains the array of of students that will be displayed*/
    const startIndex = (page * itemsPerPage)-itemsPerPage;   
    const endIndex = page * itemsPerPage;    
/**Clear the innerHTML of the UL element*/
    studentList.innerHTML =""; 
/** Create a conditional that if no results match with the search value, "No results found" will display in the page*/
    if (list.length === 0){
      studentList.innerHTML="";
      studentList.insertAdjacentHTML('beforeend', '<h2>No results found </h2>');
/**Else, the students that matched the searchvalue will display */
   } else {
    for(i=0;i<list.length;i++){
         if(i>=startIndex && i<endIndex){
            studentItems= `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${data[i].picture.thumbnail}" alt="Profile Picture">
               <h3>${data[i].name.title} ${data[i].name.first} ${data[i].name.last}</h3>
               <span class="email">${data[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">${data[i].registered.date}</span>
            </div>
         </li>
            `;
            studentList.insertAdjacentHTML('beforeend', studentItems);        
       }
      }
   }
}
/** 
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
**/
   function addPagination(list){
      const numOfPages =  Math.ceil(list.length/itemsPerPage);
      linkList.innerHTML = "";
/**Clear the innerHTML of the UL of the bottons element*/   
      let buttonItems="";
   /**Create a lopp and if conditional that will display the buttons on the page */
      if (numOfPages >= 1){
      for(i=1; i<=numOfPages; i++){
          buttonItems += `<li> <button type="button">${[i]}</button></li>`;
         
         }
      /**Insert the buttons in the HTML */
         linkList.insertAdjacentHTML('beforeend', buttonItems);  
      /**Select the first button and assing it the class of active */
         let buttonActive = document.querySelector(".link-list button");
         buttonActive.className = "active";
      }
   /**Add functionality to the buttons */
      showPage(list, 1);
         linkList.addEventListener('click', (event)=>{
            const clickedButton = event.target;
            if (clickedButton.tagName === "BUTTON"){
               let oldActiveButton = linkList.querySelector("button.active");
               
               oldActiveButton.classList.remove("active");
               
               clickedButton.className = "active";
               showPage(list,clickedButton.textContent);
            }
         });}
   
/**Create the HTML element of the searchBar */
   function buildSearchBar (){
      const buildSearchBar = `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
      `;
      header.insertAdjacentHTML('beforeend', buildSearchBar);
   }
/**Create a functions that will display the students if it matches the results of the search*/
   function searchFunc(searchString){
      searchedList=[];  
      for(let i= 0; i < data.length; i++){
       
        let fullName ="";
        fullName =data[i].name.first;
        fullName += " ";
        fullName += data[i].name.last;
    
        if (fullName.toLowerCase().includes(searchString.toLowerCase())){  
          searchedList.push(data[i]);
          
          }
       }
      return searchedList;
    }
    /** Add event listener for the search bar */
    header.addEventListener("keyup", (e)=> {  
      addPagination(searchFunc(e.target.value));
    });   

    /**Call the functions */
    
    showPage(data,1)
    addPagination(data);
    buildSearchBar();
   