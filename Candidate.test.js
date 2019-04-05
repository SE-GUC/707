var bodyParser = require('body-parser');
const funcs = require("./fnCandidates");
const bcrypt=require("bcryptjs");

let myCandidate = {
  name :"farah",
  email:"faraah1@gmail.com",
  password:"yafarahyayasser"
};
  
  let myCandidate2 = {
    name :"farah",
    email:"farooh@gmail.com",
    password:"yafarahyayasser"
   
  }
//to post a candidate
test('post candidates',async() => {
    const candidate = await funcs.postCandidate(myCandidate);
    expect.assertions(15);

    expect(candidate.data.data.name).toEqual(myCandidate.name);
    expect(candidate.data.data.password).not.toEqual(myCandidate.password);
    expect(candidate.data.data.email).toEqual(myCandidate.email);

    expect(candidate.data.data._v).not.toEqual(null);
    expect(candidate.data.data._id).not.toEqual(null);

    expect(candidate.data.data.languages).toEqual([]);
    expect(candidate.data.data.setOfSkills).toEqual([]);
    expect(candidate.data.data.interests).toEqual([]);
    expect(candidate.data.data.certificates).toEqual([]);
    expect(candidate.data.data.masterClasses).toEqual([]);
    expect(candidate.data.data.conversations).toEqual([]);
    expect(candidate.data.data.appliedProjects).toEqual([]);
    expect(candidate.data.data.approvedProjects).toEqual([]);
    expect(candidate.data.data.appliedCertificates).toEqual([]);
    expect(candidate.data.data.approvedCertificates).toEqual([]);
});
//to get candidate

  test('get candidate', async () => {
   const postedCandidate= await funcs.postCandidate(myCandidate2);
   expect.assertions(14);
   const cand = await funcs.getCandidate(postedCandidate.data.data._id);

    expect(postedCandidate.data.data._id).toEqual(cand.data.data._id);
    expect(postedCandidate.data.data.name).toEqual(cand.data.data.name);
    expect(postedCandidate.data.data.password).toEqual(cand.data.data.password);
    expect(postedCandidate.data.data.email).toEqual(cand.data.data.email);

    expect(postedCandidate.data.data.languages).toEqual(cand.data.data.languages);
    expect(postedCandidate.data.data.setOfSkills).toEqual(cand.data.data.setOfSkills);
    expect(postedCandidate.data.data.interests).toEqual(cand.data.data.interests);
    expect(postedCandidate.data.data.certificates).toEqual(cand.data.data.certificates);
    expect(postedCandidate.data.data.masterClasses).toEqual(cand.data.data.masterClasses);
    expect(postedCandidate.data.data.conversations).toEqual(cand.data.data.conversations);
    expect(postedCandidate.data.data.appliedProjects).toEqual(cand.data.data.appliedProjects);
    expect(postedCandidate.data.data.approvedProjects).toEqual(cand.data.data.approvedProjects);
    expect(postedCandidate.data.data.appliedCertificates).toEqual(cand.data.data.appliedCertificates);
    expect(postedCandidate.data.data.approvedCertificates).toEqual(cand.data.data.approvedCertificates);


  });

let partnerxy = {
  name: "fatema abdelaziz",
  email: "fatema.abdelaziz1@gmail.com",
  password: "fatemaabdelaziz"
 
};
let partner7={
  name: "Youssef",
  email: "youssefyasser@gmail.com",
  password: "110"
 
}

let project ={
  description:"my project is awesome",
  requireConsultancy:true
}
let project1 ={
  description:"my project is amazing",
  requireConsultancy:true,
  approveAdmin:true
}
let project2 ={
  description:"my project is shit",
  requireConsultancy:true,
  approveAdmin:true
}
    let partner8={
      name: "Youssef",
      email: "youssefyasser2@gmail.com",
      password: "110"
     
    }


//Create a new conversation by stating receiver email
let myCandidate5 = {
  name: "Shahd Osman",
  email: "Shahd.osmann@gmail.com",
  password: "707",
  
};
let conversationy={
  email:"farooh@gmail.com"
};
let conversation2 ={
  email:"Shahd.osmann@gmail.com"
}


//Create a new conversation by stating receiver email
 test('post candidates conversation', async () => {
    expect.assertions(1);
  const candidate =  await funcs.postCandidate(myCandidate5);
     const cons = await funcs.postConversation(conversationy,candidate.data.data._id);
     expect(cons.data.msg).toEqual("New candidate conversation is created");
});

let myCandidate7 ={
  name :"farooha",
  email:"faroohaa@gmail.com",
  password:"zhe2tt" 
};
let certificate1 ={
  name: "se2",
  description: "balabezo",
  category: "cs",
  available: true,
  evaluationTest: "MCQ",
  evaluationContent: "lllala",
   totalScore: 100,
   passingScore:60,
   candidateScore: 70,
   passed: true
};

