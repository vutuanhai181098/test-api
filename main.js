/* API: https://dog.ceo/api/breeds/list/all */

const selectEl = document.querySelector('.breed-list');
const btn = document.querySelector('.btn');
const subBreedsEL = document.querySelector('.sub-breeds');
const imageEl = document.querySelector('.image');

async function getBreedList(){
    try {
        let res = await axios.get("https://dog.ceo/api/breeds/list/all");
        renderBreed(res.data.message)

    } catch (error) {
        console.log(error);
    }
}

function renderBreed(arr) {
    for(let key in arr){
        selectEl.innerHTML += `<option value="${key}">${key}</option>`;
    }
}
btn.addEventListener('click', async function (){
    try {
        let breed = selectEl.options[selectEl.selectedIndex].textContent;
        let res = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
        let content = "";
        if(res.data.message.length == 0){
            content = `<li>Không có sub breed</li>`
        } else {
            res.data.message.forEach(e => {
                content += `<li><a onclick="getImage(event)">${e}</a></li>`
            });
        }

        subBreedsEL.innerHTML = `
            <h3>Sub Breeds List</h3>
            <ul>
                ${content}
            </ul>
        `;
        imageEl.src="";
    } catch(err){
        console.log(err);
    }
})

async function getImage(event){
    try {
        const aList = document.querySelectorAll('.sub-breeds a');
        aList.forEach(e => {
            e.style.color ='#333';
        })
        event.target.style.color = '#1782c4';
        let breed = selectEl.options[selectEl.selectedIndex].textContent;
        let subBreed = event.target.textContent;
        let res = await axios.get(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`)
        imageEl.src = res.data.message;
    } catch (error) {
        console.log(error)
    }
}


getBreedList();
