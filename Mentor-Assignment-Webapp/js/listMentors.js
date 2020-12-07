let mentors = [];

getMentors()

async function getMentors() {
    mentors.splice(0, mentors.length)
    const res = await fetch('https://mentorassignment.herokuapp.com/mentor');
    const response = await res.json();
    response.forEach(mentor => {
        mentors.push(mentor);    
    })  
    AssignMentorTable()
}


function AssignMentorTable(){
    const MentorsTableDiv = document.getElementById('AssignMentorsField')

    MentorsTableDiv.innerHTML = ''
    const MentorsTable =document.createElement('table');
    MentorsTable.className = 'col-sm-12 table text-center';
    const TableHead = document.createElement('thead');
    TableHead.innerHTML = `
                    <th scope="col">Mentor ID</th>
                    <th scope="col">Mentor Name</th>
                    <th scope="col">Mbl Number</th>
                    <th scope="col">Students</th>
    `
    MentorsTable.appendChild(TableHead)
    

    mentors.forEach(mentor=>{
        const mentorRow = document.createElement('tr');
        const mentorid = document.createElement('td')
        mentorid.className = 'align-middle';
        mentorid.innerHTML = mentor.id
        mentorRow.appendChild(mentorid);
        const mentorName = document.createElement('td')
        mentorName.className = 'align-middle';
        mentorName.innerHTML = mentor.name
        mentorRow.appendChild(mentorName);
        const mentorMbl = document.createElement('td')
        mentorMbl.className = 'align-middle';
        mentorMbl.innerHTML = mentor.contact;
        mentorRow.appendChild(mentorMbl);
        const HisStudents = document.createElement('td')
        if(mentor.studentList.length === 0){
            HisStudents.innerHTML =  "No Students Assigned"
        }else{

            HisStudents.innerHTML =  `${mentor.studentList}`
        }
        mentorRow.appendChild(HisStudents);
        MentorsTable.appendChild(mentorRow);
    })
    MentorsTableDiv.appendChild(MentorsTable)
}



