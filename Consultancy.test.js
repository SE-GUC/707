const funcs = require("./fnConsultancy");

let myAdmin = {
    email: "kariman-hossam@hotmail.com",
    password: "anakarimanhossam"
   
  };

  let myPartner = {
    email:"shahd-wael@hotmail.com",
    password:"anashahdwael"
   
  };

  let myConsultancy = {
    email:"omar-saad@hotmail.com",
    password:"anaomarsaad"
   
  };
  let myCandidate = {
    email:"hana-kamal@hotmail.com",
    password:"anahanakamal"
   
  };

//Saad (Consultancy)



//consultancyToken = await funcs.login(myConsultancy);






let mycons = {
  name: "Omar Saad",
  email: "omar.aborabya@gmail.com",
  password: "IamOmar",
  address:"October City",
  occupation: "dsdsdsdsdsdsdsd"
};


//  //Done
test(`post consultanies`, async () => {
  // console.log("hereeee");
  const cons = await funcs.postConsultancy(mycons);
  // console.log("hi from ");
  //  funcs.postConsultancy(mycons).then(response => {
  //     const cons = response;
  // console.log("hereeee");
      expect.assertions(10);
      // console.log("hereeee");
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
      // console.log("hereeee");
  
  });
  
 
let mycons4 = {
  name: "Omar Saad",
  email: "omar.abssojhgkssasxbxcafsdsfahjgjdsssiucdrayssa@gmail.com",
  password: "IamOmar",
  address:"October City",
  occupation: "dsdsdsdsdsdsdsd"
};
//Done
test(`get consultany by id`, async () => {

  const cons = await funcs.postConsultancy(mycons4);
  let x = {
    email:cons.data.data.email,
    password:mycons4.password
  }
  consultancyToken = await funcs.login(x);
     const conss = await funcs.getConsultancy(consultancyToken.data.data);
     expect.assertions(9);
     expect(cons.data.data._id).toEqual(conss.data.data._id);
     expect(cons.data.data.conversations).toEqual(conss.data.data.conversations);
     expect(cons.data.data.projects).toEqual(conss.data.data.projects);
     expect(cons.data.data.name).toEqual(conss.data.data.name);
     expect(cons.data.data.email).toEqual(conss.data.data.email);
     expect(cons.data.data.password).toEqual(conss.data.data.password);
     expect(cons.data.data.address).toEqual(conss.data.data.address);
     expect(cons.data.data.occupation).toEqual(conss.data.data.occupation);
     expect(cons.data.data.phoneNumber).toEqual(conss.data.data.phoneNumber);
});



let mycons2 = {
  name: "Saad",
  email: "omar.saaaaaaaaqaaaad@gmail.com",
  password: "Saad",
  address:"Nasr city",
  occupation: "assasasasasassas"
}

let updatecons = {
  name: "Zamalek",
  address:"tagmo3"
 
};

//     Done
test(`update Consultancy`, async () => {
  const postedcons= await funcs.postConsultancy(mycons2);
  let x = {
    email:postedcons.data.data.email,
    password:mycons2.password
  }
  consultancyToken = await funcs.login(x);
  const cons = await funcs.putConsultancy(updatecons,consultancyToken.data.data);
  expect.assertions(9);
  expect(cons.data.data._id).toEqual(postedcons.data.data._id);
  expect(cons.data.data.conversations).toEqual(postedcons.data.data.conversations);
  expect(cons.data.data.projects).toEqual(postedcons.data.data.projects);
  expect(cons.data.data.name).toEqual(updatecons.name);
   expect(cons.data.data.email).toEqual(postedcons.data.data.email);
   expect(cons.data.data.password).toEqual(postedcons.data.data.password);
  expect(cons.data.data.address).toEqual(updatecons.address);
  expect(cons.data.data.occupation).toEqual(postedcons.data.data.occupation);
  expect(cons.data.data.phoneNumber).toEqual(postedcons.data.data.phoneNumber);
});


let mycons1 = {
  name: "Saad",
  email: "saaaaad@guc.edu.eg",
  password: "1234",
  address:"October City",
  occupation: "dsdsdsdsdsdsdsd"
 
};
  //done
