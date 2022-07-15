const ul = document.querySelector("ul"),
input = ul.querySelector("input"),
countNumb = document.querySelector(".details span")

let maxTags = 10, 
tags = []
countTag()

function countTag(){
    input.focus()
    countNumb.innerText = maxTags - tags.length
}

function createTag(){
    ul.querySelectorAll('li').forEach(li => li.remove()) //Remove a tag anterior para não duplicar
    tags.slice().reverse().forEach(tag => {
        let liTag = `<li>${tag}<i class="fa-solid fa-xmark" onclick="remove(this, '${tag}')"></i></li>`
        ul.insertAdjacentHTML("afterbegin", liTag);//adicionando li dentro da tag ul
    })
    countTag()
}

function remove(element, tag){
    let index = tags.indexOf(tag) //obtendo a remoção do índice de tags
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)] //removendo a tag selecionada de um array
    element.parentElement.remove()//removendo tag li do elemento
    console.log(tags)
    countTag()
}

function addTag(e){
    if(e.key == "Enter"){
        let tag = e.target.value.replace(/\s+/g, ' '); //Remove espaços desnecessários na tag
        if(tag.length > 1  && !tags.includes(tag)){ //se o comprimento da tag for maior que 1 e a tag ainda não existir então...
           if(tags.length < 10){
                tag.split(',').forEach(tag => { //dividindo cada tag de vírgula
                    tags.push(tag)// adicionando cada tag dentro da array
                    createTag()
                })
           }
        }
        e.target.value = "";
    }
   
}

input.addEventListener("keyup", addTag)

const removeBtn = document.querySelector("button")
removeBtn.addEventListener("click", () => {
    ul.querySelectorAll('li').forEach(li => li.remove())
    tags.length = 0 //esvazia a array
    countTag()
})