// posting(creating) a certificate
test('post certificate', async () => {
  expect.assertions(5);
  const certificate = await funcs.postCertificate(certificate1);
  expect(certificate.data.data.description).toEqual(certificate1.description);
  expect(certificate.data.data._id).not.toEqual(null);
  expect(certificate.data.data.category).toEqual(certificate1.category);
  expect(certificate.data.data.name).toEqual(certificate1.name);
  expect(certificate.data.data.available).toEqual(certificate1.available);
});
let postedAdmin4={
  name:"farah",
  email:"farr@gmail.com",
  password:"11"
};
let candidatex={
  name:"faraah",
  email:"farahhhh@gmail.com",
  password:"anabdee3"
};
let FirstCertificate ={
  name: "hh",
  description: "mm",
  category: "cs",
  available: true,
  evaluationTest: "MCQ",
  evaluationContent: "lllaala",
   totalScore: 100,
   passingScore:60,
   candidateScore: 70,
   passed: true
};
////apply for a certificate by its id
test('apply for certificate by ID',async()=>{
  const candidate =  await funcs.postCandidate(candidatex);
  const certificate = await funcs.postCertificate(FirstCertificate);
  const appliedcertificate= await funcs.applyforCertificatebyID(candidate.data.data._id,certificate.data._id);
  expect(appliedcertificate.data._id).toEqual(certificate.data._id); 
  expect(appliedcertificate.data.name).toEqual(certificate.data.name);
  expect(appliedcertificate.data.description).toEqual(certificate.data.description);
  expect(appliedcertificate.data.category).toEqual(certificate.data.category);
  expect(appliedcertificate.data.available).toEqual(certificate.data.available);
  expect(appliedcertificate.data.evaluationTest).toEqual(certificate.data.evaluationTest);
  expect(appliedcertificate.data.evaluationContent).toEqual(certificate.data.evaluationContent);
  expect(appliedcertificate.data.totalScore).toEqual(certificate.data.totalScore);
  expect(appliedcertificate.data.passingScore).toEqual(certificate.data.passingScore);
  expect(appliedcertificate.data.candidateScore).toEqual(certificate.data.candidateScore);
  expect(appliedcertificate.data.passed).toEqual(certificate.data.passed);
  
  







}
);


let SecondCertificate ={
  name: "aabc",
  description: "mm",
  category: "cs",
  available: true,
  evaluationTest: "MCQ",
  evaluationContent: "lllaala",
   totalScore: 100,
   passingScore:60,
   candidateScore: 70,
   passed: true
};

//search certificate by name
test('search certificate by name', async () => {
  expect.assertions(5);
  const certificate= await funcs.postCertificate(SecondCertificate);
  const response = await funcs.getCertificatebyname(certificate.data.data.name);
  expect(response.data.data[0]._id).toEqual(certificate.data.data._id);
  expect(response.data.data[0].name).toEqual(certificate.data.data.name);
  expect(response.data.data[0].available).toEqual(certificate.data.data.available);
  expect(response.data.data[0].description).toEqual(certificate.data.data.description);
  expect(response.data.data[0].category).toEqual(certificate.data.data.category);
});


let candidatab = {
    name: "Shahd Osman",
    email: "Shahd.osman31@gmail.com",
    password: "707"
    
  };
  let candidatecd = {
    name: "Shahd Osman",
    email: "Shahd.osman41@gmail.com",
    password: "707"
    
  };
  //View all projects only that i can apply
test('view all projects that i can apply', async()=>{
    
     const createdpartner= await funcs.createPartner(partner8);
   
     expect.assertions(2);
     const createdproject= await funcs.createProject(createdpartner.data.data._id,project1);
     const createdproject2= await funcs.createProject(createdpartner.data.data._id,project2);
     var names= await funcs.getProjects();
     expect(names[0]).toEqual(createdpartner.name);
     expect(names[1]).toEqual(createdpartner.name);
     
   });
//sending  an email inside an exsiting conversation
test('send an email', async () => {
  const admin = await funcs.postCandidate(candidatab);
  const admin2 = await funcs.postCandidate(candidatecd);
  let conversation3={
    email:admin2.data.data.email
  };
  const conn =await funcs.postConversation(conversation3,admin.data.data._id);
  let mail={
    email: conversation3.email,
    content:"hello",
    type:"Inquiry"
}
  const con = await funcs.postemailConversation(mail,admin.data.data._id);
      expect.assertions(1);
      expect(con.data.msg).toEqual("Candidate email is sent");

});
let myadmin5 = {
  name: "Shahd Osman",
  email: "Shahd.osman5555@gmail.com",
  password: "707"
  
};
let myadmin6 = {
  name: "Shahd Osman",
  email: "Shahd.osman6666@gmail.com",
  password: "707"
  
};