test(`delete consultancy profile by id`, async () => {
  const postedcons= await funcs.postConsultancy(mycons1);
  let x = {
    email:postedcons.data.data.email,
    password:mycons1.password
  }
  consultancyToken = await funcs.login(x);
  const cons= await funcs.deleteconsultancy(consultancyToken.data.data);
  expect.assertions(9);
  expect(cons.data.data._id).toEqual(postedcons.data.data._id);
  expect(cons.data.data.conversations).toEqual(postedcons.data.data.conversations);
  expect(cons.data.data.projects).toEqual(postedcons.data.data.projects);
  expect(cons.data.data.name).toEqual(postedcons.data.data.name);
   expect(cons.data.data.email).toEqual(postedcons.data.data.email);
   expect(cons.data.data.password).toEqual(postedcons.data.data.password);
  expect(cons.data.data.address).toEqual(postedcons.data.data.address);
  expect(cons.data.data.occupation).toEqual(postedcons.data.data.occupation);
  expect(cons.data.data.phoneNumber).toEqual(postedcons.data.data.phoneNumber);
});







let mycons5 = {
  name: "ferjani",
  email: "sassi12q311111s11121@gmail.com",
  password: "shika",
  address:"October City",
  occupation: "lkajlkasjalksjalksjlksjals"
};


let mycons6 = {
  name: "Shikabala",
  email: "shikabalasa1q11212111111@gmail.com",
  password: "shika",
  address:"October City",
  occupation: "lkajlkasjalksjalksjlksjals"
};

   //done   
test(`post consultanies conversation`, async () => {
  const conss = await funcs.postConsultancy(mycons5);
  let x = {
    email:conss.data.data.email,
    password:mycons5.password
  }
  consultancyToken = await funcs.login(x);
  const consss = await funcs.postConsultancy(mycons6);
  let y = {
    email:consss.data.data.email,
    password:mycons6.password
  }
  consultancyTokens = await funcs.login(y);
  let conservation={
      email: consss.data.data.email
  }
  // console.log(conss.data.data._id+" "+conservation.email);
      const cons =await funcs.postConversation(conservation,consultancyToken.data.data);
      // console.log(cons.data.msg);
      expect.assertions(1);
      expect(cons.data.msg).toEqual("New consultancy conversation is created");
});


let mycons7 = {
  name: "Neymar",
  email: "Neymar11111@gmail.com",
  password: "Ney",
  address:"Brazil",
  occupation: "kajlkasjalksjzxsalksjlksjals"
};


let mycons8 = {
  name: "Dybala",
  email: "Dybala111111@gmail.com",
  password: "juventus",
  address:"Argentina",
  occupation: "lkajlkazasjalssksjalksjlksjals"
};

          //done 
test(`get consultanies conversation by email `, async () => {
  const conss = await funcs.postConsultancy(mycons7);
  let x = {
    email:conss.data.data.email,
    password:mycons7.password
  }
  consultancyToken = await funcs.login(x);
  const consss = await funcs.postConsultancy(mycons8);
  let y = {
    email:consss.data.data.email,
    password:mycons8.password
  }
  consultancyTokens = await funcs.login(y);
  let conservation={
      email: consss.data.data.email
  }
      const con =await funcs.postConversation(conservation,consultancyToken.data.data);
      const cons = await funcs.getConversationbyemail(conss.data.data._id,consss.data.data.email);
      // console.log(cons.data.data.receiverEmail+" "+consss.data.data.email);
        expect.assertions(1);
      expect(cons.data.data.receiverEmail).toEqual(consss.data.data.email);

  
});



let mycons9 = {
  name: "mortada",
  email: "mortadaaaaaaaaaaaaaaaa@gmail.com",
  password: "omak",
  address:"f kol heta",
  occupation: "kajlkasdsdsjalksjzxsalksjlksjals"
};


let mycons10 = {
  name: "ana",
  email: "anaaaaaaaaaaaaaaaaa@gmail.com",
  password: "me",
  address:"hena",
  occupation: "lkajlkazasjalssksjalksjlksjals"
};

