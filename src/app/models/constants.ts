export const fileUploadLimit = 30000 * 1000;
export const backend_url = "https://sandunapi.tk";
export const time_url = "http://worldtimeapi.org/api/timezone/America/Argentina/Salta";
export const adminEmail = "tharindu.prf@gmail.com"

export const env_url = {
  heroku_url: 'https://sandunapi.tk/',
  local_url: 'http://localhost:4200/',
  prod_url: 'https://tutetory.com',
  local_backend_url: 'http://localhost:5000'
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
  email: '/mail/',
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
  notifications: 'notifications',
  utils: 'utils'

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
  payment: '/payment',
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
  engineering: 'Engineering',
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
  autocad: 'AutoCAD',
  chemical_engineering: 'Chemical Engineering',
  circuit_analysis: 'Circuit Analysis',
  civil_engineering: 'Civil Engineering',
  communication_engineering: 'Communication Engineering',
  digital_electronics: 'Digital Electronics',
  dynamics_controls: 'Dynamics & Controls',
  electrical_engineering: 'Electrical Engineering',
  electronics: 'Electronics',
  energy_systems_engineering: 'Energy Systems Engineering',
  engineering_other: 'Engineering - Other',
  environmental_engineering: 'Environmental Engineering',
  food_engineering: 'Food Engineering',
  hydrodynamics: 'Hydrodynamics',
  image_processing: 'Image Processing',
  industrial_engineering: 'Industrial Engineering',
  marine_engineering: 'Marine Engineering',
  materials_science: 'Materials Science',
  matlab_for_engineering: 'MATLAB for Engineering',
  mechanical_engineering: 'Mechanical Engineering',
  networking_and_data_communication: 'Networking and Data Communication',
  nuclear_engineering: 'Nuclear Engineering',
  petroleum_engineering: 'Petroleum Engineering',
  power_system_engineering: 'Power System Engineering',
  radar_and_antennas: 'Radar and Antennas',
  robotics_automation: 'Robotics & Automation',
  solidworks: 'SolidWorks',
  structural_engineering: 'Structural Engineering',
  systems_engineering: 'Systems Engineering',
  thermodynamics: 'Thermodynamics'
}

export const mathematicsCodes = {
  abstract_algebra: 'Abstract Algebra',
  actuarial_science: 'Actuarial Science',
  advanced_math: 'Advanced Math',
  advanced_statistics: 'Advanced Statistics',
  algebra: 'Algebra',
  algebraic_geometry: 'Algebraic Geometry',
  applied_statistics: 'Applied Statistics',
  basic_math: 'Basic Math',
  calculus: 'Calculus',
  combinatorics: 'Combinatorics',
  complex_analysis: 'Complex Analysis',
  control_theory: 'Control Theory',
  decision_theory: 'Decision Theory',
  differential_equations: 'Differential Equations',
  differential_geometry: 'Differential Geometry',
  discrete_math: 'Discrete Math',
  dynamical_systems: 'Dynamical Systems',
  ergodic_theory: 'Ergodic Theory',
  functional_analysis: 'Functional Analysis',
  game_theory: 'Game Theory',
  general_statistics: 'General Statistics',
  geometry: 'Geometry',
  integral_equations: 'Integral Equations',
  linear_algebra: 'Linear Algebra',
  math_logic: 'Math Logic',
  mathematics_other: 'Mathematics - Other',
  matlab_for_mathematics: 'MATLAB for Mathematics',
  measure_theory: 'Measure Theory',
  number_theory: 'Number Theory',
  numerical_analysis: 'Numerical Analysis',
  operations_research: 'Operations Research',
  perturbation_methods: 'Perturbation Methods',
  precalculus: 'Pre-Calculus',
  probability: 'Probability',
  queuing_theory: 'Queuing Theory',
  real_analysis: 'Real Analysis',
  set_theory: 'Set Theory',
  signal_processing: 'Signal Processing',
  statisticsr_programming: 'Statistics-R Programming',
  topology: 'Topology',
  trigonometry: 'Trigonometry'

}
export const physicsCodes = {
  astrophysics: 'Astrophysics',
  chaos_theory: 'Chaos Theory',
  classical_mechanics: 'Classical Mechanics',
  electricity_and_magnetism: 'Electricity and Magnetism',
  fluid_dynamics: 'Fluid Dynamics',
  general_physics: 'General Physics',
  gravitation: 'Gravitation',
  mathematical_physics: 'Mathematical Physics',
  matlab_for_physics: 'MATLAB for Physics',
  nanotechnology: 'Nanotechnology',
  nuclear_physics: 'Nuclear Physics',
  optoelectronics: 'Optoelectronics',
  physics_other: 'Physics - Other',
  quantum_physics: 'Quantum Physics',
  relativity: 'Relativity',
  semiconductor_physics: 'Semiconductor Physics',
  thermodynamics: 'Thermodynamics'

}
export const managementCodes = {
  accounting: 'Accounting',
  business_law_corporate_law: 'Business Law & Corporate Law',
  business_studies: 'Business Studies',
  corporate_governance_ethics: 'Corporate Governance & Ethics',
  economics: 'Economics',
  entrepreneurship: 'Entrepreneurship',
  financial_management: 'Financial Management',
  human_resource_management: 'Human Resource Management',
  information_management: 'Information Management',
  international_business: 'International Business',
  leadership: 'Leadership',
  marketing_management: 'Marketing Management',
  organizational_behaviour: 'Organizational Behaviour',
  principles_of_management: 'Principles of Management',
  project_management: 'Project Management',
  risk_management: 'Risk Management',
  strategic_management: 'Strategic Management'
}

