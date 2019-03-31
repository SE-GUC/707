var bodyParser = require('body-parser');
const funcs = require("./fnCandidate");
const bcrypt=require("bcryptjs");

let myCandidate = {
  name :"farah",
  email:"faraah1@gmail.com",
  password:"yafarahyayasser"
};

  
  let postedCandidate={
    name:"farooha",
    password:"faraah7"
  }
  
  let myCandidate2 = {
    name :"farah",
    email:"faraah@gmail.com",
    password:"yafarahyayasser"
   
  }

//to get candidate
  test('get candidate', async () => {
    const postedCandidate= await funcs.postCandidate(myCandidate2);
 let x ={
   email:"ayahgaa@yahoo.com",
   password:"11"
 }
token = await funcs.login(x);
   expect.assertions(14);
   const cand = await funcs.getCandidate(token.data.data);

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
  //search projects only that i can apply by name not exact value (search engine)
  // test('search projects', async () => {
  //   expect.assertions();
  //   const searchProj= await funcs.postProject(myCandidate2);
  //   const cand = await funcs.getProject(SearchProj.data.data.name);
 
  // });

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
let partner6 = {
  name: "fatema abdelaziz",
  email: "fatema.abdelaziz@gmail.com",
  password: "fatemaabdelaziz"
 
};
//testing register partner
test(`create partner profile `, async () => {
  expect.assertions(6);
 const createdpartner = await funcs.createPartner(partner6);

  expect(createdpartner.data.data.name).toEqual(partner6.name);
  expect(createdpartner.data.data.email).toEqual(partner6.email);
  expect(bcrypt.compareSync(partner6.password,createdpartner.data.data.password));
  expect(createdpartner.data.data._v).not.toEqual(null);
  expect(createdpartner.data.data._id).not.toEqual(null);
  expect(createdpartner.data.data.conversations).toEqual([]);
  expect(createdpartner.data.data.projects).toEqual([]);
});
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
  //testing create project for partner
  test('creating project for partner', async()=>{
    expect.assertions(9);
    const createdpartner = await funcs.createPartner(partner7);  
    const createdproject=await funcs.createProject(createdpartner.data.data._id,project);
    expect(createdproject.data.data._id).not.toEqual(null);
    expect(createdproject.data.data.description).toEqual(project.description);
    expect(createdproject.data.data.requireConsultancy).toEqual(project.requireConsultancy);
    expect(createdproject.data.data.approveAdmin).toEqual(false);
    expect(createdproject.data.data.tasks).toEqual([]);
    expect(createdproject.data.data.__v).not.toEqual(null);
    expect(createdproject.data.data.lifecycle.description).toEqual([]);
    expect(createdproject.data.data.lifecycle.status).toEqual("Proceeding");
    expect(createdproject.data.data.lifecycle.percentage).toEqual([]);
    
    });
    let partner8={
      name: "Youssef",
      email: "youssefyasser2@gmail.com",
      password: "110"
     
    }
//View all projects only that i can apply
test('view all projects that i can apply', async()=>{
 
  const createdpartner= await funcs.createPartner(partner8);
  let x= {
    email:"hh@gmail.com",
    password:"yy"
  }
  token2= await funcs.login(x);

  expect.assertions(3);
  const createdproject= await funcs.createProject(token2.data.data,project1);
  const createdproject2= await funcs.createProject(token2.data.data,project2);
  var names= await funcs.getProjects(token2.data.data._id);
  expect(names[0]).toEqual(token2.name);
  expect(names[1]).toEqual(token2.name);
  expect(names.data.data.length).toBe(2);
});

//Create a new conversation by stating receiver email
let myCandidate5 = {
  name: "Shahd Osman",
  email: "Shahd.osmann@gmail.com",
  password: "707",
  
};
let conversation={
  email:"faraah@gmail.com"
};
let conversation2 ={
  email:"Shahd.osmann@gmail.com"
}
//Create a new conversation by stating receiver email
 test('post candidates conversation', async () => {
  const candidate =  await funcs.postCandidate(myCandidate5);
  let x={
    email:"hhhhh@gmail.com",
    password:"kk"
  }
  token= await funcs.login(x);
     expect.assertions(1);
     
     const cons = await funcs.postConversation(conversation,token.data.data);
     let x2 = {
       email: "kk@gmail.com",
       password:"0"
     }
     token2 = await funcs.login(x2);
     expect(token2.data.msg).toEqual("New candidate conversation is created");
});
// let myCandidate6 ={
//   name :"farooha",
//   email:"farooha70@gmail.com",
//   password:"zhe2tt" 
// };

// //Delete an existing conversation by stating receiver email
// test('delete an existing conversation', async() =>{
//   expect.assertions(5);
//   const postedConversation= await funcs.postConversation(myCandidate6);
//   const conversations = await funcs.getConversations();
//   const deletedConversation= await funcs.deleteConversation(postedConversation.data.data._id);
//   expect(deletedConversation.data.data.conversations).toEqual([]);
//   expect(deletedConversation.data.data.name).toEqual(postedConversation.data.data.name);
//   expect(deletedConversation.data.data.email).toEqual(postedConversation.data.data.email);
//   expect(deletedConversation.data.data.password).toEqual(postedConversation.data.data.password);
//   const conversations2 =await funcs.getConversations();
//   expect(conversations2.data.data.length).toEqual(conversations.data.data.length-1);

// });

let myCandidate7 ={
  name :"farooha",
  email:"faroohaa@gmail.com",
  password:"zhe2tt" 
};


 //get ALL candidates
 test('get all candidates', async () => {
  expect.assertions(1);
  const candidates = await funcs. getCandidates();
  expect(candidates.data.data.length).toBe(3); 
});

// // Get ALL my existing conversations
// test('get all conversations', async() =>{
//   expect.assertions(1);
//   const conversations = await funcs.getConversations();
//   expect(conversations.data.data.length).toBe(1); 
// });
// let myCandidateforconv={
// name:"ff",
// email:"hi@gmail.com",
// password:"77"
// }

// // Get conversation using receiver email
// test('get conversation by stating receiver email', async() =>{
//   expect.assertions(4);
//   const candidate = await funcs.postCandidate(myCandidateforconv);
//   const conversation= await funcs.postConversation(conversation2,candidate.data.data._id);
//   const conv = await funcs.getConversation(candidate.data.data._id,conversation.data.msg.email);
//   expect(conversation.data.data._id).toEqual(conv.data.data._id);
//   expect(conversation.data.data.sentEmails).toEqual(conv.data.data.sentEmails);
//   expect(conversation.data.data.receivedEmails).toEqual(conv.data.data.receivedEmails);
//   expect(conversation.data.data.receiverEmail).toEqual(conv.data.data.receiverEmail);

// });

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
  expect(certificate.data.msg.description).toEqual(certificate1.description);
  expect(certificate.data.msg._id).not.toEqual(null);
  expect(certificate.data.msg.category).toEqual(certificate1.category);
  expect(certificate.data.msg.name).toEqual(certificate1.name);
  expect(certificate.data.msg.available).toEqual(certificate1.available);
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
  console.log("name of za certificaaate:"+certificate.data.msg.name);
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
  // expect(appliedcertificate).toEqual(certificate);
  







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
  console.log(certificate.data.msg.name);
  const response = await funcs.getCertificatebyname(certificate.data.msg.name);
 console.log(response.data);
 console.log(response.data.data[0]);
  expect(response.data.data[0]._id).toEqual(certificate.data.msg._id);
  expect(response.data.data[0].name).toEqual(certificate.data.msg.name);
  expect(response.data.data[0].available).toEqual(certificate.data.msg.available);
  expect(response.data.data[0].description).toEqual(certificate.data.msg.description);
  expect(response.data.data[0].category).toEqual(certificate.data.msg.category);
});


