async function addMentor() {
    const submitBtn = document.getElementById('MentorSubmitBtn');
    submitBtn.innerHTML = 'Loading...'
    const MentorId = document.getElementById('MentorId').value;
    const MentorName = document.getElementById('MentorName').value;
    const MentorContact = document.getElementById('MentorContact').value;
    const Form = document.getElementById('mentorForm')

    if(!MentorContact || !MentorName || !MentorId){
        custom_alert("warning", "Please Fill All the Fields...");
    }

    else{
        let data = {
            id: MentorId,
            name: MentorName,
            contact: MentorContact,
            students: []
        };
        await fetch("https://mentorassignment.herokuapp.com/mentor", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        custom_alert("success", "Mentor Added Successfully...");
        Form.reset();
    }  
    submitBtn.innerHTML = 'Create' 
}