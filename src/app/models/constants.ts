export const fileUploadLimit = 30000 * 1000;
export const backend_url = "https://sandunapi.tk";
export const time_url = "http://worldtimeapi.org/api/timezone/America/Argentina/Salta";

export const env_url = {
  heroku_url: 'https://sandunapi.tk/',
  local_url: 'http://localhost:4200/',
  prod_url: 'https://tutetory.com'
}

export const dummyChatId = 'Q936d4c46-3a30-4f17-b2ce-aa53d8c3af37';

export const dummy_profile_picture = 'assets/images/default_profile.png';

export const logo = 'assets/images/logo.svg';

export const backend_api_resource = {
  payment: '/payment/',
  email: '/email/',
  time: '/time/',
}

export const messageTypes = {
  success: "success",
  confirmation: "confirmation",
  warningInfo: "warning-info",
  info: "info",
  warning: "warning",
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
  student_q_pool: '/student/questions',
  student: '/student/',
  turor: '/tutor',
  questions: '/questions',
  dashboard: '/dashboard',
  activities: '/activities',
  profile: '/profile',
  payments: '/payments',
  testChat: '/test-chat',
  chat: '/chat',
  pay: '/pay',
  paySuccess: '/pay-success'
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
  computer_science: 'Computer Science',
  mathematics: 'Mathematics',
  physics: 'Physics',
  management: 'Management',
}

export const computerScienceCodes = {
  app_dev: 'App Development',
  ai: 'Artificial Intelligence',
  assembly_language: 'Assembly Language',
  blockChain: 'Blockchain',
  bi: 'Bio Informatics',
  c_plus_plus: 'C++ Programming',
  c_sharp: 'C# Programming',
  cryptography: 'Cryptography',
  dsa: 'Data Structures And Algorithms',
  dm: 'Database management',
  digital_electronics: 'Digital Electronics',
  discrete_mathematics: 'Discrete Mathematics',
  image_processing: 'Image processing',
  is: 'Information Security',
  information_theory: 'Information Theory',
  java: 'Java Programming',
  javascript: 'JavaScript Programming',
  linux: 'Linux',
  ml: 'Machine Learning',
  matlab: 'MATLAB Programming',
  dotnet: 'Microsoft .NET Framework',
  network_management_and_data_communication: 'Network Management And Data Communication',
  os: 'Operating System',
  parallel_computing: 'Parallel Computing',
  perl: 'Perl Programming',
  python: 'Python Programming',
  ruby: 'Ruby Programming',
  rust: 'Rust Programming',
  sed: 'Software Engineering and Design',
  sta: 'Software Testing and Analysis',
  theoritical_computer_science: 'Theoretical Computer Science',
  web_dev: 'Web development (HTML,XML,PHP)'
}

export const engineeringCodes = {
  aerospace_engineering: 'Aerospace Engineering',
  autoCAD: 'Auto CAD',
  automotive_engineering: 'Automotive Engineering',
  bio_engineering: 'BIO Engineering',
  catia: 'Catia',
  chemical_engineering: 'Chemical Engineering',
  circuit_analysis: 'Circuit Analysis',
  civil_engineering: 'Civil Engineering',
  communication_engineering: 'Communication Engineering',

}

export const mathematicsCodes = {
  abstract_algebra: 'Abstract Algebra',
  actuarial_science: 'Actuarial Science',
  advanced_math: 'Advanced Math',
  advanced_statistics: 'Advanced Statistics',
  algebra: 'Algebra',

}
export const physicsCodes = {
  astrophysics: 'Astrophysics ',
  chaos_theory: 'Chaos Theory',
  classical_mechanics: 'Classical Mechanics',
  electricity_and_magnetism: 'Electricity and Magnetism ',
  fluid_dynamics: 'Fluid Dynamics',

}
export const managementCodes = {
  accounting: 'Accounting ',
  business: 'Business',
  accounting_tChart: 'Accounting T-Chart',
}

export const subjects = [
  subjectCodes.mathematics, subjectCodes.computer_science, subjectCodes.physics, subjectCodes.management
];

export const mathsSubjects = [
  mathematicsCodes.abstract_algebra, mathematicsCodes.actuarial_science, mathematicsCodes.advanced_math, mathematicsCodes.advanced_statistics, mathematicsCodes.algebra
]
export const physicsSubjects = [
  physicsCodes.astrophysics, physicsCodes.chaos_theory, physicsCodes.classical_mechanics, physicsCodes.electricity_and_magnetism, physicsCodes.fluid_dynamics
]
export const managementSubjects = [
  managementCodes.accounting, managementCodes.accounting_tChart, managementCodes.business
]
export const csSubjects = [
  computerScienceCodes.ai, computerScienceCodes.app_dev, computerScienceCodes.assembly_language, computerScienceCodes.bi, computerScienceCodes.blockChain, computerScienceCodes.c_plus_plus, computerScienceCodes.c_sharp,
]

export const regexp_patterns = {
  email: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
}


export const email_data = {
  senderEmail: 'innathanak.dev@gmail.com',
  subject: 'Welcome to TutorX Platform',
  questionAcceptSubject: 'Your question is accepted',
  message: 'This is dummt message replace with given one',
  questionAcknowledgementEmail: "Hi, We received your question successfully, We will send a link to join to the chat room once tutor accept your question",
  questionAcceptEmail: "Hi, your question is accepted, this is dummy will change as requested",
  tutorSendQuote: "Hi, Tutor has sent a quote for you",
  tutorSendQuoteMessage: "Hello student, Tutor has sent a quote for you please approve that quote so you two can carry work",
  quoteApprovalMailToTutorSubject: "Quote approval",
  quoteApprovalMailToTutorMessage: "Hello tutor, A student have approved your quote",
  paymentSuccessMailSubjectToTutor: "You got a payment",
  paymentSuccessMailMessageToTutor: "Hello tutor, You got a new payment",
  paymentSuccessMailSubjectToStudent: "Payment Success",
  paymentSuccessMailMessageToStudent: "Your payment is successfull",
  failedSuccessMailSubjectToStudent: "Payment Failed",
  failedSuccessMailMessageToStudent: "Your payment was failed due to some reasons, Money is not deducted",
  questionAddMailNotLoggedUser: "Hi your questions is added to system, We will send you a link to join chat once tutor joined",


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

export const unAuthorizedKeywords = [
  'email', 'gmail'
];

export function getProgressDialogData() {
  return {
    width: '200px',
    // height: '400px',
    disableClose: true,
    panelClass: 'loading'
  };
}

