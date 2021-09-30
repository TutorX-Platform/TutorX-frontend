export const fileUploadLimit = 30000 * 1000;
export const backend_url = "https://sandunapi.tk";
export const time_url = "http://worldtimeapi.org/api/timezone/America/Argentina/Salta";

export const env_url = {
  heroku_url: 'https://sandunapi.tk/',
  local_url: 'http://localhost:4200/',
  prod_url: 'https://tutetory.com'
}

export const system_name = 'Tutetory';

export const system_image = '';

export const dummyChatId = 'Q936d4c46-3a30-4f17-b2ce-aa53d8c3af37';

export const dummy_profile_picture = 'assets/images/default_profile.png';

export const logo = 'assets/images/logo.svg';

export const usedCurrency = 'USD';

export const firebase_notification_url = 'https://fcm.googleapis.com/fcm/send';

export const tutor_pay_percentage = 0.6;

export const firebase_notification_auth_key = 'key=AAAAS6ME818:APA91bEkBpMvrUGgRj2rVOSxJHAVNGFHJag3q1wod_Kasj9U8RsFWgbJnsorf3WxxWyEI97QZ2CWF8bCyxQmn9Y1MIUIG1AC1cnRgLFts9HsDnYD_AcekWgKaaJLG0jSed1BPBpnPXtz'

export const refundMessages = {
  dummy: "dummy refund request message"
}

export const payStatus = {
  success: 'success',
  failed: 'failed',
}

export const backend_api_resource = {
  payment: '/payment/',
  email: '/email/',
  time: '/time/',
  question: '/question',
  validate: '/validate',
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
  payments: 'payment',
  refund: 'refund',
  tokens: 'tokens',
  chatTyping: 'typing',
  stat: 'stats',
  tutorEarnings: 'earnings',

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
  prefixQuestionNumber: 'QN',
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
  home: "/home",
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
  paySuccess: '/pay-success',
  add_question_mobile: '/add-question'
}

export const localStorageKeys = {
  user: 'user',
  role: 'role',
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
app_development: 'App Development',
artificial_intelligence: 'Artificial Intelligence',
assembly_language: 'Assembly Language',
blockchain: 'Blockchain',
cpp_programming: 'C++ Programming',
csharp_programming: 'C# Programming',
cryptography: 'Cryptography',
data_structures: 'Data Structures',
algorithms: 'Algorithms',
database_management: 'Database Management',
digital_electronics: 'Digital Electronics',
discrete_math: 'Discrete Math',
information_security: 'Information Security',
information_theory: 'Information Theory',
java_programming: 'Java Programming',
javascript_programming: 'JavaScript Programming',
linux: 'Linux',
machine_learning: 'Machine Learning',
matlab_programing: 'MATLAB Programing',
microsoft_net_framework: 'Microsoft .NET Framework',
networking_and_data_communication: 'Networking and Data Communication',
operating_systems: 'Operating Systems',
parallel_computing: 'Parallel Computing',
perl_programming: 'Perl Programming',
python_programming: 'Python Programming',
ruby_programming: 'Ruby Programming',
software_engineering_and_design: 'Software Engineering and Design',
software_testing_and_analysis: 'Software Testing and Analysis',
theoretical_computer_science: 'Theoretical Computer Science',
web_development: 'Web Development',
image_processing: 'Image Processing',
natural_language_processing: 'Natural Language Processing'
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
  computerScienceCodes.app_development,computerScienceCodes.artificial_intelligence,computerScienceCodes.assembly_language,computerScienceCodes.blockchain,computerScienceCodes.cpp_programming,computerScienceCodes.csharp_programming,computerScienceCodes.cryptography,computerScienceCodes.data_structures,computerScienceCodes.algorithms,computerScienceCodes.database_management,computerScienceCodes.digital_electronics,computerScienceCodes.discrete_math,computerScienceCodes.information_security,computerScienceCodes.information_theory,computerScienceCodes.java_programming,computerScienceCodes.javascript_programming,computerScienceCodes.linux,computerScienceCodes.machine_learning,computerScienceCodes.matlab_programing,computerScienceCodes.microsoft_net_framework,computerScienceCodes.networking_and_data_communication,computerScienceCodes.operating_systems,computerScienceCodes.parallel_computing,computerScienceCodes.perl_programming,computerScienceCodes.python_programming,computerScienceCodes.ruby_programming,computerScienceCodes.software_engineering_and_design,computerScienceCodes.software_testing_and_analysis,computerScienceCodes.theoretical_computer_science,computerScienceCodes.web_development,computerScienceCodes.image_processing,computerScienceCodes.natural_language_processing
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
    // width: '200px',
    disableClose: true,
    hasBackdrop: false,
    panelClass: 'dialog-container-custom'
  };
}