test(`delete consultanies conversation by email `, async () => {
  const conss = await funcs.postConsultancy(mycons9);
  let x = {
    email:conss.data.data.email,
    password:mycons9.password
  }
  consultancyToken = await funcs.login(x);
  const consss = await funcs.postConsultancy(mycons10);
  let y = {
    email:consss.data.data.email,
    password:mycons10.password
  }
  consultancyTokens = await funcs.login(y);
  let conservation={
      email: consss.data.data.email
  }
      const cons =await funcs.postConversation(conservation,consultancyToken.data.data);
      const con =await funcs.deleteConversation(consss.data.data.email,consultancyToken.data.data);
      expect.assertions(1);
      expect(con.data.msg).toEqual("Consultancy conversation is deleted");

  
});

let mycons11 = {
  name: "messi",
  email: "messi@gmail.com",
  password: "leo",
  address:"barca",
  occupation: "visca barca"
};


let mycons12 = {
  name: "cr7",
  email: "cr@gmail.com",
  password: "cr7",
  address:"juventus",
  occupation: "lkajddlkazasjalssksjalksjlksjals"
};

  //Done
test('get all conservations', async () => {
  const conss = await funcs.postConsultancy(mycons11);
  let x = {
    email:conss.data.data.email,
    password:mycons11.password
  }
  consultancyToken = await funcs.login(x);
      const consss = await funcs.postConsultancy(mycons12);
      let y = {
        email:consss.data.data.email,
        password:mycons12.password
      }
      consultancyTokens = await funcs.login(y);
      let conservation={
          email: consss.data.data.email
      }
          const cons =await funcs.postConversation(conservation,consultancyToken.data.data);
expect.assertions(1);
const con = await funcs.getAllCons(consultancyToken.data.data);
expect(con.data.data.length).toBe(1);
});


let mycons13 = {
  name: "pirlo",
  email: "pirlo11111@gmail.com",
  password: "sxsdd",
  address:"asdasa",
  occupation: "pirlo"
};


let mycons14 = {
  name: "kante",
  email: "kante11111@gmail.com",
  password: "kante",
  address:"chelsea",
  occupation: "lkajddlkazasjalssksjalksjlksjals"
};

  //Done
test(`send an email inside an existing conversation `, async () => {
  const conss = await funcs.postConsultancy(mycons13);
  let x = {
    email:conss.data.data.email,
    password:mycons13.password
  }
  consultancyToken = await funcs.login(x);
  const consss = await funcs.postConsultancy(mycons14);
  let y = {
    email:consss.data.data.email,
    password:mycons14.password
  }
  consultancyTokens = await funcs.login(y);
  let conservation={
      email: consss.data.data.email
      }
  const cons =await funcs.postConversation(conservation,consultancyToken.data.data);
      let mail={
          email: consss.data.data.email,
          content:"hello",
          type:consss.data.data.email
      }
      // console.log(conss.data.data._id);
      const con = await funcs.postemailConversation(mail,consultancyToken.data.data);
      // console.log(con.data.msg);
      expect.assertions(1);
      expect(con.data.msg).toEqual("Consultancy email is sent");

});


let partnerr1 = {
  name: "islam nasr",
  email: "islam.nasr55555555555555555555555555@gmail.com",
  password: "hello"
 
};
let projectt1 ={
  name:"project1",
  description:"my project is better than yours",
  requireConsultancy:true,
  approveAdmin: true
};

let logginn={
  email: "omar.aborabya@gmail.com",
  password: "IamOmar"
}

test(`get all  projects consultancy can apply for`, async () => {
  consultancyToken = await funcs.login(logginn);
  const partner = await funcs.createPartner(partnerr1);
  let x={
    email:partner.data.data.email,
    password:partnerr1.password
  }
  partnerToken = await funcs.login(x);
  const project=await funcs.createProject(projectt1,partnerToken.data.data);
  expect.assertions(1);
const con = await funcs.getAllProjects(consultancyToken.data.data);
expect(con.data.data.length).toBe(1);
});


let projectt2 ={
  name:"project2",
  description:"my project is better than yours",
  requireConsultancy:true,
  approveAdmin: true
};
let partnerr2 = {
  name: "I am Saad",
  email: "iamsaad@gmail.com",
  password: "hello"
 
};