let myCandidate3 = {
  name: "shahd41",
  email: "shahd41000@guc.edu.eg",
  password: "123"
 
};

let updateCandidate = {
  name: "shahd410",
  password: "1234"
 
};

//update candidate profile by id
test('update candidate profile', async () => {
  expect.assertions(4);
  const postedCandidate2= await funcs.postCandidate(myCandidate3);
  const candidate = await funcs.putCandidate(postedCandidate2.data.data._id,updateCandidate);
  expect(candidate.data.data._id).toEqual(postedCandidate2.data.data._id);
  expect(candidate.data.data.conversations).toEqual([]);
  expect(candidate.data.data.name).toEqual(updateCandidate.name);
  expect(candidate.data.data.email).toEqual(myCandidate3.email);
  expect(bcrypt.compareSync(candidate.data.data.password,updateCandidate.password));
});

let myCandidate41 = {
  name: "shahd411",
  email: "shahd011@guc.edu.eg",
  password: "1234"

};



// deleting candidateprofile by id
test('delete candidate profile by id', async () => {
  expect.assertions(4);
  const postedCandidate= await funcs.postCandidate(myCandidate41);
  const deletedCandidate= await funcs.deleteCandidate(postedCandidate.data.data._id);
  expect(deletedCandidate.data.data.conversations).toEqual([]);
  expect(deletedCandidate.data.data.name).toEqual(postedCandidate.data.data.name);
  expect(deletedCandidate.data.data.email).toEqual(postedCandidate.data.data.email);
  expect(deletedCandidate.data.data.password).toEqual(postedCandidate.data.data.password);
});


let myCertificate2={
    name: "hph",
    description: "mm",
    category: "cs",
    available: true,
    evaluationTest: "MCQ",
    evaluationContent: "lllaala",
     totalScore: 100,
     passingScore:60,
     candidateScore: 70,
     passed: true
  };


//get certificate by its id
test('get certificate by id', async()=>{
  expect.assertions(11);

  const createdCertificate= await funcs.postCertificate(myCertificate2);
  const selectedCertificate= await funcs.getCertificatebyId(createdCertificate.data.data._id);

  expect(selectedCertificate.data.data._id).toEqual(createdCertificate.data.data._id);
  expect(selectedCertificate.data.data.name).toEqual(createdCertificate.data.data.name);
  expect(selectedCertificate.data.data.description).toEqual(createdCertificate.data.data.description);
  expect(selectedCertificate.data.data.category).toEqual(createdCertificate.data.data.category);
  expect(selectedCertificate.data.data.available).toEqual(createdCertificate.data.data.available);
  expect(selectedCertificate.data.data.evaluationType).toEqual(createdCertificate.data.data.evaluationType);
  expect(selectedCertificate.data.data.evaluationContent).toEqual(createdCertificate.data.data.evaluationContent);
  expect(selectedCertificate.data.data.totalScore).toEqual(createdCertificate.data.data.totalScore);
  expect(selectedCertificate.data.data.passingScore).toEqual(createdCertificate.data.data.passingScore);
  expect(selectedCertificate.data.data.candidateScore).toEqual(createdCertificate.data.data.candidateScore);
  expect(selectedCertificate.data.data.passed).toEqual(createdCertificate.data.data.passed);

});

let myCandidate50 = {
  name: "farahhhh",
  email: "faraahhyasser@guc.edu.eg",
  password: "yafarahyayasser"

};

let myCertificate3={
  name: "ac",
  description: "mm",
  category: "cs",
  available: true,
  evaluationTest: "MCQ",
  evaluationContent: "lllaala",
   totalScore: 100,
   passingScore:60,
   candidateScore: 70,
   passed: true
};
let myCertificate4={
  name: "abcd",
  description: "mm",
  category: "cs",
  available: true,
  evaluationTest: "MCQ",
  evaluationContent: "lllaala",
   totalScore: 100,
   passingScore:60,
   candidateScore: 70,
   passed: true
};

test('get certificates names', async()=>{
  expect.assertions(3);
  const createdCertificate= await funcs.postCertificate(myCertificate3);
  const createdCertificate2= await funcs.postCertificate(myCertificate4);
  var names= await funcs.getCertificates();
console.log(names.data.data[5]);

  expect(names.data.data[4]).toEqual(createdCertificate.data.data.name);
  expect(names.data.data[5]).toEqual(createdCertificate2.data.data.name);
  expect(names.data.data.length).toBe(6);
});

