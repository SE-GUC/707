const funcs = require("./fnAdmins");
let myAdmin = {
    name: "shahd408",
    email: "shahd408@guc.edu.eg",
    password: "123"
   
  };
  let myAdmin2 = {
    name: "shahd409",
    email: "shahd409@guc.edu.eg",
    password: "123"
   
  };


let myAdmin3 = {
  name: "shahd41",
  email: "shahd410@guc.edu.eg",
  password: "123"
 
};

let updateAdmin = {
  name: "shahd410",
  password: "1234"
 
};
let myAdmin4 = {
    name: "shahd411",
    email: "shahd411@guc.edu.eg",
    password: "1234"
};  
let conversation={
    email:"shahd409@guc.edu.eg"
  };

  let myadmin2 = {
    name: "Shahd Osman",
    email: "Shahd.osman2@gmail.com",
    password: "707",
    
  };
  let conversation2={
    email:"shahd408@guc.edu.eg"
  };
  let mycons ={
    name: "kariman",
    email: "karimanhossam@gmail.com",
    password: "rtfhg",
    address: "ghd",
    occupation: "hji",
    phoneNumber: 1111099652
  
    
  };
  let myCandidate ={
    name: "farah",
    email:"farah@yahoo.com",
    password:"123"
    };
    
    
    let partner1 = {
      name: "islam nasr",
      email: "islam.nasr4@gmail.com",
      password: "hello"
     
    };


//testing posting an admin
test(`post  admins `, async () => {
    expect.assertions(6);
    const admin = await funcs.postAdmin(myAdmin);
    expect(admin.data.data._v).not.toEqual(null);
    expect(admin.data.data._id).not.toEqual(null);
    expect(admin.data.data.conversations).toEqual([]);
    expect(admin.data.data.name).toEqual(myAdmin.name);
    expect(admin.data.data.email).toEqual(myAdmin.email);
    expect(admin.data.data.password).not.toEqual(myAdmin.password);
  });
   //test getting admin by id
   test(`admin equal myAdmin`, async () => {
    expect.assertions(5);
    const adminToken=await funcs.login(myAdmin)
    const admin = await funcs.getAdmin(adminToken.data.data);
    expect(postedadmin.data.data._id).toEqual(admin.data.data._id);
    expect(postedadmin.data.data.conversations).toEqual(admin.data.data.conversations);
    expect(postedadmin.data.data.name).toEqual(admin.data.data.name);
    expect(postedadmin.data.data.email).toEqual(admin.data.data.email);
    expect(postedadmin.data.data.password).toEqual(admin.data.data.password);
  });

//testing update admin profile by id
test(`update admin profile `, async () => {
  expect.assertions(4);
  const postedadmin2= await funcs.postAdmin(myAdmin3);
  const adminToken=await funcs.login(myAdmin)
  const admin = await funcs.putAdmin(updateAdmin,adminToken.data.data);
  expect(admin.data.data._id).toEqual(postedadmin2.data.data._id);
  expect(admin.data.data.conversations).toEqual([]);
  expect(admin.data.data.name).toEqual(updateAdmin.name);
  expect(admin.data.data.email).toEqual(myAdmin3.email);
  expect(bcrypt.compareSync(admin.data.data.password,updateAdmin.password));
});

// testing getting all admins
test(`get all admins`, async () => {
  expect.assertions(1);
  const adminToken=await funcs.login(myAdmin)
  const admins = await funcs.getAdmins(adminToken.data.data);
  expect(admins.data.data).not.toEqual(null); 

});
//testing deleting admin profile by id
test(`delete admin profile by id`, async () => {
  expect.assertions(5);
  const postedadmin3= await funcs.postAdmin(myAdmin4);
  const adminToken= await funcs.login(postedAdmin3)
  const admins = await funcs.getAdmins();
  const deletedadmin= await funcs.deleteAdmin(adminToken.data.data);
  expect(deletedadmin.data.data.conversations).toEqual([]);
  expect(deletedadmin.data.data.name).toEqual(postedadmin3.data.data.name);
  expect(deletedadmin.data.data.email).toEqual(postedadmin3.data.data.email);
  expect(deletedadmin.data.data.password).toEqual(postedadmin3.data.data.password);
  const admins2 =await funcs.getAdmins();
  expect(admins2.data.data.length).toEqual(admins.data.data.length-1);
});

