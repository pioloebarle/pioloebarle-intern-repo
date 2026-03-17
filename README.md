# Mobile Development Internship at Focus Bear - Onboarding Session

This repository contains all the code and documentation for mobile development internship at Focus Bear. Deliverables are organized by milestones.

## Structural Overview

```text
milestones/
├─ 0-Company-Policies/
├─ 0-Working-in-an-Agile-Team/
├─ 1-Learn-About-Focus-Bear/
├─ 2-Setup-Tools/
├─ 3-Learn-Git/
├─ 4-Clean-Code/
├─ 5-React-Fundamentals/
├─ 7-Redux/
├─ 8-React-Native-Fundamentals/
├─ 10-Building-Interactive-&-Performant-Apps/
├─ 11-Debugging/
└─ 12-Focus-Bear-Specific-Libraries/
```

## Onboarding to the Codebase

This repository is organized primarily as an internship learning workspace. Most milestone folders contain Markdown notes, reflections, and exercises. The main runnable code lives in two project folders inside the milestones directory.

### How the Repository is Structured

- `milestones/0-Company-Policies` contains company, security, privacy, ergonomics, and professionalism documentation.
- `milestones/0-Working-in-an-Agile-Team` contains Agile process notes such as roles, ceremonies, principles, and Kanban workflow.
- `milestones/1-Learn-About-Focus-Bear` contains company research and onboarding reflections.
- `milestones/2-Setup-Tools` contains setup notes for AI tools, Git, terminal usage, and VS Code productivity.
- `milestones/3-Learn-Git` contains Git learning materials plus a small JavaScript example file.
- `milestones/4-Clean-Code` contains clean code documentation plus small Python practice files.
- `milestones/5-React-Fundamentals` contains React learning notes and a runnable Vite React project.
- `milestones/7-Redux` contains Redux concepts and learning materials.
- `milestones/8-React-Native-Fundamentals` contains React Native learning notes and a runnable Expo React Native project.
- `milestones/10-Building-Interactive-&-Performant-Apps` contains notes about API calls, performance, testing, and interactive app behavior.
- `milestones/11-Debugging` contains debugging strategies and React Native debugging notes.
- `milestones/12-Focus-Bear-Specific-Libraries` contains notes on libraries and patterns relevant to the Focus Bear stack, including deep linking, i18n, logging, and native modules.

### Where the Actual Code Is

The repository is not a single application. Instead, it contains two main learning projects:

1. `milestones/5-React-Fundamentals/react-project`

	This is a Vite-based React web app. Its source code lives in `src/`, with:
	- `components/` for reusable React components
	- `pages/` for page-level screens
	- `api/` for API-related setup
	- `redux/` for store and slice logic
	- `App.jsx` and `main.jsx` as the root entry files

2. `milestones/8-React-Native-Fundamentals/react-native-project`

	This is an Expo React Native app using Expo Router. Its main structure includes:
	- `app/` for route-based screens and layouts
	- `components/` for reusable UI and feature components
	- `services/` for API, caching, and i18n setup
	- `store/` for Redux state logic
	- `utils/`, `hooks/`, and `constants/` for shared app support code

### How to Navigate This Repo

- If you want internship documentation, start in the relevant milestone folder and read the Markdown files.
- If you want web app code, go to `milestones/5-React-Fundamentals/react-project`.
- If you want mobile app code, go to `milestones/8-React-Native-Fundamentals/react-native-project`.
- If you want to understand the overall progression, read the milestone folders in numerical order.

### Quick Start for Code Projects

For the React web project:

```bash
cd milestones/5-React-Fundamentals/react-project
npm install
npm run dev
```

For the React Native project:

```bash
cd milestones/8-React-Native-Fundamentals/react-native-project
npm install
npm expo start
```