export const subjects = [
  subjectCodes.mathematics, subjectCodes.engineering, subjectCodes.computer_science, subjectCodes.physics, subjectCodes.management
];

export const mathsSubjects = [
  mathematicsCodes.abstract_algebra, mathematicsCodes.actuarial_science, mathematicsCodes.advanced_math, mathematicsCodes.advanced_statistics, mathematicsCodes.algebra, mathematicsCodes.algebraic_geometry, mathematicsCodes.applied_statistics, mathematicsCodes.basic_math, mathematicsCodes.calculus, mathematicsCodes.combinatorics, mathematicsCodes.complex_analysis, mathematicsCodes.control_theory, mathematicsCodes.decision_theory, mathematicsCodes.differential_equations, mathematicsCodes.differential_geometry, mathematicsCodes.discrete_math, mathematicsCodes.dynamical_systems, mathematicsCodes.ergodic_theory, mathematicsCodes.functional_analysis, mathematicsCodes.game_theory, mathematicsCodes.general_statistics, mathematicsCodes.geometry, mathematicsCodes.integral_equations, mathematicsCodes.linear_algebra, mathematicsCodes.math_logic, mathematicsCodes.mathematics_other, mathematicsCodes.matlab_for_mathematics, mathematicsCodes.measure_theory, mathematicsCodes.number_theory, mathematicsCodes.numerical_analysis, mathematicsCodes.operations_research, mathematicsCodes.perturbation_methods, mathematicsCodes.precalculus, mathematicsCodes.probability, mathematicsCodes.queuing_theory, mathematicsCodes.real_analysis, mathematicsCodes.set_theory, mathematicsCodes.signal_processing, mathematicsCodes.statisticsr_programming, mathematicsCodes.topology, mathematicsCodes.trigonometry,
]
export const engineeringSubjects = [
  engineeringCodes.autocad, engineeringCodes.chemical_engineering, engineeringCodes.circuit_analysis, engineeringCodes.civil_engineering, engineeringCodes.communication_engineering, engineeringCodes.digital_electronics, engineeringCodes.dynamics_controls, engineeringCodes.electrical_engineering, engineeringCodes.electronics, engineeringCodes.energy_systems_engineering, engineeringCodes.engineering_other, engineeringCodes.environmental_engineering, engineeringCodes.food_engineering, engineeringCodes.hydrodynamics, engineeringCodes.image_processing, engineeringCodes.industrial_engineering, engineeringCodes.marine_engineering, engineeringCodes.materials_science, engineeringCodes.matlab_for_engineering, engineeringCodes.mechanical_engineering, engineeringCodes.networking_and_data_communication, engineeringCodes.nuclear_engineering, engineeringCodes.petroleum_engineering, engineeringCodes.power_system_engineering, engineeringCodes.radar_and_antennas, engineeringCodes.robotics_automation, engineeringCodes.solidworks, engineeringCodes.structural_engineering, engineeringCodes.systems_engineering, engineeringCodes.thermodynamics
]

