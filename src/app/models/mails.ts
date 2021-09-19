export const mailSubjects = {
  suspiciousMsg: 'A suspicious message in the chat :',
  tutorNewRequest: 'Request Submitted',
  tutorNewMessage: ' You have received messages from ',
  tutorDeadlineMail: ' is nearing the deadline! ',
  studentWelcomeMail: 'Welcome to Tutetory',
  studentNewMessage: 'You\'ve received messages from the tutor',
  studentQuestionCompleted: ' Your work has been completed',
  studentPayment: 'Here\'s your receipt of doing'

}


export class mailSubject {
 static getAdminSuspiciousMsg(questionNumber: string) {
    return `A suspicious message in the chat : ${questionNumber}`;
  }

  static getTutorNewRequest(subject: string) {
    return `Request Submitted ${subject}`
  }

  static getTutorNewMessage(questionNumber: string, name: string) {
    return `${questionNumber}: You\'ve received messages from ${name}`
  }

  static getStudentWelcomeMail() {
    return `Welcome tutetory`
  }

  static getStudentNewMessage(questionNumber: string) {
    return `${questionNumber}:  You\'ve received messages from tutor`
  }

  static getStudentQuestionCompleted(questionNumber: string) {
    return `${questionNumber}: Your work has been completed`
  }

  static getStudentPayment() {
    return `Here's your receipt of doing`
  }
}

export class mailBody {

  static getAdminSuspiciousMsg(chatLink: string) {
    return chatLink;
  }

  static getTutorNewRequest(requestId: string, subject: string, subCategory: string, questionTitle: string, link: string) {
    return `A new request ${requestId} has been submitted by student. \n Subject(s) : ${subject} | ${subCategory} \n ${questionTitle}
     \n THIS EMAIL CANNOT BE REPLIED TO. IF YOU WISH TO RESPOND TO THE REQUEST, YOU MUST LOG INTO THE WEBSITE. \n
     ${link}`
  }

  static getTutorNewMessage(name: string, chatLink: string) {
    return `Hi ${name}, \n Please follow the link to reply \n
    ${chatLink}`
  }

  static getStudentWelcomeMail(name: string, link: string) {
    return `Hi ${name} \n Thank you for signing up!\n Now that you’ve signed up, you’re one step closer to getting guidance on your academic problem. \n
    So, what are you waiting for? \n
    Tap on the links below to get started!\n
    ${link}`
  }

  static getStudentNewMessage(link: string, name: string) {
    return `Hi ${name}\n
    Please follow the link to reply \n
    ${link}`
  }

  static getStudentQuestionCompleted(name: string, link: string) {
    return `Hi ${name} \n
    Your tutor has completed your request. Please follow the link to access the completed work. \n
    ${link}`
  }

  static getStudentPayment(name: string, link: string) {
    return `Hi ${name} \n Congrats! \n Your tutor has started working on your request. In case you have any clarifications please follow the link : ${link}`
  }
}