//View all projects' names i applied for
let partner11 = {
  name: "fatema abdelaziz",
  email: "fato@yahoo.com",
  password: "fatemaabdelaziz"
}
let project3={
    description:"my project is nnn",
    requireConsultancy:true,
    approveAdmin:true
  
}
let project4={
  description:"my project is aa",
  requireConsultancy:true,
  approveAdmin:true
}
//apply for a project by its id
let project6={
  description:"my project is aa",
  requireConsultancy:true
}
let candidate100={
  name:"ff",
  email:"f@yahoo.com",
  password:"n"
}
//apply for a project by its id
test('Apply for project by its id', async()=>{
expect.assertions(9);

const candidatee =  await funcs.postCandidate(candidate100);
const projecttt = await funcs.createProject(candidatee.data.data._id,project6);
const appliedProject= await funcs.applyforProjectbyID(candidatee.data.data._id,projecttt.data._id);

expect(appliedProject.data._id).toEqual(projecttt.data._id); 
expect(appliedProject.data.name).toEqual(projecttt.data.name);
expect(appliedProject.data.description).toEqual(projecttt.data.description);
expect(appliedProject.data.type).toEqual(projecttt.data.type);
expect(appliedProject.data.approveAdmin).toEqual(projecttt.data.approveAdmin);
expect(appliedProject.data.requireConsultancy).toEqual(projecttt.data.requireConsultancy);
expect(appliedProject.data.assigned).toEqual(projecttt.data.assigned);
expect(appliedProject.data.lifecycle).toEqual(projecttt.data.lifecycle);
expect(appliedProject.data.tasks).toEqual(projecttt.data.tasks);

});
let candidate101={
  name:"ff",
  email:"faa@yahoo.com",
  password:"n"
}
let project7={
  description:"my project is aa",
  requireConsultancy:true,
  assigned:false

}

//View all projects' names i applied for
let partner110 = {
  name: "fatema abdelaziz",
  email: "fato455@yahoo.com",
  password: "fatemaabdelaziz"
}
let project50={
    description:"my project is nnn",
    requireConsultancy:true,
    approveAdmin:true
  
}

let candidatexyz={
 name:"ll",
 email:"ppww@yahoo.com",
 password:"11"
}
 //view all projects' names i applied for
test('view all projects that i applied for', async()=>{
  expect.assertions(2);
  const candi = await funcs.postCandidate(candidatexyz);
  const createdpartner= await funcs.createPartner(partner110);
  const createdproject= await funcs.createProject(createdpartner.data.data._id,project50);
  const proj = await funcs.applyforProjectbyID(candi.data.data._id,createdproject.data.data._id);
  var names= await funcs.viewAllProjectsiAppliedFor(candi.data.data._id);

  expect(names[0]).toEqual(createdproject.name);
  expect(names.data.data.length).toBe(1);
});
let project51={
  description:"my project is aqqqa",
  requireConsultancy:true,
  assigned:true
}
let partner123 = {
  name: "fatema abdelaziz",
  email: "fatlll@yahoo.com",
  password: "fatemaabdelaziz"
}
let candxx={
  name:"ll",
  email:"Pp11a@gmail.com",
  password: "kkkk"
}
//view all projects that i'm assigned to
test('view all projects that im assigned to', async()=>{
  expect.assertions();
  const candi = await funcs.postCandidate(candxx);
  const createdpartner= await funcs.createPartner(partner123);
  const createdproject= await funcs.createProject(createdpartner.data.data._id,project51);





});

let mycanddd2 = {
  name: "Shahd Osman",
  email: "Shahd.osman2222@gmail.com",
  password: "707",
  
};
let conversation10={
  email:"fatlll@yahoo.com"
};
//get candidate conversation
test('get candidate conversation', async () => {
      const candi = await funcs.postCandidate(mycanddd2);
      const con =await funcs.postConversation(conversation10,candi.data.data._id);
      const cons = await funcs.getConversation(candi.data.data._id,conversation10.email);
        expect.assertions(1);
        console.log(cons);
      expect(cons.data.data.receiverEmail).toEqual(conversation10.email);


});

//delete conversation
test('delete candidate conversation', async () => {
let cand13={
name:"cann",
email:"candrakam13@gmail.com", 
password:"password13"
}
const candidate1 =  await funcs.postCandidate(cand13);

  let candi14={
name:"alls",
email:"candiirakam14@gmail.com",
password:"password14"
}
const candidate2 =  await funcs.postCandidate(candi14);

let conversationx={
  email: "candiirakam14@gmail.com"
}
const conv = await funcs.postConversation(conversationx,candidate1.data.data._id);
const conv1 = await funcs.deleteConversation(candidate1.data.data._id,conversationx.email);
  expect.assertions(1);
  expect(conv1.data.msg).toEqual("Candidate conversation is deleted");
});

 
