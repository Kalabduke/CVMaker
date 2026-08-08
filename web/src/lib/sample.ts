import type { ResumeSchema } from '../types/resume'
import { uid } from '../types/resume'

/** Seed sample — Kaleab's own CV, so the editor opens with a complete example. */
export const sampleResume = (): ResumeSchema => ({
  contact: {
    fullName: 'Kaleab Abduke',
    headline: 'IT Officer / Developer',
    email: 'kalabduke@gmail.com',
    phone: '+251 994 211 087',
    location: 'Signal, Addis Ababa, Ethiopia',
    website: '',
    linkedin: '',
    github: '',
    photoUrl: '',
  },
  summary:
    "I'm a fresh Computer Science graduate with a strong interest in frontend and mobile app development. I've built responsive websites and Android apps using React, Kotlin, and Jetpack Compose, with real projects like a diabetes prediction system, a photo editor, and a network monitoring tool. I'm known for picking up new technologies quickly, communicating well with teams, and working effectively with others. I'm excited about creating digital tools that are not only functional but also improve the user's experience. I'm eager to keep learning and growing as a frontend and Android developer.",
  experience: [
    {
      id: uid(),
      role: 'Summer Intern',
      company: 'INSA — Data Analysis Department',
      location: 'Addis Ababa, Ethiopia',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [
        'Worked inside the data analysis department as a summer intern.',
        'Developed the real-time network analysis system there.',
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: 'BSc in Computer Science',
      school: 'Dilla University',
      location: 'Dilla, Ethiopia',
      startDate: '2022',
      endDate: '2025',
      details: 'CGPA - 3.02 · Exit exam - 80/100',
    },
    {
      id: uid(),
      degree: 'Highschool',
      school: 'Saint Joseph School',
      location: '',
      startDate: '',
      endDate: '',
      details: '',
    },
  ],
  skills: [
    { id: uid(), name: 'React', level: 4 },
    { id: uid(), name: 'JavaScript', level: 4 },
    { id: uid(), name: 'HTML', level: 4 },
    { id: uid(), name: 'CSS', level: 4 },
    { id: uid(), name: 'Kotlin', level: 3 },
    { id: uid(), name: 'Python', level: 3 },
    { id: uid(), name: 'Linux (Ubuntu)', level: 3 },
    { id: uid(), name: 'Communication', level: 4 },
    { id: uid(), name: 'Problem Solving', level: 4 },
    { id: uid(), name: 'Team Collaboration', level: 4 },
    { id: uid(), name: 'Adaptability', level: 4 },
    { id: uid(), name: 'Learning New Skills', level: 4 },
    { id: uid(), name: 'Troubleshooting', level: 3 },
  ],
  projects: [
    {
      id: uid(),
      name: 'Diabetes Prediction System',
      description:
        "Created a web-based expert system to help doctors predict diabetes using machine learning. Focused on accurate data input and rule-based decisions. Won first place at final project exhibition.",
      link: '',
      tech: ['Machine Learning', 'Web'],
    },
    {
      id: uid(),
      name: 'Photo Editor Android App',
      description:
        'Developed an Android app using Kotlin and Jetpack Compose that allows users to crop, rotate, apply filters, and preview images in real-time. Also supports saving and sharing photos.',
      link: '',
      tech: ['Kotlin', 'Jetpack Compose'],
    },
    {
      id: uid(),
      name: 'Real-Time Network Analysis System',
      description:
        'Built a network analysis system using Packetbeat, Apache Kafka, Spark, and Elasticsearch to detect and visualize real-time network activity in Kibana.',
      link: '',
      tech: ['Packetbeat', 'Kafka', 'Spark', 'Elasticsearch', 'Kibana'],
    },
  ],
  languages: [
    { id: uid(), name: 'Amharic', proficiency: 'Native' },
    { id: uid(), name: 'English', proficiency: 'Fluent' },
  ],
  custom: [
    {
      id: uid(),
      title: 'Certificates',
      items: [
        'Final Project Exhibition — Diabetes Prediction System awarded 1st place.',
        'University Volunteer Service — worked with Zero-Plan platform to create sexual health awareness and reduce dropout in the university.',
      ],
    },
  ],
})
