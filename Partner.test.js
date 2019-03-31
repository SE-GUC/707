const funcs = require("./fn");
const bcrypt = require("bcryptjs");
//partner tests 
let partner1 = {
  name: "islam nasr",
  email: "islam.nasr4@gmail.com",
  password: "hello"
};
let partner2 = {
  name: "farah yasser",
  email: "farah.yasser4@gmail.com",
  password: "yafarahyayasser"
};
let partner3 = {
  name: "shahd osman",
  email: "shahd.osman4@gmail.com",
  password: "shahdosman123"
};
let partner4 = {
  name: "omar saad",
  email: "omar.saad1@gmail.com",
  password: "omarsaad"
};
let partner5 = {
  name: "marwan karim",
  email: "marwan.sadat@gmail.com",
  password: "marwansadat"
};
let partner6 = {
  name: "fatema abdelaziz",
  email: "fatema.abdelaziz@gmail.com",
  password: "fatemaabdelaziz"
};
let partner7 = {
  name: "kariman hossam",
  email: "kariman.hossam@gmail.com",
  password: "anakarimanhossam"
};
let partner8 = {
  name: "essso",
  email: "esso@gmail.com",
  password: "ay7aga"
};
let partner9 = {
  name: "ay7ad",
  email: "ay7ad@gmail.com",
  password: "ay7aga"
};
let partner10 = {
  name: "ssss",
  email: "ssss@gmail.com",
  password: "ssss"
};
let partner11 = {
  name: "Shahd Osman",
  email: "Shahd.osman@gmail.com",
  password: "707",
};
let partner12 = {
  name: "gabry",
  email: "mohamed.essam@gmail.com",
  password: "404",
};
let partner13 = {
  name: "balabizo",
  email: "balabizo111@gmail.com",
  password: "hn5odblbi",
  address: "w nrga3 bl tri",
  occupation: "howa dah el flag"
};
let partner14 = {
  name: "ay7aga2",
  email: "ay7aga2@gmail.com",
  password: "aypassword3",
};
let partner15 = {
  name: "balabizo2",
  email: "balabizo22@gmail.com",
  password: "hn5odblbi2",
  address: "w nrga3 bl tri",
  occupation: "howa dah el flag"
};
let partner16 = {
  name: "ay7aga3",
  email: "ay7aga3@gmail.com",
  password: "aypassword4",
};
let partner17 = {
  name: "deleteconversation",
  email: "deleteconversation@gmail.com",
  password: "aypassword8",
};
let partner18 = {
  name: "deleteconversation2",
  email: "deleteconversation2@gmail.com",
  password: "aypassword82",
};
let conversation = {
  email: "omar.saad1@gmail.com"
};
let conversation1 = {
  email: "islam.nasr4@gmail.com"
};
let updatedata = {
  name: "kariman hossam",
  password: "anakarimanhossam"
};
let project = {
  description: "my project is awesome",
  requireConsultancy: true
};
let project1 = {
  name: "my first project",
  description: "my project is better than yours",
  requireConsultancy: false
};
let project2 = {
  name: "my second project",
  description: "my project sucks",
  requireConsultancy: true
};
let project3 = {
  name: "my project",
  description: "my project sucks2",
  requireConsultancy: false
};
let project4 = {
  name: "my project1",
  description: "my project1 sucks2",
  requireConsultancy: false
};
let updateprojectdata = {
  name: "lesa my project",
  description: "lesa my project sucks2"
};
let deletedproject = {
  name: "deleteeee",
  description: "sucksssssssss"
};
//testing register partner
test(`create partner profile `, async () => {
  expect.assertions(6);
  const createdpartner = await funcs.createPartner(partner1);
  expect(createdpartner.data.data.name).toEqual(partner1.name);
  expect(createdpartner.data.data.email).toEqual(partner1.email);
  expect(bcrypt.compareSync(partner1.password, createdpartner.data.data.password));
  //expect(createdpartner.data.data.password).not.toEqual(partner1.password);
  expect(createdpartner.data.data._v).not.toEqual(null);
  expect(createdpartner.data.data._id).not.toEqual(null);
  expect(createdpartner.data.data.conversations).toEqual([]);
  expect(createdpartner.data.data.projects).toEqual([]);
});
//testing get partner by id
test(`get partner by id`, async () => {
  expect.assertions(6);
  const newpartner = await funcs.createPartner(partner2);
  let x = {
    email: newpartner.data.data.email,
    password: partner2.password
  }
  const partnerToken = await funcs.login(x);
  const partner = await funcs.getPartner(partnerToken.data.data);
  expect(newpartner.data.data._id).toEqual(partner.data.data._id);
  expect(newpartner.data.data.name).toEqual(partner.data.data.name);
  expect(newpartner.data.data.email).toEqual(partner.data.data.email);
  expect(newpartner.data.data.password).toEqual(partner.data.data.password);
  expect(newpartner.data.data.conversations).toEqual(partner.data.data.conversations);
  expect(newpartner.data.data.projects).toEqual(partner.data.data.projects);

});
//testing update partner by id
test('update partner information', async () => {
  expect.assertions(2);
  const newpartner3 = await funcs.createPartner(partner4);
  let x = {
    email: newpartner3.data.data.email,
    password: partner4.password
  }
  const partnerToken = await funcs.login(x);
  const updatedpartner = await funcs.updatePartner(partnerToken.data.data, updatedata);
  expect(updatedpartner.data.data.name).toEqual(updatedata.name);
  expect(updatedpartner.data.data._id).toEqual(newpartner3.data.data._id);
  expect(bcrypt.compareSync(updatedata.password, updatedpartner.data.data.password));

});
//testing delete partner by id
test('delete partner by id', async () => {
  expect.assertions(6);
  const newpartner4 = await funcs.createPartner(partner5);
  let x = {
    email: newpartner4.data.data.email,
    password: partner5.password
  }
  const partnerToken = await funcs.login(x);
  const deletedpartner = await funcs.deletePartner(partnerToken.data.data);
  expect(deletedpartner.data.data.name).toEqual(newpartner4.data.data.name);
  expect(deletedpartner.data.data.email).toEqual(newpartner4.data.data.email);
  expect(deletedpartner.data.data.password).toEqual(newpartner4.data.data.password);
  expect(deletedpartner.data.data._id).toEqual(newpartner4.data.data._id);
  expect(deletedpartner.data.data.conversations).toEqual([]);
  expect(deletedpartner.data.data.projects).toEqual([]);
});
//testing post conversation for the partners
// testing Create a new conversation by stating receiver email
test('post partners conversation', async () => {
  expect.assertions(1);
  const partner = await funcs.createPartner(partner11);
  let x = {
    email: partner.data.data.email,
    password: partner11.password
  }
  const partnerToken = await funcs.login(x);
  const conv = await funcs.postPartnerConversation(partnerToken.data.data, conversation1);
  expect(conv.data.msg).toEqual("New partner conversation is created");
});
//testing getting partners conversation
test('get partners conversation', async () => {
  expect.assertions(1);
  const pa = await funcs.createPartner(partner12);
  let x = {
    email: pa.data.data.email,
    password: partner12.password
  }
  const partnerToken = await funcs.login(x);
  const conv = await funcs.postPartnerConversation(partnerToken.data.data, conversation);
  const conv1 = await funcs.postPartnerConversation(partnerToken.data.data, conversation1);
  const da = await funcs.getPartnerConversation(partnerToken.data.data);
  expect(da.data.data.length).toBe(2);
  var daarray = da.data.data;
});
//testing getting specific conversation by email
test(`get partner conversation by email `, async () => {
  const partnera1 = await funcs.createPartner(partner13);
  let x = {
    email: partnera1.data.data.email,
    password: partner13.password
  }
  const partnerToken = await funcs.login(x);
  const partnera2 = await funcs.createPartner(partner14);
  let conversation = {
    email: partnera2.data.data.email
  }
  const convers = await funcs.postPartnerConversation(partnerToken.data.data, conversation);
  const conversa = await funcs.getPartnerConversationbyemail(partnerToken.data.data, partnera2.data.data.email);
  expect.assertions(1);
  expect(conversa.data.data.receiverEmail).toEqual(partnera2.data.data.email);
});
//delete conversation
test('delete partners conversation', async () => {
  const partner = await funcs.createPartner(partner17);
  let x = {
    email: partner.data.data.email,
    password: partner17.password
  }
  const partnerToken = await funcs.login(x);
  const partner2 = await funcs.createPartner(partner18);
  let conversationx = {
    email: "deleteconversation2@gmail.com"
  }
  const conv1 = await funcs.deletePartnerConversation(partnerToken.data.data, conversationx.email);
  expect.assertions(1);
  expect(conv1.data.msg).toEqual("Partner conversation is deleted");
});
//send email in conversation
test(`send an email inside an existing conversation `, async () => {
  const partner1 = await funcs.createPartner(partner15);
  let x = {
    email: partner1.data.data.email,
    password: partner15.password
  }
  const partnerToken = await funcs.login(x);
  const partner2 = await funcs.createPartner(partner16);
  let conservation = {
    email: partner2.data.data.email
  }
  let mail = {
    email: partner2.data.data.email,
    content: "hello",
    type: partner2.data.data.email
  }
  const conversation2 = await funcs.postPartneremailConversation(partnerToken.data.data, mail);
  expect.assertions(1);
  expect(conversation2.data.msg).toEqual("Partner email is sent");
});
//testing create project for partner
test('creating project for partner', async () => {
  expect.assertions(9);
  const createdpartner = await funcs.createPartner(partner6);
  let x = {
    email: createdpartner.data.data.email,
    password: partner6.password
  }
  const partnerToken = await funcs.login(x);
  const createdproject = await funcs.createProject(partnerToken.data.data, project);
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
//testing getting project names of my projects
test('get my projects names', async () => {
  expect.assertions(3);
  const createdpartner = await funcs.createPartner(partner7);
  let x = {
    email: createdpartner.data.data.email,
    password: partner7.password
  }
  const partnerToken = await funcs.login(x);
  const createdproject = await funcs.createProject(partnerToken.data.data, project1);
  const createdproject2 = await funcs.createProject(partnerToken.data.data, project2);
  var names = await funcs.getmyProjects(partnerToken.data.data);
  expect(names[0]).toEqual(createdproject.name);
  expect(names[1]).toEqual(createdproject2.name);
  expect(names.data.data.length).toBe(2);
});
//get project by its id
test('select project by id', async () => {
  expect.assertions(9);
  const createdpartner = await funcs.createPartner(partner8);
  let x = {
    email: createdpartner.data.data.email,
    password: partner8.password
  }
  const partnerToken = await funcs.login(x);
  const createdproject = await funcs.createProject(partnerToken.data.data, project3);
  const selectedproject = await funcs.getProjectbyId(token, createdproject.data.data._id);
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
//update a project by its id
test('update project by id', async () => {
  expect.assertions(9);
  const createdpartner = await funcs.createPartner(partner9);
  let x = {
    email: createdpartner.data.data.email,
    password: partner9.password
  }
  const partnerToken = await funcs.login(x);
  const createdproject = await funcs.createProject(partnerToken.data.data, project4);
  const updatedproject = await funcs.updateProjectbyId(partnerToken.data.data, createdproject.data.data._id, updateprojectdata);
  expect(updatedproject.data.data._id).toEqual(createdproject.data.data._id);
  expect(updatedproject.data.data.description).toEqual(updateprojectdata.description);
  expect(updatedproject.data.data.name).toEqual(updateprojectdata.name);
  expect(updatedproject.data.data.requireConsultancy).toEqual(createdproject.data.data.requireConsultancy);
  expect(updatedproject.data.data.approveAdmin).toEqual(createdproject.data.data.approveAdmin);
  expect(updatedproject.data.data.tasks).toEqual(createdproject.data.data.tasks);
  expect(updatedproject.data.data.lifecycle.description).toEqual(createdproject.data.data.lifecycle.description);
  expect(updatedproject.data.data.lifecycle.status).toEqual(createdproject.data.data.lifecycle.status);
  expect(updatedproject.data.data.lifecycle.percentage).toEqual(createdproject.data.data.lifecycle.percentage);
});
//delete project by id 
test('delete project by id', async () => {
  expect.assertions(10);
  const createdpartner = await funcs.createPartner(partner10);
  let x = {
    email: createdpartner.data.data.email,
    password: partner10.password
  }
  const partnerToken = await funcs.login(x);
  const createdproject = await funcs.createProject(partnerToken.data.data, deletedproject);
  var names = await funcs.getmyProjects(partnerToken.data.data);
  const del = await funcs.deleteProjectbyId(partnerToken.data.data, createdproject.data.data._id);
  var names2 = await funcs.getmyProjects(partnerToken.data.data);
  expect(del.data.data._id).toEqual(createdproject.data.data._id);
  expect(del.data.data.description).toEqual(createdproject.data.data.description);
  expect(del.data.data.name).toEqual(createdproject.data.data.name);
  expect(del.data.data.requireConsultancy).toEqual(createdproject.data.data.requireConsultancy);
  expect(del.data.data.approveAdmin).toEqual(createdproject.data.data.approveAdmin);
  expect(del.data.data.tasks).toEqual(createdproject.data.data.tasks);
  expect(del.data.data.lifecycle.description).toEqual(createdproject.data.data.lifecycle.description);
  expect(del.data.data.lifecycle.status).toEqual(createdproject.data.data.lifecycle.status);
  expect(del.data.data.lifecycle.percentage).toEqual(createdproject.data.data.lifecycle.percentage);
  expect(names.data.data.length - 1).toEqual(names2.data.data.length);
});