const btnEl= document.getElementById("btn");
const errorMessageEl =document.getElementById("errorMessage");
const galleryEl= document.getElementById("gallery");
async function loadimage(){
    const inputValue= document.getElementById("input").value;
    if(inputValue > 10 || inputValue < 1){
        errorMessageEl.style.display= "block";
        errorMessageEl.innerText="Number should be between 0 and 11"
        return;
    }
    imgs="";
    try {
        btnEl.style.display="none";
        const loading= `<img src="spinner.svg"/>`
        galleryEl.innerHTML=loading;
        await fetch(
            `https://api.unsplash.com/photos?per_page=${inputValue}&page=${ Math.round( Math.random()*1000
             )} &client_id=DT6dw9xpaQ3I-IqtJd6cNmcN3wZFxRmtQz4VtrhwWd8`
        ).then((res)=>res.json().then((data)=>{
            console.log(data);
            if(data){
                data.forEach((pic)=>{
                  imgs+=`<img src=${pic.urls.small} alt="image"/>
                  `;
                  galleryEl.style.display="block";
                  galleryEl.innerHTML=imgs;
                  btnEl.style.display="block";
                  errorMessageEl.style.display= "none"; 
                });
            }

        })
        );
        
    } catch (error) {
        console.log(error);
        errorMessageEl.style.display= "block";
        errorMessageEl.innerHTML="An error occured..so, try again later";
        btnEl.style.display="block";
    }
    

}
btnEl.addEventListener("click" ,loadimage)