test(`select project by its id`, async () => {
  consultancyToken = await funcs.login(logginn);
  const partner = await funcs.createPartner(partnerr2);
  let x={
    email:partner.data.data.email,
    password:partnerr2.password
  }
  partnerToken = await funcs.login(x);
  const postedproject=await funcs.createProject(projectt2,partnerToken.data.data);

  const project = await funcs.getProjectbyid(postedproject.data.data._id,consultancyToken.data.data);
  expect.assertions(8);
  expect(project.data.data.lifecycle).toEqual(postedproject.data.data.lifecycle);
  expect(project.data.data.approveAdmin).toEqual(postedproject.data.data.approveAdmin);
  expect(project.data.data.requireConsultancy).toEqual(postedproject.data.data.requireConsultancy);
  expect(project.data.data.assigned).toEqual(postedproject.data.data.assigned);
  expect(project.data.data._id).toEqual(postedproject.data.data._id);
  expect(project.data.data.name).toEqual(postedproject.data.data.name);
  expect(project.data.data.description).toEqual(postedproject.data.data.description);
  expect(project.data.data.tasks).toEqual(postedproject.data.data.tasks);


});


let projectt3 ={
  name:"project3",
  description:"kfaya projects b2a t3bnaa",
  requireConsultancy:true,
  approveAdmin: true
};
let partnerr3 = {
  name: "ana partner",
  email: "partner@gmail.com",
  password: "partnerpartnerpartner"
 
};


let mycons15= {
  name: "Morata",
  email: "Morata@gmail.com",
  password: "Morata",
  address:"chelsea",
  occupation: "lkajddlkazasjalssksjalksjlksjals"
};

test(`Assign project by its id`, async () => {
  const partner = await funcs.createPartner(partnerr3);
  let x={
    email:partner.data.data.email,
    password:partnerr3.password
  }
  partnerToken = await funcs.login(x);
  const postedproject=await funcs.createProject(projectt3,partnerToken.data.data);
  const conss = await funcs.postConsultancy(mycons15);
  let y ={
    email:conss.data.data.email,
    password: mycons15.password
  }
  consultancyToken = await funcs.login(y);
  const project = await funcs.getAssignedProjectbyid(postedproject.data.data._id,consultancyToken.data.data);
  expect.assertions(8);
  expect(project.data.data.lifecycle).toEqual(postedproject.data.data.lifecycle);
  expect(project.data.data.approveAdmin).toEqual(postedproject.data.data.approveAdmin);
  expect(project.data.data.requireConsultancy).toEqual(postedproject.data.data.requireConsultancy);
  expect(project.data.data.assigned).toEqual(postedproject.data.data.assigned);
  expect(project.data.data._id).toEqual(postedproject.data.data._id);
  expect(project.data.data.name).toEqual(postedproject.data.data.name);
  expect(project.data.data.description).toEqual(postedproject.data.data.description);
  expect(project.data.data.tasks).toEqual(postedproject.data.data.tasks);


});





let projectt4 ={
  name:"project4",
  description:"enough projects please",
  requireConsultancy:true,
  approveAdmin: true
};
let partnerr4 = {
  name: "lovely partner",
  email: "loveyou@gmail.com",
  password: "partnerpartnerpartner"
 
};




test(`update project by its id`, async () => {
  const partner = await funcs.createPartner(partnerr4);
  let x={
    email:partner.data.data.email,
    password:partnerr4.password
  }
  partnerToken = await funcs.login(x);
  const postedproject=await funcs.createProject(projectt4,partnerToken.data.data);
  let edited={
      name: "saadom",
      description: "the best"
  }
  consultancyToken = await funcs.login(logginn);
  const project = await funcs.putProjectbyid(postedproject.data.data._id,edited,consultancyToken.data.data);
  expect.assertions(8);
  expect(project.data.data.lifecycle).toEqual(postedproject.data.data.lifecycle);
  expect(project.data.data.approveAdmin).toEqual(postedproject.data.data.approveAdmin);
  expect(project.data.data.requireConsultancy).toEqual(postedproject.data.data.requireConsultancy);
  expect(project.data.data.assigned).toEqual(postedproject.data.data.assigned);
  expect(project.data.data._id).toEqual(postedproject.data.data._id);
  expect(project.data.data.name).toEqual(edited.name);
  expect(project.data.data.description).toEqual(edited.description);
  expect(project.data.data.tasks).toEqual(postedproject.data.data.tasks);


});