test(`post consultanies`, async () => {
  const adminToken= await funcs.login(myAdmin)
  const cons = await funcs.postConsultancy(mycons,adminToken.data.data);
      expect.assertions(10);
      expect(cons.data.data.__v).not.toEqual(null);
      expect(cons.data.data.__id).not.toEqual(null);
      expect(cons.data.data.conversations).toEqual([]);
      expect(cons.data.data.projects).toEqual([]);
      expect(cons.data.data.name).toEqual(mycons.name);
      expect(cons.data.data.email).toEqual(mycons.email);
      expect(cons.data.data.password).not.toEqual(mycons.password);
      expect(cons.data.data.address).toEqual(mycons.address);
      expect(cons.data.data.occupation).toEqual(mycons.occupation);
      expect(cons.data.data.phoneNumber).toEqual(mycons.phoneNumber);
  });
//testing post partner
test(`create partner profile `, async () => {
  expect.assertions(6);
  const createdpartner = await funcs.createPartner(partner1);

  expect(createdpartner.data.data.name).toEqual(partner1.name);
  expect(createdpartner.data.data.email).toEqual(partner1.email);
  expect(bcrypt.compareSync(partner1.password,createdpartner.data.data.password));
  expect(createdpartner.data.data._v).not.toEqual(null);
  expect(createdpartner.data.data._id).not.toEqual(null);
  expect(createdpartner.data.data.conversations).toEqual([]);
  expect(createdpartner.data.data.projects).toEqual([]);
});
//test post candidate
  test('post candidates',async() => {
    const adminToken= await funcs.login(myAdmin)
    const candidate = await funcs.postCandidate(myCandidate,adminToken.data.data);
    console.log(candidate.data.data.name);
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
// testing getting all candidates
test(`get all candidates`, async () => {
  expect.assertions(1);
  const adminToken= await funcs.login(myAdmin)
  const candidates = await funcs.getCandidates(adminToken.data.data);
  expect(candidates.data.data).not.toEqual(null);
});
 //testing getting all consultancies
test(`get all consultancies`, async () => {
  expect.assertions(1);
  const adminToken= await funcs.login(myAdmin)
  const consultancies = await funcs.getConsultancies(adminToken.data.data);
  expect(consultancies.data.data).not.toEqual(null);});

  //testing getting all partners
 test(`get all partners`, async () => {
    expect.assertions(1);
    const adminToken= await funcs.login(myAdmin)
    const partners = await funcs.getPartners(adminToken.data.data);
    expect(partners.data.data).not.toEqual(null);
});
  
//testing getting all certificates
test(`get all certificates`, async () => {
    expect.assertions(1);
    const adminToken= await funcs.login(myAdmin)
    const certificates = await funcs.getCertificates();
    expect(certificates.data.data).not.toEqual(null);

  });

  //testing getting all projects
test(`get all projects`, async () => {
    expect.assertions(1);
    const adminToken= await funcs.login(myAdmin)
    const projects = await funcs.getProjects(adminToken.data.data);
    expect(projects.data.data).not.toEqual(null);  });

  //testing getting all emails
  test(`get all emails`, async () => {
    expect.assertions(1);
    const adminToken= await funcs.login(myAdmin)
    const emails = await funcs.getEmails(adminToken.data.data);
    expect(emails.data.data.length).toBe(9);
  });
  let myAdmin5 = {
    name: "shahd412",
    email: "shahd412@guc.edu.eg",
    password: "1234"
   
  };
  //testing searching admins by name
  test(`search admin by name`, async () => {
    expect.assertions(5);
    const postedadmin4= await funcs.postAdmin(myAdmin5);
    const adminToken= await funcs.login(postedAdmin4)
    const response = await funcs.getAdminbyname(myAdmin5.name,adminToken.data.data);
    expect(response.data.data[0]._id).toContain(postedadmin4.data.data._id);
    expect(response.data.data[0].conversations).toEqual(postedadmin4.data.data.conversations);
    expect(response.data.data[0].name).toContain(postedadmin4.data.data.name);
    expect(response.data.data[0].email).toEqual(postedadmin4.data.data.email);
    expect(response.data.data[0].password).toEqual(postedadmin4.data.data.password);
  });
  let myCandidate2 ={
    name: "manal",
    email:"manal@yahoo.com",
    password:"123"
    };
  //testing searching candidates by name
  test(`search candidate by name`, async () => {
    expect.assertions(14);
    const postedcandidate= await funcs.postCandidate(myCandidate2);
    const adminToken= await funcs.login(myAdmin)
    const response = await funcs. getCandidatebyname(myCandidate2.name,adminToken.data.data);
    expect(response.data.data[0]._id).toContain(postedcandidate.data.data._id);
    expect(response.data.data[0].conversations).toEqual(postedcandidate.data.data.conversations);
    expect(response.data.data[0].name).toContain(postedcandidate.data.data.name);
    expect(response.data.data[0].email).toEqual(postedcandidate.data.data.email);
    expect(response.data.data[0].password).toEqual(postedcandidate.data.data.password);
    expect(response.data.data[0].languages).toEqual([]);
    expect(response.data.data[0].setOfSkills).toEqual([]);
    expect(response.data.data[0].interests).toEqual([]);
    expect(response.data.data[0].certificates).toEqual([]);
    expect(response.data.data[0].masterClasses).toEqual([]);
    expect(response.data.data[0].appliedProjects).toEqual([]);
    expect(response.data.data[0].approvedProjects).toEqual([]);
    expect(response.data.data[0].appliedCertificates).toEqual([]);
    expect(response.data.data[0].approvedCertificates).toEqual([]);  
  });
  let mycons2 ={
    name: "mariam",
    email: "mariam@gmail.com",
    password: "rtfhg",
    address: "ghd",
    occupation: "hji",
    phoneNumber: 1111097858
  };
  //testing searching consultancies by name
  test(`search consultancy by name`, async () => {
    expect.assertions(5);
    const postedconsultancy= await funcs.postConsultancy(mycons2);
    const adminToken= await funcs.login(myAdmin)
    const response = await funcs.getConsultanciesbyname(mycons2.name,adminToken.data.data);
    expect(response.data.data[0]._id).toContain(postedconsultancy.data.data._id);
    expect(response.data.data[0].conversations).toEqual(postedconsultancy.data.data.conversations);
    expect(response.data.data[0].name).toContain(postedconsultancy.data.data.name);
    expect(response.data.data[0].email).toEqual(postedconsultancy.data.data.email);
    expect(response.data.data[0].password).toEqual(postedconsultancy.data.data.password);
  });
  let partner2 = {
    name: "ahmed",
    email: "ahmed@gmail.com",
    password: "hello"
   
  };
  //testing searching partners by name
  test(`search partners by name`, async () => {
    expect.assertions(5);
    const postedpartner= await funcs.createPartner(partner2);
    const adminToken= await funcs.login(myAdmin)
    const response = await funcs.getPartnersbyname(partner2.name,adminToken.data.data);
    expect(response.data.data[0]._id).toContain(postedpartner.data.data._id);
    expect(response.data.data[0].conversations).toEqual(postedpartner.data.data.conversations);
    expect(response.data.data[0].name).toContain(postedpartner.data.data.name);
    expect(response.data.data[0].email).toEqual(postedpartner.data.data.email);
    expect(response.data.data[0].password).toEqual(postedpartner.data.data.password);
  });
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
    let certificate2 ={
      name: "se3",
      description: "balabezo",
      category: "cs",
      available: true
     };
  //testing posting(creating) an certificate
  test(`post  certificate `, async () => {
    expect.assertions(5);
    const adminToken= await funcs.login(myAdmin)
    const certificate = await funcs.postCertificate(certificate1,adminToken.data.data);
    expect(certificate.data.data.description).toEqual(certificate1.description);
    expect(certificate.data.data._id).not.toEqual(null);
    expect(certificate.data.data.category).toEqual(certificate1.category);
    expect(certificate.data.data.name).toEqual(certificate1.name);
    expect(certificate.data.data.available).toEqual(certificate1.available);
  });
  
  let mycertificate = {
    name: "se4",
     description: "balabezo",
     category: "cs4",
     available: true
  };
  
  let updatecertificate = {
    description: "balabezooo",
     category: "cs5"
   
  };
  //testing update certificate by id
  test(`update certificate by id `, async () => {
    expect.assertions(5);
    const adminToken= await funcs.login(myAdmin)
    const postedcertificate2= await funcs.postCertificate(mycertificate);
    const certificate = await funcs.putCertificate(postedcertificate2.data.data._id,updatecertificate,adminToken.data.data);
    expect(certificate.data.data._id).toEqual(postedcertificate2.data.data._id);
    expect(certificate.data.data.name).toEqual(postedcertificate2.data.data.name);
    expect(certificate.data.data.available).toEqual(postedcertificate2.data.data.available);
    expect(certificate.data.data.description).toEqual(updatecertificate.description);
    expect(certificate.data.data.category).toEqual(updatecertificate.category);
    
  });
  let mycertificate2 = {
    name: "se5",
    description: "balabezo",
    category: "cs5",
    available: true
   
  };
  //testing deleting certificate by id
  test(`delete certificate by id`, async () => {
    expect.assertions(5);
    const postedcertificate3= await funcs.postCertificate(mycertificate2);
    const certificates  = await funcs.getCertificates();
    const deletedcertificate= await funcs.deleteCertificate(postedcertificate3.data.data._id);
    expect(deletedcertificate.data.data.category).toEqual(postedcertificate3.data.data.category);
    expect(deletedcertificate.data.data.name).toEqual(postedcertificate3.data.data.name);
    expect(deletedcertificate.data.data.available).toEqual(postedcertificate3.data.data.available);
    expect(deletedcertificate.data.data.description).toEqual(postedcertificate3.data.data.description);
    const certificates2 =await funcs.getAdmins();
    expect(certificates2.data.data.length).toEqual(certificates.data.data.length-1);
  });
  let mycertificate3 = {
    name: "se6",
    description: "balabezo",
    category: "cs6",
    available: true
   
  };
  //testing searching certificates by name
  test(`search certificates by name`, async () => {
    expect.assertions(5);
    const postedcertificate4= await funcs.postCertificate(mycertificate3);
    const response = await funcs.getCertificatesbyname(mycertificate3.name);
    expect(response.data.data[0]._id).toContain(postedcertificate4.data.data._id);
    expect(response.data.data[0].description).toEqual(postedcertificate4.data.data.description);
    expect(response.data.data[0].name).toContain(postedcertificate4.data.data.name);
    expect(response.data.data[0].category).toEqual(postedcertificate4.data.data.category);
    expect(response.data.data[0].available).toEqual(postedcertificate4.data.data.available);
  });
  let partner6 = {
    name: "fatema abdelaziz",
    email: "fatema.abdelaziz2@gmail.com",
    password: "fatemaabdelaziz"
   
  };
  let project ={
    description:"my project is awesome",
    requireConsultancy:true
  };
  
  //testing create project for partner
  test('creating project for partner', async()=>{
    expect.assertions(9);
    const createdpartner = await funcs.createPartner(partner6);  
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
  let partner8 = {
    name: "essso",
    email: "esso2@gmail.com",
    password: "ay7aga"
   
  };
  let project3 ={
    name:"my project",
    description:"my project sucks2",
    requireConsultancy:false
  };
    //get project by its id
    test('select project by id', async()=>{
      expect.assertions(9);
      const createdpartner= await funcs.createPartner(partner8);
      const createdproject= await funcs.createProject(createdpartner.data.data._id,project3);
      const selectedproject= await funcs.getProjectbyId(createdproject.data.data._id);
      expect(selectedproject.data.data._id).toEqual(createdproject.data.data._id);
      expect(selectedproject.data.data.description).toEqual(createdproject.data.data.description);
      expect(selectedproject.data.data.requireConsultancy).toEqual(createdproject.data.data.requireConsultancy);
      expect(selectedproject.data.data.approveAdmin).toEqual(createdproject.data.data.approveAdmin);
      expect(selectedproject.data.data.tasks).toEqual(createdproject.data.data.tasks);
      expect(selectedproject.data.data.lifecycle.description).toEqual(createdproject.data.data.lifecycle.description);
      expect(selectedproject.data.data.lifecycle.status).toEqual(createdproject.data.data.lifecycle.status);
      expect(selectedproject.data.data.lifecycle.percentage).toEqual(createdproject.data.data.lifecycle.percentage);
      expect(selectedproject.data.data.name).toEqual(createdproject.data.data.name);
    });
    let myproject4 = {
      name:"my project3",
      description:"my project sucks3",
      requireConsultancy:false
     
    };
    let partner9 = {
      name: "ghgh",
      email: "gigi@gmail.com",
      password: "ay7aga"
     
    };
    //testing searching projects by name
    test(`search projects by name`, async () => {
      expect.assertions(4);
      const createdpartner= await funcs.createPartner(partner9);
      const postedproject= await funcs.createProject(createdpartner.data.data._id,myproject4);
      const response = await funcs.getProjectsbyname(myproject4.name);
      expect(response.data.data[0]._id).toContain(postedproject.data.data._id);
      expect(response.data.data[0].description).toEqual(postedproject.data.data.description);
      expect(response.data.data[0].name).toContain(postedproject.data.data.name);
      expect(response.data.data[0].requireConsultancy).toEqual(postedproject.data.data.requireConsultancy);
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
 
//  testing sending  an email inside an exsiting conversation
test(`send an email inside an existing conversation `, async () => {
  const admin = await funcs.postAdmin(myadmin3);
  const admin2 = await funcs.postAdmin(myadmin4);
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
//testing searching emails by name
test(`search emails by name`, async () => {
  expect.assertions(1);
  const admin = await funcs.postAdmin(myadmin5);
  const admin2 = await funcs.postAdmin(myadmin6);
  let conversation4={
    email:admin2.data.data.email
  };
  const conn =await funcs.postConversation(conversation4,admin.data.data._id);
  let maill={
    email: conversation4.email,
    content:"hello",
    type:"Inquiry"
}
  const con = await funcs.postemailConversation(maill,admin.data.data._id);
  const response = await funcs.getEmailsbyname(maill.email);
  expect(response.data.data[0].email).toContain(maill.email);
});
let myproject5 = {
  name:"my projectaaa",
  description:"my project sucks3aaa",
  requireConsultancy:false
      
}

let updatedproject1 = {
  name:"lesa my projects",
  description:"lesa my project sucks2s",
  approveAdmin:true,
  lifecycle:["rty","Proceeding"]
}

let admin10 = {
  name: "shahd41222",
  email: "shahd41222@guc.edu.eg",
  password: "1222"
 
}


let partner40 ={
name: "adaaa",
email: "adaaa@gmail.com",
password: "adaaa"
}
//update a project by its id (admin)
test('update project by id', async()=>{
expect.assertions(9);
const createdadmin = await funcs.postAdmin(admin10);
const createdpartner= await funcs.createPartner(partner40);
const createdproject= await funcs.createProject(createdpartner.data.data._id,myproject5);
const updatedproject= await funcs.updateProjectbyId(createdproject.data.data._id,updatedproject1);
expect(updatedproject.data.data._id).toEqual(createdproject.data.data._id);
expect(updatedproject.data.data.description).toEqual(updateprojectdata.description);
expect(updatedproject.data.data.name).toEqual(updateprojectdata.name);
expect(updatedproject.data.data.requireConsultancy).toEqual(createdproject.data.data.requireConsultancy);
expect(updatedproject.data.data.approveAdmin).toEqual(updatedproject1.approveAdmin);
expect(updatedproject.data.data.tasks).toEqual(createdproject.data.data.tasks);
expect(updatedproject.data.data.lifecycle.description).toEqual(updatedproject1.lifecycle.description);
expect(updatedproject.data.data.lifecycle.status).toEqual(updatedproject1.lifecycle.status);
expect(updatedproject.data.data.lifecycle.percentage).toEqual(createdproject.data.data.lifecycle.percentage);
});



let admin100 = {
name: "shahd41222",
email: "shahd41222@guc.edu.eg",
password: "1222"

}

let deletedproject1 ={
name:"deleteeee",
description:"sucksssssssss"
}

let partner110 = {
name: "adaassa",
email: "adaasa@gmail.com",
password: "adaasa"
}

//delete project by id (admin)
test('delete project by id', async()=>{
expect.assertions(10);
const createdadmin = await funcs.postAdmin(admin100);
const createdpartner= await funcs.createPartner(partner110);
const createdproject= await funcs.createProject(createdpartner.data.data._id, deletedproject1);
var names= await funcs.getmyProjects(createdpartner.data.data._id);  
const del = await funcs.removeProjectbyId(createdproject.data.data._id);
var names2= await funcs.getmyProjects(createdpartner.data.data._id);    
expect(del.data.data._id).toEqual(createdproject.data.data._id);
expect(del.data.data.description).toEqual(createdproject.data.data.description);
expect(del.data.data.name).toEqual(createdproject.data.data.name);
expect(del.data.data.requireConsultancy).toEqual(createdproject.data.data.requireConsultancy);
expect(del.data.data.approveAdmin).toEqual(createdproject.data.data.approveAdmin);
expect(del.data.data.tasks).toEqual(createdproject.data.data.tasks);
expect(del.data.data.lifecycle.description).toEqual(createdproject.data.data.lifecycle.description);
expect(del.data.data.lifecycle.status).toEqual(createdproject.data.data.lifecycle.status);
expect(del.data.data.lifecycle.percentage).toEqual(createdproject.data.data.lifecycle.percentage);
expect(names.data.data.length-1).toEqual(names2.data.data.length);

});


