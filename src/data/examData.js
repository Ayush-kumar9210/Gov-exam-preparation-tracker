// src/data/examData.js

export const EXAMS = {
  SSC_CGL: {
    id: "SSC_CGL",
    name: "SSC CGL",
    fullName: "Staff Selection Commission - Combined Graduate Level",
    color: "#f97316",
    icon: "🏛️",
    tiers: {
      Tier1: {
        name: "Tier I",
        subjects: {
          GeneralIntelligence: {
            name: "General Intelligence & Reasoning",
            topics: [
              "Analogy", "Classification", "Series", "Coding-Decoding",
              "Blood Relations", "Direction & Distance", "Order & Ranking",
              "Puzzle", "Syllogism", "Non-Verbal Reasoning", "Venn Diagrams",
              "Statement & Conclusions", "Matrix", "Word Formation"
            ]
          },
          GeneralAwareness: {
            name: "General Awareness",
            topics: [
              "History", "Geography", "Polity", "Economics", "Science",
              "Current Affairs", "Static GK", "Sports", "Awards & Honours",
              "Books & Authors", "Important Days", "Govt Schemes"
            ]
          },
          QuantAptitude: {
            name: "Quantitative Aptitude",
            topics: [
              "Number System", "HCF & LCM", "Simplification", "Percentage",
              "Profit & Loss", "Ratio & Proportion", "Time & Work",
              "Time Speed Distance", "Simple Interest", "Compound Interest",
              "Algebra", "Geometry", "Mensuration", "Trigonometry",
              "Statistics", "Data Interpretation"
            ]
          },
          English: {
            name: "English Comprehension",
            topics: [
              "Reading Comprehension", "Cloze Test", "Para Jumbles",
              "Sentence Improvement", "Error Detection", "Fill in the Blanks",
              "Synonyms", "Antonyms", "One Word Substitution",
              "Idioms & Phrases", "Spelling Errors"
            ]
          }
        }
      },
      Tier2: {
        name: "Tier II",
        subjects: {
          Math: {
            name: "Mathematical Abilities",
            topics: [
              "Advanced Algebra", "Advanced Geometry", "Advanced Trigonometry",
              "Advanced Mensuration", "Advanced Statistics", "Advanced DI",
              "Number Theory", "Coordinate Geometry"
            ]
          },
          English: {
            name: "English Language & Comprehension",
            topics: [
              "Advanced Grammar", "Advanced Comprehension", "Vocabulary",
              "Essay Writing", "Letter Writing", "Precis Writing"
            ]
          },
          ComputerKnowledge: {
            name: "Computer Knowledge",
            topics: [
              "Computer Basics", "MS Office", "Internet", "Networking",
              "Database Basics", "Cybersecurity Basics", "Operating Systems"
            ]
          }
        }
      }
    }
  },

  SSC_CHSL: {
    id: "SSC_CHSL",
    name: "SSC CHSL",
    fullName: "Staff Selection Commission - Combined Higher Secondary Level",
    color: "#8b5cf6",
    icon: "📋",
    tiers: {
      Tier1: {
        name: "Tier I",
        subjects: {
          GeneralIntelligence: {
            name: "General Intelligence & Reasoning",
            topics: [
              "Analogy", "Classification", "Series", "Coding-Decoding",
              "Blood Relations", "Direction & Distance", "Puzzle",
              "Syllogism", "Non-Verbal Reasoning", "Venn Diagrams"
            ]
          },
          GeneralAwareness: {
            name: "General Awareness",
            topics: [
              "History", "Geography", "Polity", "Economics", "Science",
              "Current Affairs", "Static GK", "Sports"
            ]
          },
          QuantAptitude: {
            name: "Quantitative Aptitude",
            topics: [
              "Number System", "Percentage", "Profit & Loss",
              "Ratio & Proportion", "Time & Work", "Time Speed Distance",
              "Simple Interest", "Compound Interest", "Geometry",
              "Mensuration", "Trigonometry", "Data Interpretation"
            ]
          },
          English: {
            name: "English",
            topics: [
              "Reading Comprehension", "Sentence Improvement",
              "Error Detection", "Fill in the Blanks",
              "Synonyms & Antonyms", "Idioms & Phrases"
            ]
          }
        }
      },
      Tier2: {
        name: "Tier II",
        subjects: {
          SkillTest: {
            name: "Skill Test / Typing",
            topics: ["Typing Speed", "Data Entry Speed", "Skill Test Practice"]
          },
          English: {
            name: "English Language",
            topics: [
              "Grammar Rules", "Comprehension", "Vocabulary",
              "Letter Writing", "Essay Writing"
            ]
          }
        }
      }
    }
  },

  RAILWAY_NTPC: {
    id: "RAILWAY_NTPC",
    name: "Railway NTPC",
    fullName: "Railway Non-Technical Popular Categories",
    color: "#06b6d4",
    icon: "🚂",
    tiers: {
      CBT1: {
        name: "CBT Stage 1",
        subjects: {
          Mathematics: {
            name: "Mathematics",
            topics: [
              "Number System", "Decimals & Fractions", "LCM & HCF",
              "Ratio & Proportion", "Percentage", "Mensuration",
              "Time & Work", "Time & Distance", "Simple & Compound Interest",
              "Profit & Loss", "Elementary Algebra", "Geometry & Trigonometry",
              "Elementary Statistics"
            ]
          },
          GeneralAwareness: {
            name: "General Awareness",
            topics: [
              "Current Events", "Indian Geography", "Indian History",
              "Indian Polity", "Economics", "Science & Technology",
              "Sports", "Awards", "Books & Authors", "Railway GK",
              "Important Days", "Art & Culture"
            ]
          },
          GeneralIntelligence: {
            name: "General Intelligence & Reasoning",
            topics: [
              "Analogies", "Number & Alphabetical Series",
              "Coding-Decoding", "Mathematical Operations",
              "Relationships", "Syllogism", "Jumbling",
              "Venn Diagram", "Data Interpretation", "Statement-Conclusion",
              "Similarities & Differences", "Analytical Reasoning"
            ]
          }
        }
      },
      CBT2: {
        name: "CBT Stage 2",
        subjects: {
          Mathematics: {
            name: "Mathematics",
            topics: [
              "Advanced Number System", "Advanced Algebra",
              "Advanced Geometry", "Advanced Mensuration",
              "Advanced Statistics", "Advanced DI"
            ]
          },
          GeneralAwareness: {
            name: "General Science & Awareness",
            topics: [
              "Physics", "Chemistry", "Biology",
              "Computer & Information Technology", "Advanced Current Affairs"
            ]
          },
          GeneralIntelligence: {
            name: "General Intelligence",
            topics: [
              "Advanced Reasoning", "Critical Thinking",
              "Decision Making", "Problem Solving"
            ]
          }
        }
      }
    }
  },

  BANK_PO: {
    id: "BANK_PO",
    name: "Bank PO",
    fullName: "Bank Probationary Officer (IBPS PO / SBI PO)",
    color: "#10b981",
    icon: "🏦",
    tiers: {
      Prelims: {
        name: "Preliminary Exam",
        subjects: {
          English: {
            name: "English Language",
            topics: [
              "Reading Comprehension", "Cloze Test", "Para Jumbles",
              "Error Detection", "Sentence Improvement", "Fill in the Blanks",
              "Word Swap", "Sentence Completion"
            ]
          },
          QuantAptitude: {
            name: "Quantitative Aptitude",
            topics: [
              "Number Series", "Data Interpretation", "Simplification",
              "Quadratic Equations", "Percentage", "Profit & Loss",
              "Time & Work", "Time Speed Distance", "Probability",
              "Permutation & Combination", "Simple & Compound Interest",
              "Boats & Streams", "Mixture & Allegation"
            ]
          },
          Reasoning: {
            name: "Reasoning Ability",
            topics: [
              "Puzzles", "Seating Arrangement", "Syllogism",
              "Inequality", "Coding-Decoding", "Blood Relations",
              "Direction & Distance", "Order & Ranking",
              "Input-Output", "Data Sufficiency", "Alpha-Numeric Series"
            ]
          }
        }
      },
      Mains: {
        name: "Mains Exam",
        subjects: {
          English: {
            name: "English Language",
            topics: [
              "Advanced Reading Comprehension", "Grammar",
              "Vocabulary", "Essay Writing", "Letter Writing",
              "Paragraph Writing"
            ]
          },
          DataAnalysis: {
            name: "Data Analysis & Interpretation",
            topics: [
              "Advanced DI", "Caselets", "Mixed Graph DI",
              "Data Sufficiency", "Probability", "Statistics"
            ]
          },
          Reasoning: {
            name: "Reasoning & Computer Aptitude",
            topics: [
              "Advanced Puzzles", "Advanced Seating Arrangement",
              "Logical Reasoning", "Critical Reasoning",
              "Computer Knowledge", "Networking Basics"
            ]
          },
          GeneralAwareness: {
            name: "General/Economy/Banking Awareness",
            topics: [
              "Banking Awareness", "Financial Awareness",
              "Current Affairs", "Govt Schemes", "RBI Policies",
              "Budget & Economy", "International Organizations"
            ]
          }
        }
      }
    }
  },

  BANK_CLERK: {
    id: "BANK_CLERK",
    name: "Bank Clerk",
    fullName: "Bank Clerk (IBPS Clerk / SBI Clerk)",
    color: "#f59e0b",
    icon: "💼",
    tiers: {
      Prelims: {
        name: "Preliminary Exam",
        subjects: {
          English: {
            name: "English Language",
            topics: [
              "Reading Comprehension", "Cloze Test",
              "Error Detection", "Fill in the Blanks",
              "Para Jumbles", "Sentence Improvement"
            ]
          },
          QuantAptitude: {
            name: "Quantitative Aptitude",
            topics: [
              "Number Series", "Simplification", "Data Interpretation",
              "Percentage", "Profit & Loss", "Time & Work",
              "Time Speed Distance", "Simple Interest", "Compound Interest"
            ]
          },
          Reasoning: {
            name: "Reasoning Ability",
            topics: [
              "Puzzles", "Seating Arrangement", "Syllogism",
              "Inequality", "Coding-Decoding", "Blood Relations",
              "Alphabetical Series", "Direction Test"
            ]
          }
        }
      },
      Mains: {
        name: "Mains Exam",
        subjects: {
          English: {
            name: "General English",
            topics: [
              "Advanced Reading Comprehension", "Error Detection",
              "Vocabulary", "Sentence Rearrangement"
            ]
          },
          QuantAptitude: {
            name: "Quantitative Aptitude",
            topics: [
              "Advanced DI", "Advanced Simplification",
              "Number Series", "Miscellaneous Arithmetic"
            ]
          },
          Reasoning: {
            name: "Reasoning Ability & Computer Aptitude",
            topics: [
              "Advanced Puzzles", "Logical Reasoning",
              "Computer Basics", "MS Office", "Internet"
            ]
          },
          GeneralAwareness: {
            name: "General/Financial Awareness",
            topics: [
              "Banking Knowledge", "Current Affairs",
              "Financial Awareness", "Static GK", "Govt Schemes"
            ]
          }
        }
      }
    }
  },

  UPSC: {
    id: "UPSC",
    name: "UPSC CSE",
    fullName: "Union Public Service Commission - Civil Services Examination",
    color: "#dc2626",
    icon: "🎖️",
    tiers: {
      Prelims: {
        name: "Preliminary Exam (GS Paper I & CSAT)",
        subjects: {
          GS1: {
            name: "General Studies Paper I",
            topics: [
              "Ancient History", "Medieval History", "Modern History",
              "Indian Art & Culture", "World History",
              "Indian & World Geography", "Indian Polity & Constitution",
              "Indian Economy", "Environment & Ecology",
              "Science & Technology", "Current Affairs"
            ]
          },
          CSAT: {
            name: "CSAT (Paper II)",
            topics: [
              "Reading Comprehension", "Interpersonal Skills",
              "Logical Reasoning", "Analytical Ability",
              "Decision Making", "General Mental Ability",
              "Basic Numeracy", "Data Interpretation",
              "English Language Comprehension"
            ]
          }
        }
      },
      Mains: {
        name: "Mains Exam",
        subjects: {
          Essay: {
            name: "Essay",
            topics: ["Essay Writing Techniques", "Essay Practice - Social", "Essay Practice - Political", "Essay Practice - Economic"]
          },
          GS1: {
            name: "GS Paper I",
            topics: [
              "Indian Heritage & Culture", "History & Geography of World",
              "Society", "Post-Independence India"
            ]
          },
          GS2: {
            name: "GS Paper II (Polity, Governance, IR)",
            topics: [
              "Indian Constitution", "Parliament & State Legislatures",
              "Executive & Judiciary", "Governance & Public Policy",
              "Social Justice", "International Relations"
            ]
          },
          GS3: {
            name: "GS Paper III (Economy, Science, Security)",
            topics: [
              "Indian Economy & Development", "Agriculture", "Infrastructure",
              "Science & Technology", "Environment", "Disaster Management",
              "Security Issues", "Internal Security"
            ]
          },
          GS4: {
            name: "GS Paper IV (Ethics)",
            topics: [
              "Ethics & Human Interface", "Attitude", "Aptitude & Foundational Values",
              "Emotional Intelligence", "Contributions of Moral Thinkers",
              "Public/Civil Service Values", "Probity in Governance",
              "Case Studies"
            ]
          }
        }
      }
    }
  },

  CTET: {
    id: "CTET",
    name: "CTET",
    fullName: "Central Teacher Eligibility Test",
    color: "#7c3aed",
    icon: "📚",
    tiers: {
      Paper1: {
        name: "Paper I (Class 1-5)",
        subjects: {
          ChildDevelopment: {
            name: "Child Development & Pedagogy",
            topics: [
              "Child Development Concepts", "Learning & Pedagogy",
              "Inclusive Education", "Understanding Diverse Learners",
              "Child Centered Education", "Constructivism",
              "Assessment for Learning"
            ]
          },
          Language1: {
            name: "Language I (Hindi/English)",
            topics: [
              "Language Comprehension", "Grammar",
              "Pedagogy of Language Development", "Reading Skills",
              "Writing Skills", "Literature"
            ]
          },
          Language2: {
            name: "Language II (English/Hindi)",
            topics: [
              "Comprehension Passages", "Grammar & Verbal Ability",
              "Language Pedagogy", "Communicative Approach"
            ]
          },
          Mathematics: {
            name: "Mathematics",
            topics: [
              "Number System", "Shapes & Spatial Understanding",
              "Addition & Subtraction", "Multiplication & Division",
              "Data Handling", "Measurement", "Pedagogical Issues in Math"
            ]
          },
          EVS: {
            name: "Environmental Studies",
            topics: [
              "Family & Friends", "Food", "Shelter", "Water", "Travel",
              "Things We Make & Do", "Pedagogical Issues in EVS"
            ]
          }
        }
      },
      Paper2: {
        name: "Paper II (Class 6-8)",
        subjects: {
          ChildDevelopment: {
            name: "Child Development & Pedagogy",
            topics: [
              "Adolescent Development", "Learning Theories",
              "Motivation & Learning", "Individual Differences",
              "Assessment Strategies"
            ]
          },
          Language1: {
            name: "Language I",
            topics: [
              "Language Comprehension", "Advanced Grammar",
              "Language Pedagogy", "Literature"
            ]
          },
          Language2: {
            name: "Language II",
            topics: [
              "Reading Comprehension", "Grammar", "Language Pedagogy"
            ]
          },
          MathScience: {
            name: "Mathematics & Science",
            topics: [
              "Advanced Number System", "Algebra", "Geometry",
              "Food & Nutrition", "Materials", "The World of Living",
              "Moving Things & Energy", "Natural Phenomena"
            ]
          }
        }
      }
    }
  },

  POLICE: {
    id: "POLICE",
    name: "Police Exam",
    fullName: "State Police Constable / Sub-Inspector",
    color: "#1d4ed8",
    icon: "👮",
    tiers: {
      Written: {
        name: "Written Exam",
        subjects: {
          GeneralKnowledge: {
            name: "General Knowledge",
            topics: [
              "History", "Geography", "Polity", "Economics",
              "Science", "Current Affairs", "State GK",
              "Sports", "Awards", "Important Days"
            ]
          },
          GeneralHindi: {
            name: "General Hindi / Language",
            topics: [
              "Grammar", "Comprehension", "Vocabulary",
              "Synonyms & Antonyms", "Fill in the Blanks",
              "Letter Writing", "Essay Writing"
            ]
          },
          GeneralIntelligence: {
            name: "General Intelligence",
            topics: [
              "Verbal Reasoning", "Non-Verbal Reasoning",
              "Analogies", "Series", "Coding-Decoding",
              "Puzzles", "Blood Relations", "Direction Test"
            ]
          },
          NumericalAbility: {
            name: "Numerical & Mental Ability",
            topics: [
              "Number System", "Percentage", "Ratio & Proportion",
              "Profit & Loss", "Time & Work",
              "Time Speed Distance", "Mensuration", "DI"
            ]
          }
        }
      },
      Physical: {
        name: "Physical Test",
        subjects: {
          Physical: {
            name: "Physical Fitness",
            topics: [
              "Running Practice", "Long Jump Training",
              "High Jump Training", "Shot Put Practice",
              "Medical Standards", "Document Preparation"
            ]
          }
        }
      }
    }
  }
};

export const getAllTopicsForExam = (examId, tier = null) => {
  const exam = EXAMS[examId];
  if (!exam) return [];
  const topics = [];
  const tiers = tier ? { [tier]: exam.tiers[tier] } : exam.tiers;
  Object.entries(tiers).forEach(([tierId, tierData]) => {
    Object.entries(tierData.subjects).forEach(([subjectId, subjectData]) => {
      subjectData.topics.forEach(topic => {
        topics.push({ examId, tierId, subjectId, topic, id: `${examId}__${tierId}__${subjectId}__${topic}` });
      });
    });
  });
  return topics;
};