let projectt5 ={
  name:"project5",
  description:"5 to go",
  requireConsultancy:true,
  approveAdmin: true
};
let partnerr5 = {
  name: "ich bin partner",
  email: "ichpart@gmail.com",
  password: "partnerpartnerpartner"
 
};



// make a candidate apply for the project first
test(`get Assigned Candidtes for Project`, async () => {
  const partner = await funcs.createPartner(partnerr5);
  let x={
    email:partner.data.data.email,
    password:partnerr5.password
  }
  partnerToken = await funcs.login(x);
  consultancyToken = await funcs.login(logginn);
  const postedproject=await funcs.createProject(projectt5,partnerToken.data.data);
  
  const res = await funcs.getAssignedCandidtesforProject(postedproject.data.data._id,consultancyToken.data.data);
  expect.assertions(1);
  expect(res.data.data.length).toBe(0);


});







let mycons16= {
  name: "fakhr el arab",
  email: "salah@gmail.com",
  password: "akhla2",
  address:"liverpool",
  occupation: "lkajdaadlkazasjalssksjalksjlksjals"
}

let projectt6 ={
  name:"project6",
  description:"6 to go",
  requireConsultancy:true,
  approveAdmin: true
};
let partnerr6 = {
  name: "je suis partner",
  email: "jepart@gmail.com",
  password: "partnerpartnerpartner"
 
};




test(`Assign project by its id`, async () => {
  const partner = await funcs.createPartner(partnerr6);
  let x={
    email:partner.data.data.email,
    password:partnerr6.password
  }
  partnerToken = await funcs.login(x);
  const postedproject=await funcs.createProject(projectt6,partnerToken.data.data);
  const conss = await funcs.postConsultancy(mycons16);
  let z={
    email: conss.data.data.email,
    password: mycons16.password
  }
  consultancyToken = await funcs.login(z);
  const project = await funcs.getAssignedProjectbyid(postedproject.data.data._id,consultancyToken.data.data);
  const res = await funcs.getProjectNamesIamAssignedTo(conss.data.data._id);
  expect.assertions(1);
  expect(res.data.data.length).toBe(1);


});



// let mycons17= {
//     name: "lastaya wla a",
//     email: "lastisa@gmail.com",
//     password: "last",
//     address:"tagmo3",
//     occupation: "lkajdaadlskazasjalssksjalksjlksjals"
//   }

let projectt7 ={
  name:"project7",
  description:"7 to go",
  requireConsultancy:true,
  approveAdmin: true
};
let partnerr7 = {
  name: "partneeer",
  email: "yarabanat3bt@gmail.com",
  password: "partnerpartnerpartner"
 
};

//testing searching projects by name
test('search Project by name', async () => {
  expect.assertions(9);
  const partner = await funcs.createPartner(partnerr7);
  let x={
    email:partner.data.data.email,
    password:partnerr7.password
  }
  partnerToken = await funcs.login(x);
  const postedproject=await funcs.createProject(projectt7,partnerToken.data.data);
  // const conss = await funcs.postConsultancy(mycons17);
  consultancyToken = await funcs.login(logginn);
  const response = await funcs.getprojectbyname(postedproject.data.data.name,consultancyToken.data.data);
  console.log(response.data.data);
  expect(response.data.data[0]._id).toContain(postedproject.data.data._id);
  expect(response.data.data[0].conversations).toEqual(postedproject.data.data.conversations);
  expect(response.data.data[0].name).toContain(postedproject.data.data.name);
  expect(response.data.data[0].email).toEqual(postedproject.data.data.email);
  expect(response.data.data[0].password).toEqual(postedproject.data.data.password);
  expect(response.data.data[0].projects).toEqual(postedproject.data.data.projects);
  expect(response.data.data[0].address).toEqual(postedproject.data.data.address);
  expect(response.data.data[0].occupation).toEqual(postedproject.data.data.occupation);
  expect(response.data.data[0].phoneNumber).toEqual(postedproject.data.data.phoneNumber);
});

























