 const topicSelector = document.querySelector("#topic-selector");
const pageSelector = document.querySelector("#pagination-selector");
const divPagination = document.querySelectorAll("#div-pagination > button");

const deleteQuiz = (quiz_id) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("quiz_id", quiz_id);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/delete-quiz", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

const addDeleteAction = (item) => {

    // item.forEach((button) => {
        item.addEventListener("click", () => {
            const quizId = item.id.replace("delete-", "");
            deleteQuiz(quizId);
            window.location.reload();
            // console.log(quizId);
        })
    // })
}

topicSelector.addEventListener("change", () => {
    
    readRq(1, pageSelector.value, topicSelector.value)
})

pageSelector.addEventListener("change", () => {
    readRq(1, pageSelector.value, topicSelector.value)
})

for (let i = 0; i < divPagination.length; i++) {
    divPagination[i].addEventListener("click", () => {
        readRq(i+1, 5, "animals")
    })
}
const readRq = async(page=1, limit=10, type="animals") => {

    const rawQuizes = await fetch(`http://localhost:3000/read-quiz?type=${type}&limit=${limit}&page=${page}`)
        .then((data) => data.json())
        .then((result) => result.data);
    const tbody = document.querySelector('table.table tbody');

    function createQuizElement(quiz, index) {

        const item = document.createElement("tr");
        item.setAttribute("class","alert");
        item.setAttribute("role", "alert")
        item.innerHTML = `
        
            <td>
                
                <label class="checkbox-wrap checkbox-primary">
                    <input type="checkbox" checked>
                        <span class="checkmark"></span>
                </label>
                
            </td >
            <td>
            <div class="img" style="background-image: url(${"http://localhost:3000/" + quiz.imageUrl.replace(/\\/g, "/")});"></div>
            </td>
            <td>
                <a href="/admin/edit.html?id=${quiz._id}">
                    <div class="keyword">
                        <span style="font-size: 23px; text-transform: capitalize;">
                            ${quiz.name}
                        </span>
                        <span>${quiz.hint}</span>
                    </div>
                </a>
            </td>
            
            <td class="type-badge" style="font-size: 18px; color: ${quiz.type.color}">${quiz.type.text.toUpperCase()}</td>
            <td>
                <button id="delete-${quiz._id}" class="delete-button" type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true"><i class="fa fa-close"></i></span>
                </button>
            </td>
        `;
        addDeleteAction(item.querySelector('button.delete-button'));
        
        return item;
        
    }
    const quizes = rawQuizes?.map((quiz) => ({
        ...quiz,
        type: {
            color: "#99b19c",
            text: quiz.type
        },
    }));

    tbody.innerHTML = null;

    quizes ? quizes?.forEach((element, index) => {

        tbody.appendChild(createQuizElement(element, index));
    }) : null;
}
readRq(1, 5, "animals");



console.log("read succesfully")