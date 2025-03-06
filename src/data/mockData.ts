
export interface Prompt {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  copyCount: number;
  reactions: Record<string, number>;
}

export const mockPrompts: Prompt[] = [
  {
    id: "1",
    title: "Clean Code Refactoring Assistant",
    description: "A comprehensive prompt for refactoring messy code into clean, maintainable patterns following best practices.",
    code: `I want you to act as a senior software developer. I'll provide you with code that needs refactoring. Please analyze it and suggest improvements focusing on:
1. Readability and maintainability
2. Design patterns and SOLID principles
3. Performance optimizations
4. Error handling
5. Best practices specific to the language

For each suggestion, explain your reasoning and provide example code.`,
    category: "Development",
    copyCount: 1245,
    reactions: {
      like: 432,
      love: 215,
      smile: 98,
      save: 324
    }
  },
  {
    id: "2",
    title: "Full-Stack Architecture Designer",
    description: "Generate comprehensive architecture plans for full-stack applications with detailed component breakdowns.",
    code: `Act as a solutions architect to help me design a full-stack application. I'll describe my requirements for [APPLICATION TYPE].

Please provide:
1. A high-level architecture diagram (describe in text)
2. Recommended tech stack with justification
3. Database schema design
4. API endpoints structure
5. Frontend component hierarchy
6. Security considerations
7. Scalability recommendations
8. Potential challenges and solutions

My application needs to: [DESCRIBE APPLICATION REQUIREMENTS]`,
    category: "Development",
    copyCount: 987,
    reactions: {
      like: 321,
      love: 187,
      smile: 76,
      save: 250
    }
  },
  {
    id: "3",
    title: "Data Analysis Framework",
    description: "A structured prompt for comprehensive data analysis with visualization and statistical insights.",
    code: `As a data scientist, analyze this dataset with the following approach:

1. Data Understanding:
   - Summarize the key variables and their relationships
   - Identify potential quality issues

2. Exploratory Analysis:
   - Compute descriptive statistics
   - Create visualizations to show key distributions and correlations
   - Identify outliers and patterns

3. Feature Engineering:
   - Suggest transformations and new features
   - Handle missing values and outliers

4. Modeling Approach:
   - Recommend algorithms suitable for this data
   - Evaluation metrics and validation strategies

5. Business Insights:
   - Actionable takeaways from the analysis
   - Areas for further investigation

Here's my dataset description: [DATASET DESCRIPTION]`,
    category: "Data Analysis",
    copyCount: 874,
    reactions: {
      like: 298,
      love: 142,
      smile: 56,
      save: 221
    }
  },
  {
    id: "4",
    title: "Technical Documentation Generator",
    description: "Create detailed technical documentation for code, APIs, or systems with comprehensive examples.",
    code: `Act as a technical documentation specialist. I need complete documentation for the following [CODE/API/SYSTEM].

Please generate:

1. Overview
   - Purpose and key functionality
   - Architecture/component diagram (described in text)

2. Installation/Setup
   - Prerequisites
   - Step-by-step installation process
   - Configuration options

3. Usage Guide
   - Basic examples
   - Advanced usage patterns
   - Code snippets with explanations

4. API Reference
   - Functions/endpoints with parameters
   - Return values/responses
   - Error codes and troubleshooting

5. Best Practices
   - Performance optimization
   - Security considerations
   - Common pitfalls to avoid

Here is the [CODE/API/SYSTEM] to document: [DESCRIPTION]`,
    category: "Documentation",
    copyCount: 739,
    reactions: {
      like: 254,
      love: 112,
      smile: 87,
      save: 186
    }
  },
  {
    id: "5",
    title: "Test Case Generator",
    description: "Comprehensive test case generator for functions, APIs, or full features with edge cases and mocks.",
    code: `Act as a QA engineer. Generate thorough test cases for this [FUNCTION/API/FEATURE].

For each test case include:
1. Test ID and name
2. Preconditions
3. Test steps
4. Expected results
5. Test data required
6. Priority level (High/Medium/Low)

Include test cases for:
- Positive scenarios (happy paths)
- Negative scenarios (error handling)
- Edge cases and boundary values
- Performance considerations
- Security aspects

Also provide necessary mock data or objects.

Here's the [FUNCTION/API/FEATURE] to test: [DESCRIPTION]`,
    category: "Testing",
    copyCount: 623,
    reactions: {
      like: 189,
      love: 95,
      smile: 42,
      save: 157
    }
  },
  {
    id: "6",
    title: "UI/UX Design System Creator",
    description: "Generate a comprehensive design system with color palette, typography, components, and usage guidelines.",
    code: `As a design system specialist, help me create a complete design system for [PROJECT TYPE].

Please provide:

1. Visual Language
   - Color palette with primary, secondary, and accent colors (including hex codes)
   - Typography recommendations with font pairings and scale
   - Spacing system and grid layout principles
   - Iconography style

2. Components
   - Core elements (buttons, inputs, cards, etc.) with variants
   - Component properties and states
   - Responsive behavior guidelines

3. Usage Guidelines
   - Implementation examples
   - Accessibility considerations
   - Best practices for consistent application

4. Design Principles
   - Key philosophies guiding the system
   - Decision-making framework

My project is: [PROJECT DESCRIPTION]`,
    category: "Development",
    copyCount: 581,
    reactions: {
      like: 176,
      love: 108,
      smile: 35,
      save: 146
    }
  },
  {
    id: "7",
    title: "Algorithm Optimization Expert",
    description: "Analyze and optimize algorithms for better time/space complexity with step-by-step explanations.",
    code: `Act as an algorithm optimization expert. Analyze this algorithm and suggest optimizations:

1. Current Implementation Analysis
   - Time complexity
   - Space complexity
   - Bottlenecks and inefficiencies

2. Optimization Strategies
   - Algorithmic improvements
   - Data structure alternatives
   - Trade-offs between approaches

3. Optimized Solution
   - Improved algorithm with explanations
   - Complexity analysis of new solution
   - Step-by-step transformation process

4. Further Considerations
   - Edge cases
   - Parallelization potential
   - Language-specific optimizations

Here's the algorithm to optimize: [ALGORITHM CODE/DESCRIPTION]`,
    category: "Development",
    copyCount: 546,
    reactions: {
      like: 165,
      love: 87,
      smile: 31,
      save: 132
    }
  },
  {
    id: "8",
    title: "Interactive Story Generator",
    description: "Create engaging interactive stories with branching narratives and character development.",
    code: `Act as an interactive storyteller. Create an engaging story with branching narratives based on the following parameters:

Setting: [SETTING]
Main Character: [CHARACTER DESCRIPTION]
Theme: [THEME]
Tone: [TONE]

For each scene, provide:
1. Rich description of the environment and situation
2. Character dialogue and thoughts
3. 2-3 meaningful choices that affect the story direction

After I select a choice, continue the story based on that path. Include:
- Character development
- Plot twists
- Emotional moments
- Consequences of previous choices

Begin with an intriguing opening that establishes the setting and introduces the main character.`,
    category: "Creative Writing",
    copyCount: 512,
    reactions: {
      like: 154,
      love: 92,
      smile: 65,
      save: 118
    }
  },
  {
    id: "9",
    title: "System Architecture Reviewer",
    description: "Get expert analysis of system architecture with identification of potential issues and improvements.",
    code: `Act as a senior systems architect. Review my system architecture and provide expert analysis:

1. Architecture Assessment
   - Strengths of the current design
   - Potential weaknesses and vulnerabilities
   - Alignment with industry best practices

2. Scalability Analysis
   - Bottlenecks and single points of failure
   - Recommended improvements for handling increased load
   - Caching and optimization strategies

3. Security Evaluation
   - Potential security risks
   - Authentication and authorization recommendations
   - Data protection considerations

4. Maintainability Review
   - Code organization and modularity
   - Documentation needs
   - Testing approach

5. Cost Optimization
   - Resource utilization efficiency
   - Areas to reduce operational costs

Here's my current architecture: [ARCHITECTURE DESCRIPTION]`,
    category: "Development",
    copyCount: 487,
    reactions: {
      like: 147,
      love: 74,
      smile: 29,
      save: 124
    }
  }
];
