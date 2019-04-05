const funcs = require("./fnConsultancy");

let mycons = {
    name: "Omar Saad",
    email: "omar.aborabya11@gmail.com",
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
       const conss = await funcs.getConsultancy(cons.data.data._id);
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
    const cons = await funcs.putConsultancy(postedcons.data.data._id,updatecons);
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
    const cons= await funcs.deleteconsultancy(postedcons.data.data._id);
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
    const consss = await funcs.postConsultancy(mycons6);
    let conservation={
        email: consss.data.data.email
    }
    // console.log(conss.data.data._id+" "+conservation.email);
        const cons =await funcs.postConversation(conservation,conss.data.data._id);
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
    const consss = await funcs.postConsultancy(mycons8);
    let conservation={
        email: consss.data.data.email
    }
        const con =await funcs.postConversation(conservation,conss.data.data._id);
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
    const consss = await funcs.postConsultancy(mycons10);
    let conservation={
        email: consss.data.data.email
    }
        const cons =await funcs.postConversation(conservation,conss.data.data._id);
        const con =await funcs.deleteConversation(consss.data.data.email,conss.data.data._id);
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
        const consss = await funcs.postConsultancy(mycons12);
        let conservation={
            email: consss.data.data.email
        }
            const cons =await funcs.postConversation(conservation,conss.data.data._id);
  expect.assertions(2);
  const con = await funcs.getAllCons(conss.data.data._id);
  expect(con.data.data.length).not.toBe(null);
  expect(con.data.msg).toEqual("All my conversations returned");

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
    const consss = await funcs.postConsultancy(mycons14);
    let conservation={
        email: consss.data.data.email
        }
    const cons =await funcs.postConversation(conservation,conss.data.data._id);
        let mail={
            email: consss.data.data.email,
            content:"hello",
            type:consss.data.data.email
        }
        // console.log(conss.data.data._id);
        const con = await funcs.postemailConversation(mail,conss.data.data._id);
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



  test(`get all  projects consultancy can apply for`, async () => {
    const partner = await funcs.createPartner(partnerr1);
    const project=await funcs.createProject(partner.data.data._id,projectt1);
    expect.assertions(2);
  const con = await funcs.getAllProjects();
  expect(con.data.data).not.toBe(null);
  expect(con.data.msg).toEqual("Project names is viewed");
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
    const partner = await funcs.createPartner(partnerr2);
    const postedproject=await funcs.createProject(partner.data.data._id,projectt2);

    const project = await funcs.getProjectbyid(postedproject.data.data._id);
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
    const postedproject=await funcs.createProject(partner.data.data._id,projectt3);
    const conss = await funcs.postConsultancy(mycons15);
    const project = await funcs.getAssignedProjectbyid(conss.data.data._id,postedproject.data.data._id);
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
    const postedproject=await funcs.createProject(partner.data.data._id,projectt4);
    let edited={
        name: "saadom",
        description: "the best"
    }
    const project = await funcs.putProjectbyid(postedproject.data.data._id,edited);
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

  let candidatte1={
    name:"Hazem Emam",
    email:"zomaa@yahoo.com",
    password:"alembrator"
  }

// make a candidate apply for the project first
test(`get Assigned Candidtes for Project`, async () => {
    const partner = await funcs.createPartner(partnerr5);
    const postedproject=await funcs.createProject(partner.data.data._id,projectt5);
    const cand = await funcs.postCandidate(candidatte1);
    const ac =await  funcs.applyforProjectbyID(cand.data.data._id,postedproject.data.data._id);
    const res = await funcs.getAssignedCandidtesforProject(postedproject.data.data._id);
    expect.assertions(2);
    expect(res.data.data).not.toBe(null);
    expect(res.data.msg).toEqual("These are the candidates applying for requested project");

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
    const postedproject=await funcs.createProject(partner.data.data._id,projectt6);
    const conss = await funcs.postConsultancy(mycons16);
    const project = await funcs.getAssignedProjectbyid(conss.data.data._id,postedproject.data.data._id);
    const res = await funcs.getProjectNamesIamAssignedTo(conss.data.data._id);
    expect.assertions(2);
    expect(res.data.data).not.toBe(null);
    expect(res.data.msg).toEqual("Project names returned");
    

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
    const postedproject=await funcs.createProject(partner.data.data._id,projectt7);
    // const conss = await funcs.postConsultancy(mycons17);
    const response = await funcs.getprojectbyname(postedproject.data.data.name);
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


  let candidatte={
    name:"Ahmed el ahmar",
    email:"ahmar@yahoo.com",
    password:"zamalekhandball"
  }

  let projectt8 ={
    name:"project8",
    description:"8 to go",
    requireConsultancy:true,
    approveAdmin: true
  };
  let partnerr8 = {
    name: "partneeer8",
    email: "babyshark@gmail.com",
    password: "dododobaby"
   
  };
  test('Assign a candidate to project', async () => {
    expect.assertions(1);
    const cand = await funcs.postCandidate(candidatte);
    const partner = await funcs.createPartner(partnerr8);
    const postedproject=await funcs.createProject(partner.data.data._id,projectt8);
    const ac =await  funcs.applyforProjectbyID(cand.data.data._id,postedproject.data.data._id);
    const res = await funcs.Approveacandidate(postedproject.data.data._id,cand.data.data._id);
    expect(res.data.msg).toEqual("Now the candidate applying for this project is approved");
   
  });
