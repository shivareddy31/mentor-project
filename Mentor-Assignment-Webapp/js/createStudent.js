async function addStudent() {
    const submitBtn = document.getElementById('StudentSubmitBtn');
    submitBtn.innerHTML = 'Loading...';
    const StudentId = document.getElementById('studentId').value;
    const StudentName = document.getElementById('StudentName').value;
    const Batch = document.getElementById('Batch').value;
    const StudentContact = document.getElementById('StudentContact').value;
    const Form = document.getElementById('Studentform');
    
    if(!StudentId || !StudentName || !Batch || !StudentContact){
        custom_alert("warning", "Please Fill All the Fields...");
    }

    else{
        let data = {
            id: StudentId,
            name: StudentName,
            contact: StudentContact,
            batch: Batch,
            mentorAssigned: false,
            mentorName: "Not Assigned"
        };
        await fetch("https://mentorassignment.herokuapp.com/student", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        Form.reset()
        custom_alert("success", "Student Added Successfully...");
    };
    submitBtn.innerHTML="Create"
}