export const physicsSubjects = [
  physicsCodes.astrophysics, physicsCodes.chaos_theory, physicsCodes.classical_mechanics, physicsCodes.electricity_and_magnetism, physicsCodes.fluid_dynamics, physicsCodes.general_physics, physicsCodes.gravitation, physicsCodes.mathematical_physics, physicsCodes.matlab_for_physics, physicsCodes.nanotechnology, physicsCodes.nuclear_physics, physicsCodes.optoelectronics, physicsCodes.physics_other, physicsCodes.quantum_physics, physicsCodes.relativity, physicsCodes.semiconductor_physics, physicsCodes.thermodynamics,
]
export const managementSubjects = [
  managementCodes.accounting, managementCodes.business_law_corporate_law, managementCodes.business_studies, managementCodes.corporate_governance_ethics, managementCodes.economics, managementCodes.entrepreneurship, managementCodes.financial_management, managementCodes.human_resource_management, managementCodes.information_management, managementCodes.international_business, managementCodes.leadership, managementCodes.marketing_management, managementCodes.organizational_behaviour, managementCodes.principles_of_management, managementCodes.project_management, managementCodes.risk_management, managementCodes.strategic_management
]
export const csSubjects = [
  computerScienceCodes.app_development, computerScienceCodes.artificial_intelligence, computerScienceCodes.assembly_language, computerScienceCodes.blockchain, computerScienceCodes.cpp_programming, computerScienceCodes.csharp_programming, computerScienceCodes.cryptography, computerScienceCodes.data_structures, computerScienceCodes.algorithms, computerScienceCodes.database_management, computerScienceCodes.digital_electronics, computerScienceCodes.discrete_math, computerScienceCodes.information_security, computerScienceCodes.information_theory, computerScienceCodes.java_programming, computerScienceCodes.javascript_programming, computerScienceCodes.linux, computerScienceCodes.machine_learning, computerScienceCodes.matlab_programing, computerScienceCodes.microsoft_net_framework, computerScienceCodes.networking_and_data_communication, computerScienceCodes.operating_systems, computerScienceCodes.parallel_computing, computerScienceCodes.perl_programming, computerScienceCodes.python_programming, computerScienceCodes.ruby_programming, computerScienceCodes.software_engineering_and_design, computerScienceCodes.software_testing_and_analysis, computerScienceCodes.theoretical_computer_science, computerScienceCodes.web_development, computerScienceCodes.image_processing, computerScienceCodes.natural_language_processing
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

export const mailTemplates = {
  suspiciousMsg: 'admin-suspisious-message.handlebars',
  newRequest: 'new-request.handlebars',
  questionComplete: 'question-complete.handlebars',
  studentNewQuestion: 'student-new-question.handlebars',
  tutorNewQuestion: 'tutor-new-request.handlebars',
  welcome: 'welcome.handlebars',
  tutorJoin: 'tutor-join.handlebars',
  refundRequest: 'refund-request.handlebars',
  deadlineChange: 'deadline-change.handlebars'
}

export function getSuspisiousMessageReplacement(requestId: string, chatLink: string) {
  return {
    requestId: requestId,
    chatLink: chatLink,
  }
}

export function getNewRequest(requestId: string, questionTitle: string, name: string) {
  return {
    requestId: requestId,
    name: name,
    questionTitle: questionTitle,
  }
}

export function getCompleteRequest(requestId: string, questionTitle: string, name: string) {
  return {
    name: name,
  }
}

export function getStudentNewQuestion(questionLink: string, name: string) {
  return {
    name: name,
    questionLink: questionLink,
  }
}

export function getTutorNewQuestion(questionTitle: string, name: string, requestId: string) {
  return {
    name: name,
    questionTitle: questionTitle,
    requestId: requestId,
  }
}

export function getWelcomeQuestion(name: string) {
  return {
    name: name,
  }
}

export function getRefundRequest(requestId: string) {
  return {
    requestId: requestId,
  }
}

export function getTutorJoinRequest(name: string, tutorName: string) {
  return {
    name: name,
    tutorName: tutorName,
  }
}

export function getDeadlineChange(requestId: string) {
  return {
    requestId: requestId,
  }
}


export function getProgressDialogData() {
  return {
    // width: '200px',
    disableClose: true,
    hasBackdrop: false,
    panelClass: 'dialog-container-custom'
  };
}

