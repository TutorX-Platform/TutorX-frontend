export const fileUploadLimit = 30000 * 1000;

export const collections = {
  chats: 'chats',
  students: 'student',
  tutors: 'tutor',
  questions: 'question',
  test: 'test',
  review: 'review'
}

export const storage_collections = {
  chat: 'chat-attachments',
  profile_data: 'profile-data',
  question: 'question-attachments',
  test: 'test',
}

export const uniqueIdPrefix = {
  prefixStudent: 'S',
  prefixTutor: 'T',
  prefixQuestion: 'Q',
}

export const userTypes = {
  student: 'student',
  tutor: 'tutor',
  admin: 'admin',
}

export const genKey = {
  student: 'student',
  tutor: 'tutor',
  question: 'question',
}

export const routes = {
  home: "",
  dummy: 'dummy',
  sign_in: '/sign-in',
  student_q_pool: '/student',
  turor: '/tutor',
}

export const localStorageKeys = {
  user: 'user'
}

export const questionStatus = {
  open: 'Open',
  in_progress: 'Inprogress',
  assigned: 'Assigned',
  cancelled: 'Cancelled',
  completed: 'Completed'
}

export const subjectCodes = {
  maths: 'Maths',
  english: 'English',
  science: 'Science',
  cs: 'Computer Science',
}

export const subjects = [
  subjectCodes.maths, subjectCodes.english, subjectCodes.science, subjectCodes.cs
];

export const regexp_patterns = {
  email: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
}

export const service_url = {
  emailBackend: 'https://ooder-backend.herokuapp.com/api/sendEmail',
}

export const email_data = {
  senderEmail: 'innathanak.dev@gmail.com',
  senderPassword: 'innathanakdevgroup',
  subject: 'Welcome to TutorX Platform',
  message: 'This is dummt message replace with given one',
  questionAcknowledgementEmail: "Hi, We received your question successfully, We will send a link to join to the chat room once tutor accept your question"
}

export const sortBy_functions = [
  {name: "Newest created first", id: 1, code: 'asec'},
  {name: "Newest created last", id: 2, code: 'desec'},
  {name: "Due date first", id: 3, code: 'asec'},
  {name: "Due date last", id: 4, code: 'asec'},
];

export const sortingFields = {
  createdDate: 'createdDate',
  dueDate: 'dueDate',
}

export const sortingOrders = {
  newestFirst: 'order',
  newestLast: 'reverse',
}

export const url_sign = {
  url_separator: '/',
  underscore: '_',
}

export function getProgressDialogData() {
  return {
    width: '200px',
    // height: '400px',
    disableClose: true,
    panelClass: 'loading'
  };
}

