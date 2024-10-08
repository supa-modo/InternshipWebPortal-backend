"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "InternshipPolicies",
      [
        {
          section: "",
          paragraph:
            "Please read the following carefully and ensure you understand the obligations and conditions of the internship before proceeding with your application.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          section: "Objective of the Internship",
          paragraph:
            "The internship is designed to provide practical experience and exposure to the inner workings of the EAC.\n\nIt offers an opportunity for professional development through hands-on tasks and interactions with experienced professionals.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          section: "Eligibility Requirements",
          paragraph:
            "You must be enrolled in a recognized university or have recently graduated (within the last year).\n\nInternships are available for students in fields related to the work of the EAC, such as Information Technology, Human Resources, Finance, Customs and Trade, etc.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          section: "Internship Duration and Scope",
          paragraph:
            "The internship program typically lasts between 2 to 6 months, depending on the requirements of your academic program or department and interns will be assigned to specific departments based on their skills, interests, and the needs of the organization.\n\nThe intern is expected to complete the full duration unless otherwise stated.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          section: "Transportation and Upkeep",
          paragraph:
            "You are responsible for your transportation costs to and from the EAC offices throughout the internship.\n\nThe EAC does not provide any housing, transportation allowances, or financial support for daily expenses.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          section: "Medical Insurance",
          paragraph:
            "It is mandatory for all interns to have valid medical insurance coverage for the entire duration of the internship.\n\nYou will be required to present updated proof of medical insurance on the first day of reporting to duty.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          section: "Personal Conduct and Responsibilities",
          paragraph:
            "Interns are expected to maintain a professional attitude and abide by the organizational rules and regulations as detailed in the official EAC Staff Rules and Regulations Handbook. You must adhere to the working hours of the assigned department and fulfill your tasks diligently.\n\nYou are required to respect the confidentiality of all information you encounter during the internship and will be obligated to sign a confidentiality agreement before starting the internship in this regard.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          section: "Absences and Leave",
          paragraph:
            "Absences must be reported to your supervisor in advance.\n\nLeave during the internship period will only be granted in exceptional cases subject to prior approval from the supervisor.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          section: "Termination of Internship",
          paragraph:
            "The EAC reserves the right to terminate the internship for unsatisfactory performance or violation of EAC policies.\n\nInterns may also terminate the internship voluntarily by providing at least two weeks' notice.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          section: "Certification",
          paragraph:
            "Upon successful completion of the internship, the intern will receive a certificate of completion from the EAC.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("InternshipPolicies", null, {});
  },
};
