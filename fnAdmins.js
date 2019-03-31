const axios = require("axios");
const functions = {
  postAdmin: async (admin) => {
    const response = await axios.post(
      "http://localhost:5000/api/admins/register", admin
    );
    return response;
  },
  login: async (user) => {
    const token = await axios.post(
      "http://localhost:5000/api/login", user
    );
    return token;
  },
  getAdmin: async (token) => {
    const admin = await axios.get(
      "http://localhost:5000/api/admins/profile", {
        headers: {
          Authorization: token
        }
      }
    );
    return admin;
  },
  putAdmin: async (admin, token) => {
    const response = await axios.put(
      "http://localhost:5000/api/admins", admin, {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
  },
  getAdmins: async (token) => {
    const admins = await axios.get(
      "http://localhost:5000/api/admins/get/admins", {
        headers: {
          Authorization: token
        }
      }
    );
    return admins;
  },
  getCandidates: async (token) => {
    const candidates = await axios.get(
      "http://localhost:5000/api/admins/get/candidates", {
        headers: {
          Authorization: token
        }
      }
    );
    return candidates;
  },
  getConsultancies: async (token) => {
    const consultancies = await axios.get(
      "http://localhost:5000/api/admins/get/consultancies", {
        headers: {
          Authorization: token
        }
      }
    );
    return consultancies;
  },
  deleteAdmin: async (token) => {
    const response = await axios.delete(
      "http://localhost:5000/api/admins/delete", {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
  },
  postConsultancy: async (cons, token) => {
    const response = await axios.post(
      "http://localhost:5000/api/consultancies/register", cons, {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
  },
  postCandidate: async (candidate, token) => {
    const response = await axios.post(
      "http://localhost:5000/api/candidates/register", candidate, {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
  },
  createCertificate: async (certificate, token) => {
    const createdCertificate = await axios.post("http://localhost:5000/api/admins/certificate", certificate, {
      headers: {
        Authorization: token
      }
    });
    return createdCertificate;

  },
  getCertificate: async (id, token) => {
    const certificate = await axios.get(
      "http://localhost:5000/api/admins/certificate/" + id, {
        headers: {
          Authorization: token
        }
      });
    return certificate;
  },
  getCertificates: async (token) => {
    const certificates = await axios.get(
      "http://localhost:5000/api/admins/get/certificates", {
        headers: {
          Authorization: token
        }
      }
    );
    return certificates;
  },
  getPartners: async (token) => {
    const partners = await axios.get(
      "http://localhost:5000/api/admins/get/partners", {
        headers: {
          Authorization: token
        }
      }
    );
    return partners;
  },
  getCertificates: async (token) => {
    const certificates = await axios.get(
      "http://localhost:5000/api/admins/get/certificates", {
        headers: {
          Authorization: token
        }
      }
    );
    return certificates;
  },
  getProjects: async (token) => {
    const projects = await axios.get(
      "http://localhost:5000/api/admins/get/projects"
    );
    return projects;
  },
  getEmails: async (token) => {
    const emails = await axios.get(
      "http://localhost:5000/api/admins/get/emails", {
        headers: {
          Authorization: token
        }
      }
    );
    return emails;
  },
  getAdminbyname: async (name, token) => {
    const admin = await axios.get(
      "http://localhost:5000/api/admins/searchAdmins/" + name, {
        headers: {
          Authorization: token
        }
      }
    );
    return admin;
  },
  getCandidatebyname: async (name, token) => {
    const candidate = await axios.get(
      "http://localhost:5000/api/admins/searchCandidates/" + name, {
        headers: {
          Authorization: token
        }
      }
    );
    return candidate;
  },
  getConsultanciesbyname: async (name, token) => {
    const consultancy = await axios.get(
      "http://localhost:5000/api/admins/searchConsultancies/" + name, {
        headers: {
          Authorization: token
        }
      }
    );
    return consultancy;
  },
  getPartnersbyname: async (name, token) => {
    const partner = await axios.get(
      "http://localhost:5000/api/admins/searchPartners/" + name, {
        headers: {
          Authorization: token
        }
      }
    );
    return partner;
  },
  postCertificate: async (certificate, token) => {
    const response = await axios.post(
      "http://localhost:5000/api/admins/certificate", certificate, {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
  },
  getCertificate: async (id, token) => {
    const certificate = await axios.get(
      "http://localhost:5000/api/admins/certificate/" + id, {
        headers: {
          Authorization: token
        }
      }
    );
    return certificate;
  },
  putCertificate: async (id, certificate, token) => {
    const response = await axios.put(
      "http://localhost:5000/api/admins/certificate/" + id, certificate
    );
    return response;
  },
  deleteCertificate: async (id, token) => {
    const response = await axios.delete(
      "http://localhost:5000/api/admins/certificate/" + id, {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
  },
  getCertificatesbyname: async (name, token) => {
    const certificate = await axios.get(
      "http://localhost:5000/api/admins/searchCertificates/" + name, {
        headers: {
          Authorization: token
        }
      }
    );
    return certificate;
  },
  //create project by description and consultancy requirement
  createProject: async (id, project, token) => {
    const createdproject = await axios.post(
      "http://localhost:5000/api/partners/project", project, {
        headers: {
          Authorization: token
        }
      }
    );
    return createdproject;
  },
  //selecting project by id
  getProjectbyId: async (id, token) => {
    const project = await axios.get(
      "http://localhost:5000/api/admins/project/" + id, {
        headers: {
          Authorization: token
        }
      }
    );
    return project;
  },
  getProjectsbyname: async (name, token) => {
    const project = await axios.get(
      "http://localhost:5000/api/admins/searchProjects/" + name, {
        headers: {
          Authorization: token
        }
      }
    );
    return project;
  },
  postemailConversation: async (email, id) => {
    const response = await axios.post(
      "http://localhost:5000/api/admins/conversation/email/" + id, email
    );
    return response;
  },
  getEmailsbyname: async (name) => {
    const email = await axios.get(
      "http://localhost:5000/api/admins/searchEmails/" + name
    );
    return email;
  },
  updateProjectbyId: async (projectid, body) => {
    const updatedProject = await axios.put(
      "http://localhost:5000/api/admins/project/" + projectid, body
    );
    return updatedProject;
  },
  removeProjectbyId: async (projectId) => {
    const deletedproject = await axios.delete(
      "http://localhost:5000/api/admins/project/" + projectId
    );
    return deletedproject;
  }
};
module.exports = functions;