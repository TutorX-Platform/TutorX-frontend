export const collections = {
  chats: 'chats',
  students: 'student',
  tutors: 'tutor',
  questions: 'question',
  test: 'test',
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
}

export const localStorageKeys = {
  user: 'user'
}

export const questionStatus = {
  open: 'open',
  in_progress: 'inProgress',
  assigned: 'assigned',
  cancelled: 'cancelled',
  completed: 'completed'
}

export const subjects = [
  "maths", "science", "geography", "history"
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

