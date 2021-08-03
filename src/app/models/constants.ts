export const fileUploadLimit = 30000 * 1000;
export const backend_url = "https://tutorx-backend.herokuapp.com";

export const env_url = {
  heroku_url: 'https://tutorx-frontend.herokuapp.com/',
  local_url: 'http://localhost:4200/',
  prod_url: ''
}

export const dummyChatId = 'Q936d4c46-3a30-4f17-b2ce-aa53d8c3af37';

export const backend_api_resource = {
  payment: '/payment',
  email: '/email'
}

export const chat_status = {
  openForTutors: 'open',
  ongoing: 'ongoing',
  closed: 'closed',
}

export const collections = {
  chats: 'chats',
  students: 'student',
  tutors: 'tutor',
  questions: 'question',
  test: 'test',
  review: 'review',
  message: 'message',
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
  testChat: '/test-chat',
  chat: '/chat'
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

export const email_data = {
  senderEmail: 'innathanak.dev@gmail.com',
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

