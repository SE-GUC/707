const funcs = require("./fn");
let myAdmin = {
  email: "kariman-hossam@hotmail.com",
  password: "anakarimanhossam"
};
let myPartner = {
  email: "shahd-wael@hotmail.com",
  password: "anashahdwael"
};
let myConsultancy = {
  email: "omar-saad@hotmail.com",
  password: "anaomarsaad"
};
let myCandidate = {
  email: "hana-kamal@hotmail.com",
  password: "anahanakamal"
};
//testing login as an admin
test(`login admin `, async () => {
  expect.assertions(3);
  const token = await funcs.login(myAdmin)
  expect(token.status).toBe(200)
  expect(token.data.data).not.toEqual(null);
  expect(token.data.data).toContain('Bearer ');

});
test(`login partner `, async () => {
  expect.assertions(3);
  const token = await funcs.login(myPartner)
  expect(token.status).toBe(200)
  expect(token.data.data).not.toEqual(null);
  expect(token.data.data).toContain('Bearer ');
});
test(`login consultancy `, async () => {
  expect.assertions(3);
  const token = await funcs.login(myConsultancy)
  expect(token.status).toBe(200)
  expect(token.data.data).not.toEqual(null);
  expect(token.data.data).toContain('Bearer ');
});
test(`login candidate `, async () => {
  expect.assertions(3);
  const token = await funcs.login(myCandidate)
  expect(token.status).toBe(200)
  expect(token.data.data).not.toEqual(null);
  expect(token.data.data).toContain('Bearer ');
});
test(`logout admin `, async () => {
  expect.assertions(6);
  adminToken = await funcs.login(myAdmin);
  const loggedOutUser = await funcs.logout(adminToken.data.data)
  expect(loggedOutUser.status).toBe(200)
  expect(loggedOutUser.data.msg).toEqual("You logged out successfully")
  expect(loggedOutUser.data.data).not.toEqual(null)
  expect(loggedOutUser.data.data._v).not.toEqual(null);
  expect(loggedOutUser.data.data._id).not.toEqual(null);
  expect(loggedOutUser.data.data.id).not.toEqual(null);
});
test(`logout partner `, async () => {
  expect.assertions(6);
  partnerToken = await funcs.login(myPartner);
  const loggedOutUser = await funcs.logout(partnerToken.data.data)
  expect(loggedOutUser.status).toBe(200)
  expect(loggedOutUser.data.msg).toEqual("You logged out successfully")
  expect(loggedOutUser.data.data).not.toEqual(null)
  expect(loggedOutUser.data.data._v).not.toEqual(null);
  expect(loggedOutUser.data.data._id).not.toEqual(null);
  expect(loggedOutUser.data.data.id).not.toEqual(null);
});
test(`logout consultancy `, async () => {
  expect.assertions(6);
  consultancyToken = await funcs.login(myConsultancy);
  const loggedOutUser = await funcs.logout(consultancyToken.data.data)
  expect(loggedOutUser.status).toBe(200)
  expect(loggedOutUser.data.msg).toEqual("You logged out successfully")
  expect(loggedOutUser.data.data).not.toEqual(null)
  expect(loggedOutUser.data.data._v).not.toEqual(null);
  expect(loggedOutUser.data.data._id).not.toEqual(null);
  expect(loggedOutUser.data.data.id).not.toEqual(null);
});
test(`logout candidate `, async () => {
  expect.assertions(6);
  candidateToken = await funcs.login(myCandidate);
  const loggedOutUser = await funcs.logout(candidateToken.data.data)
  expect(loggedOutUser.status).toBe(200)
  expect(loggedOutUser.data.msg).toEqual("You logged out successfully")
  expect(loggedOutUser.data.data).not.toEqual(null)
  expect(loggedOutUser.data.data._v).not.toEqual(null);
  expect(loggedOutUser.data.data._id).not.toEqual(null);
  expect(loggedOutUser.data.data.id).not.toEqual(null);
});