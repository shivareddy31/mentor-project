let mentors = []
let students = []
let selectedstudent
let selectedmentor
let oldMentor

getMentors()

async function getMentors() {
    mentors.splice(0, mentors.length)
    const res = await fetch('https://mentorassignment.herokuapp.com/mentor');
    const response = await res.json();
    response.forEach(mentor => {
        mentors.push(mentor);    
    })  
}


async function getStudents() {
    students.splice(0, students.length)
    const res = await fetch('https://mentorassignment.herokuapp.com/student');
    const response = await res.json();
    response.forEach(student => {
        students.push(student);    
    })
    UpdateMentorTable()
}
getStudents();
console.log(students)

const modaldiv = document.getElementById("Container");
const modalSelect = document.createElement('div');
modalSelect.className ='modal'
modalSelect.id = 'SelectModal'
modalSelect.innerHTML = `
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Update Mentor to <span style="color:red" id="SelectedStudent"> ${selectedstudent}</span></h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div id="SelectStudentsToAssign" class="modal-body">
            
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>

    </div>
</div>

`
console.log(modaldiv)
// getStudents();
modaldiv.appendChild(modalSelect)

function listStudentsToSelect(){
    const selectGroupForm = document.getElementById('SelectStudentsToAssign');
    selectGroupForm.innerHTML="";
    if(mentors.length === 0){
        const option = document.createElement("div");
        option.className = 'form-group'
        option.innerHTML = ` 
            <button type="button" data-dismiss="modal"  style="letter-spacing: 3px;" class="btn btn-primary form-control">
                No Mentors Found
            </button>
        `
        selectGroupForm.appendChild(option);
    }else{
        mentors.forEach(mentor=>{
            const option = document.createElement("div");
            option.className = 'form-group'
            option.innerHTML = ` 
                <button type="button" data-dismiss="modal" value="${mentor.name}" id="${mentor.name}" onclick="selectedMentor_(this.value)" style="letter-spacing: 3px;" class="btn btn-primary form-control">
                    ${mentor.name}
                </button>
            `
            selectGroupForm.appendChild(option);
        })
        
    }
}
function UpdateMentorTable(){
    const StudentsTableDiv = document.getElementById('UpdateMentorsField')

    StudentsTableDiv.innerHTML = ''
    const MentorsTable =document.createElement('table');
    MentorsTable.className = 'col-sm-12 table text-center';
    const TableHead = document.createElement('thead');
    TableHead.innerHTML = `
                    <th scope="col">Student ID</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Mbl Number</th>
                    <th scope="col">Current Mentor</th>
                    <th scope="col">Update Mentor</th>
    `
    MentorsTable.appendChild(TableHead)
    
    students.forEach(student=>{
        if(student.mentorName === 'Not Assigned'){
        const mentorRow = document.createElement('tr');
        const mentorid = document.createElement('td')
        mentorid.className = 'align-middle';
        mentorid.innerHTML = student.id
        mentorRow.appendChild(mentorid);
        const mentorname = document.createElement('td')
        mentorname.className = 'align-middle';
        mentorname.innerHTML = student.name
        mentorRow.appendChild(mentorname);
        const mentorMbl = document.createElement('td')
        mentorMbl.className = 'align-middle';
        mentorMbl.innerHTML = student.contact;
        mentorRow.appendChild(mentorMbl);
        const CurrentMentor = document.createElement('td')
        CurrentMentor.className = 'align-middle';
        CurrentMentor.innerHTML = student.mentorName;
        mentorRow.appendChild(CurrentMentor);
        const Assigncol = document.createElement('td')
        Assigncol.innerHTML =  "Not Applicable"
        mentorRow.appendChild(Assigncol);
        MentorsTable.appendChild(mentorRow);
        StudentsTableDiv.appendChild(MentorsTable);
    }
    else{
        const mentorRow = document.createElement('tr');
        const mentorid = document.createElement('td')
        mentorid.className = 'align-middle';
        mentorid.innerHTML = student.id
        mentorRow.appendChild(mentorid);
        const mentorname = document.createElement('td')
        mentorname.className = 'align-middle';
        mentorname.innerHTML = student.name
        mentorRow.appendChild(mentorname);
        const mentorMbl = document.createElement('td')
        mentorMbl.className = 'align-middle';
        mentorMbl.innerHTML = student.contact;
        mentorRow.appendChild(mentorMbl);
        const CurrentMentor = document.createElement('td')
        CurrentMentor.className = 'align-middle';
        CurrentMentor.innerHTML = student.mentorName;
        mentorRow.appendChild(CurrentMentor);
        const Assigncol = document.createElement('td')
        Assigncol.innerHTML =  `
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#SelectModal">
             Update Mentor
        </button>
        `
        mentorRow.appendChild(Assigncol);
        MentorsTable.appendChild(mentorRow);
   
        Assigncol.addEventListener('click',()=>{
            const SelectedStudentName = document.getElementById('SelectedStudent');
            SelectedStudentName.style.textTransform = 'capitalize';
            SelectedStudentName.innerHTML =  student.name;
            oldMentor = student.mentorName;
            selectedstudent = student.name;
            document.getElementById('SelectStudentsToAssign').innerHTML='Loading...'
            listStudentsToSelect()
        })
        StudentsTableDiv.appendChild(MentorsTable);
    }
    })
}


async function UpdateMentortoStudent() {
    let data = {
        NewMentor: selectedmentor,
        studentName: selectedstudent,
        OldMentor: oldMentor
    }
    await fetch('https://mentorassignment.herokuapp.com/mentor/UpdateMentor', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


function selectedMentor_(mentor){
    selectedmentor = mentor;
    UpdateMentortoStudent();
    custom_alert("success", "Assigned " + `${selectedstudent}` + " to " + `${selectedmentor}` );
    console.log(oldMentor)
    console.log(selectedmentor)
    console.log(selectedstudent)
    setTimeout(() => {
        document.location.href = "./UpdateMentor.html";
    }, 3500);
}