let myadmin3 = {
    name: "Shahd Osman",
    email: "Shahd.osman3@gmail.com",
    password: "707"
    
  };
  let myadmin4 = {
    name: "Shahd Osman",
    email: "Shahd.osman4@gmail.com",
    password: "707"
    
  };
//sending  an email inside an exsiting conversation
test('send an email', async () => {
  const admin = await funcs.postCandidate(myadmin3);
  const admin2 = await funcs.postCandidate(myadmin4);
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
      console.log(con.data.msg);
      expect(con.data.msg).toEqual("Admin email is sent");

});
let myadmin5 = {
  name: "Shahd Osman",
  email: "Shahd.osman5@gmail.com",
  password: "707"
  
};
let myadmin6 = {
  name: "Shahd Osman",
  email: "Shahd.osman6@gmail.com",
  password: "707"
  
};

let myCandidate3 = {
  name: "shahd41",
  email: "shahd4100@guc.edu.eg",
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

let myCandidate4 = {
  name: "shahd411",
  email: "shahd4110@guc.edu.eg",
  password: "1234"

};

// deleting candidateprofile by id
test('delete candidate profile by id', async () => {
  expect.assertions(5);
  const postedCandidate= await funcs.postCandidate(myCandidate4);
  const candidates = await funcs.getCandidates();
  const deletedCandidate= await funcs.deleteCandidate(postedCandidate.data.data._id);
  expect(deletedCandidate.data.data.conversations).toEqual([]);
  expect(deletedCandidate.data.data.name).toEqual(postedCandidate.data.data.name);
  expect(deletedCandidate.data.data.email).toEqual(postedCandidate.data.data.email);
  expect(deletedCandidate.data.data.password).toEqual(postedCandidate.data.data.password);
  const candidates2 =await funcs.getCandidates();
  expect(candidates2.data.data.length).toEqual(candidates.data.data.length-1);
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
  const selectedCertificate= await funcs.getCertificatebyId(createdCertificate.data.msg._id);

  expect(selectedCertificate.data.data._id).toEqual(createdCertificate.data.msg._id);
  expect(selectedCertificate.data.data.name).toEqual(createdCertificate.data.msg.name);
  expect(selectedCertificate.data.data.description).toEqual(createdCertificate.data.msg.description);
  expect(selectedCertificate.data.data.category).toEqual(createdCertificate.data.msg.category);
  expect(selectedCertificate.data.data.available).toEqual(createdCertificate.data.msg.available);
  expect(selectedCertificate.data.data.evaluationType).toEqual(createdCertificate.data.msg.evaluationType);
  expect(selectedCertificate.data.data.evaluationContent).toEqual(createdCertificate.data.msg.evaluationContent);
  expect(selectedCertificate.data.data.totalScore).toEqual(createdCertificate.data.msg.totalScore);
  expect(selectedCertificate.data.data.passingScore).toEqual(createdCertificate.data.msg.passingScore);
  expect(selectedCertificate.data.data.candidateScore).toEqual(createdCertificate.data.msg.candidateScore);
  expect(selectedCertificate.data.data.passed).toEqual(createdCertificate.data.msg.passed);

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
  // const candidate = await funcs.postCandidate(myCandidate50);
  const createdCertificate= await funcs.postCertificate(myCertificate3);
  const createdCertificate2= await funcs.postCertificate(myCertificate4);



  var names= await funcs.getCertificates();


  expect(names.data.data[4]).toEqual(createdCertificate.data.msg.name);
  expect(names.data.data[5]).toEqual(createdCertificate2.data.msg.name);
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
 //view all projects' names i applied for
// test('view all projects that i applied for', async()=>{
//   expect.assertions(3);
//   const createdpartner= await funcs.createPartner(partner11);
//   const createdproject= await funcs.createProject(createdpartner.data.data._id,project3);
//   const createdproject2= await funcs.createProject(createdpartner.data.data._id,project4);
//   var names= await funcs.viewAllProjectsiAppliedFor(createdpartner.data.data._id);
//   expect(names[0]).toEqual(createdproject.name);
//   expect(names[1]).toEqual(createdproject2.name);
//   expect(names.data.data.length).toBe(2);
// });


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
//disapply a project by its id if i am not assigned to
// test('Disapply for a project', async()=>{
//   expect.assertions(9);
  
//   const candidatee =  await funcs.postCandidate(candidate101);
//   const projecttt = await funcs.createProject(candidatee.data.data._id,project7);
//   const appliedProject= await funcs.applyforProjectbyID(candidatee.data.data._id,projecttt.data._id);
  
//   expect(appliedProject.data._id).toEqual(projecttt.data._id); 
//   expect(appliedProject.data.name).toEqual(projecttt.data.name);
//   expect(appliedProject.data.description).toEqual(projecttt.data.description);
//   expect(appliedProject.data.type).toEqual(projecttt.data.type);
//   expect(appliedProject.data.approveAdmin).toEqual(projecttt.data.approveAdmin);
//   expect(appliedProject.data.requireConsultancy).toEqual(projecttt.data.requireConsultancy);
//   expect(appliedProject.data.assigned).toEqual(projecttt.data.assigned);
//   expect(appliedProject.data.lifecycle).toEqual(projecttt.data.lifecycle);
//   expect(appliedProject.data.tasks).toEqual(projecttt.data.tasks);
// });